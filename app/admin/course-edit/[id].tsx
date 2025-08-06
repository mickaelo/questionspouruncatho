import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useCourseAdmin } from '@/hooks/useCourseAdmin';
import { useQuizAdmin } from '@/hooks/useQuizAdmin';
import { Course, Quiz } from '@/types/quiz';
import { showAlert } from '@/utils/alert';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function courseEditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { getCourse, updateCourse } = useCourseAdmin();
  const { getAvailableQuizzes } = useQuizAdmin();

  // Vérifier si l'utilisateur est admin
  const isAdmin = user?.type?.includes('admin');

  const [course, setcourse] = useState<Course | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [availableQuizzes, setAvailableQuizzes] = useState<Quiz[]>([]);
  const [assignedQuizzes, setAssignedQuizzes] = useState<string[]>([]);

  // Charger le niveau depuis Firebase
  useEffect(() => {
    const loadcourse = async () => {
      if (id) {
        try {
          const courseData = await getCourse(id);
          setcourse(courseData);
          
          if (courseData) {
            // Initialiser les quiz assignés (extraire les IDs si ce sont des objets)
            const quizIds = Array.isArray(courseData.quizzes) 
              ? courseData.quizzes.map((quiz: any) => typeof quiz === 'string' ? quiz : quiz.id || quiz)
              : [];
            setAssignedQuizzes(quizIds);
          }
          
          // Charger les quiz disponibles
          const quizzes = await getAvailableQuizzes();
          setAvailableQuizzes(quizzes);
        } catch (error) {
          console.error('Erreur lors du chargement du niveau:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadcourse();
  }, [id, getCourse, getAvailableQuizzes]);

  if (!isAdmin) {
    return (
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView 
          contentContainerStyle={[
            styles.contentContainer,
            {
              paddingTop: Platform.OS === 'web' ? 20 : insets.top + 20,
              paddingBottom: Platform.OS === 'web' ? 40 : insets.bottom + 20,
            }
          ]}
        >
          <ThemedView style={[styles.errorCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <MaterialIcons name="security" size={48} color={colors.error} />
            <ThemedText type="title" style={[styles.errorTitle, { color: colors.error }]}>
              Accès refusé
            </ThemedText>
            <ThemedText style={[styles.errorDescription, { color: colors.secondary }]}>
              Vous devez être administrateur pour accéder à cette page.
            </ThemedText>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    );
  }

  if (isLoading) {
    return (
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView 
          contentContainerStyle={[
            styles.contentContainer,
            {
              paddingTop: Platform.OS === 'web' ? 20 : insets.top + 20,
              paddingBottom: Platform.OS === 'web' ? 40 : insets.bottom + 20,
            }
          ]}
        >
          <ThemedView style={[styles.loadingCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <MaterialIcons name="hourglass-empty" size={48} color={colors.secondary} />
            <ThemedText style={[styles.loadingText, { color: colors.secondary }]}>
              Chargement du niveau...
            </ThemedText>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    );
  }

  if (!course) {
    return (
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView 
          contentContainerStyle={[
            styles.contentContainer,
            {
              paddingTop: Platform.OS === 'web' ? 20 : insets.top + 20,
              paddingBottom: Platform.OS === 'web' ? 40 : insets.bottom + 20,
            }
          ]}
        >
          <ThemedView style={[styles.errorCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <MaterialIcons name="error" size={48} color={colors.error} />
            <ThemedText type="title" style={[styles.errorTitle, { color: colors.error }]}>
              Niveau non trouvé
            </ThemedText>
            <ThemedText style={[styles.errorDescription, { color: colors.secondary }]}>
              Le niveau demandé n'existe pas.
            </ThemedText>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    );
  }

  const handleSave = async () => {
    try {
      // Convertir les IDs des quiz en objets Quiz
      const quizObjects = assignedQuizzes.map(quizId => {
        const quiz = getQuizById(quizId);
        if (quiz) {
          return quiz;
        } else {
          // Créer un objet Quiz minimal si le quiz n'est pas trouvé
          return {
            id: quizId,
            title: `Quiz ${quizId}`,
            description: 'Quiz assigné manuellement',
            category: 'general',
            course: 1,
            questions: [],
            passingScore: 70,
            timeLimit: undefined
          };
        }
      });
      
      // Mettre à jour le niveau avec les quiz assignés
      const updatedCourse = {
        ...course,
        quizzes: quizObjects
      };
      
      // await updateCourse(id, updatedCourse);
      setIsEditing(false);
      showAlert('Succès', 'Niveau mis à jour avec succès');
    } catch (error) {
      showAlert('Erreur', 'Impossible de mettre à jour le niveau');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Recharger le niveau depuis Firebase
    getCourse(id).then(setcourse);
  };

  const updateCourseField = (field: keyof Course, value: any) => {
    if (course) {
      setcourse({ ...course, [field]: value });
    }
  };

  const toggleQuizAssignment = (quizId: string) => {
    setAssignedQuizzes(prev => {
      if (prev.includes(quizId)) {
        return prev.filter(id => id !== quizId);
      } else {
        return [...prev, quizId];
      }
    });
  };

  const getQuizById = (quizId: string) => {
    return availableQuizzes.find(quiz => quiz.id === quizId);
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header fixe */}
      <ThemedView style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
            <ThemedText style={[styles.backButtonText, { color: colors.primary }]}>
              Retour
            </ThemedText>
          </TouchableOpacity>
          
          <ThemedText type="title" style={[styles.title, { color: colors.text }]}>
            Édition du Niveau
          </ThemedText>
          
          <View style={styles.headerActions}>
            {isEditing ? (
              <>
                <TouchableOpacity
                  style={[styles.headerButton, { backgroundColor: colors.success }]}
                  onPress={handleSave}
                >
                  <MaterialIcons name="check" size={20} color={colors.background} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.headerButton, { backgroundColor: colors.error }]}
                  onPress={handleCancel}
                >
                  <MaterialIcons name="close" size={20} color={colors.background} />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={[styles.headerButton, { backgroundColor: colors.primary }]}
                onPress={() => setIsEditing(true)}
              >
                <MaterialIcons name="edit" size={20} color={colors.background} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ThemedView>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingTop: Platform.OS === 'web' ? 20 : insets.top + 80,
            paddingBottom: Platform.OS === 'web' ? 40 : insets.bottom + 20,
          }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContent}>
          {/* Informations générales */}
          <ThemedView style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="info" size={24} color={colors.primary} />
              <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
                Informations Générales
              </ThemedText>
            </View>
            
            <View style={styles.formGroup}>
              <ThemedText style={[styles.label, { color: colors.text }]}>
                Nom du niveau
              </ThemedText>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: colors.text
                  }
                ]}
                value={course.title}
                onChangeText={(text) => updateCourseField('title', text)}
                editable={isEditing}
                placeholder="Nom du niveau"
                placeholderTextColor={colors.secondary}
              />
            </View>

            <View style={styles.formGroup}>
              <ThemedText style={[styles.label, { color: colors.text }]}>
                Description
              </ThemedText>
              <TextInput
                style={[
                  styles.textArea,
                  { 
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: colors.text
                  }
                ]}
                value={course.description}
                onChangeText={(text) => updateCourseField('description', text)}
                editable={isEditing}
                placeholder="Description du niveau"
                placeholderTextColor={colors.secondary}
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formGroup}>
              <ThemedText style={[styles.label, { color: colors.text }]}>
                Couleur
              </ThemedText>
              <View style={styles.colorPicker}>
                <View style={[styles.colorPreview, { backgroundColor: course.color }]} />
                <TextInput
                  style={[
                    styles.input,
                    { 
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                      color: colors.text,
                      flex: 1,
                      marginLeft: 12
                    }
                  ]}
                  value={course.color}
                  onChangeText={(text) => updateCourseField('color', text)}
                  editable={isEditing}
                  placeholder="#4CAF50"
                  placeholderTextColor={colors.secondary}
                />
              </View>
            </View>
          </ThemedView>

          {/* Prérequis */}
          <ThemedView style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="school" size={24} color={colors.warning} />
              <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
                Prérequis
              </ThemedText>
            </View>
            
            <View style={styles.formRow}>
              <View style={styles.formGroup}>
                <ThemedText style={[styles.label, { color: colors.text }]}>
                  Points requis
                </ThemedText>
                <TextInput
                  style={[
                    styles.input,
                    { 
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                      color: colors.text
                    }
                  ]}
                  value={course.requiredPoints.toString()}
                  onChangeText={(text) => updateCourseField('requiredPoints', parseInt(text) || 0)}
                  editable={isEditing}
                  placeholder="0"
                  placeholderTextColor={colors.secondary}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.formGroup}>
                <ThemedText style={[styles.label, { color: colors.text }]}>
                  Quiz requis
                </ThemedText>
                <TextInput
                  style={[
                    styles.input,
                    { 
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                      color: colors.text
                    }
                  ]}
                  value={course.requiredQuizzes.toString()}
                  onChangeText={(text) => updateCourseField('requiredQuizzes', parseInt(text) || 0)}
                  editable={isEditing}
                  placeholder="0"
                  placeholderTextColor={colors.secondary}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.formGroup}>
                <ThemedText style={[styles.label, { color: colors.text }]}>
                  Badges requis
                </ThemedText>
                <TextInput
                  style={[
                    styles.input,
                    { 
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                      color: colors.text
                    }
                  ]}
                  value={course.requiredBadges.toString()}
                  onChangeText={(text) => updateCourseField('requiredBadges', parseInt(text) || 0)}
                  editable={isEditing}
                  placeholder="0"
                  placeholderTextColor={colors.secondary}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </ThemedView>

          {/* Public cible */}
          <ThemedView style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="people" size={24} color={colors.success} />
              <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
                Public Cible
              </ThemedText>
            </View>
            
            <View style={styles.formGroup}>
              <ThemedText style={[styles.label, { color: colors.text }]}>
                Audiences cibles (une par ligne)
              </ThemedText>
              <TextInput
                style={[
                  styles.textArea,
                  { 
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: colors.text
                  }
                ]}
                value={course.targetAudience.join('\n')}
                onChangeText={(text) => updateCourseField('targetAudience', text.split('\n').filter(line => line.trim()))}
                editable={isEditing}
                placeholder="Non-croyants curieux\nNouveaux convertis\nCatéchumènes"
                placeholderTextColor={colors.secondary}
                multiline
                numberOfLines={4}
              />
            </View>
          </ThemedView>

          {/* Types de contenu */}
          <ThemedView style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="library-books" size={24} color={colors.primary} />
              <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
                Types de Contenu
              </ThemedText>
            </View>
            
            <View style={styles.formGroup}>
              <ThemedText style={[styles.label, { color: colors.text }]}>
                Types de contenu (un par ligne)
              </ThemedText>
              <TextInput
                style={[
                  styles.textArea,
                  { 
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    color: colors.text
                  }
                ]}
                value={course.contentTypes.join('\n')}
                onChangeText={(text) => updateCourseField('contentTypes', text.split('\n').filter(line => line.trim()))}
                editable={isEditing}
                placeholder="Qui est Jésus-Christ ?\nQu'est-ce que la foi chrétienne ?\nIntroduction à la prière"
                placeholderTextColor={colors.secondary}
                multiline
                numberOfLines={6}
              />
            </View>
          </ThemedView>

          {/* Quiz assignés */}
          <ThemedView style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="quiz" size={24} color={colors.warning} />
              <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
                Quiz Assignés
              </ThemedText>
            </View>
            
            <View style={styles.formGroup}>
              <ThemedText style={[styles.label, { color: colors.text }]}>
                Quiz assignés au niveau ({assignedQuizzes.length} sélectionnés)
              </ThemedText>
              
              {availableQuizzes.length > 0 ? (
                <View style={styles.quizList}>
                  {availableQuizzes.map((quiz) => (
                    <TouchableOpacity
                      key={quiz.id}
                      style={[
                        styles.quizItem,
                        { 
                          backgroundColor: colors.background,
                          borderColor: assignedQuizzes.includes(quiz.id) ? colors.success : colors.border
                        }
                      ]}
                      onPress={() => isEditing && toggleQuizAssignment(quiz.id)}
                      disabled={!isEditing}
                    >
                      <View style={styles.quizInfo}>
                        <ThemedText type="subtitle" style={[styles.quizTitle, { color: colors.text }]}>
                          {quiz.title}
                        </ThemedText>
                        <ThemedText style={[styles.quizDescription, { color: colors.secondary }]}>
                          {quiz.description}
                        </ThemedText>
                        <View style={styles.quizMeta}>
                          <ThemedText style={[styles.quizMetaText, { color: colors.primary }]}>
                            {quiz.questions?.length || 0} questions
                          </ThemedText>
                          {/* <ThemedText style={[styles.quizMetaText, { color: colors.warning }]}>
                            Niveau {quiz.course}
                          </ThemedText> */}
                          <ThemedText style={[styles.quizMetaText, { color: colors.success }]}>
                            {quiz.category}
                          </ThemedText>
                        </View>
                      </View>
                      
                      {isEditing && (
                        <View style={styles.quizCheckbox}>
                          <MaterialIcons 
                            name={assignedQuizzes.includes(quiz.id) ? "check-box" : "check-box-outline-blank"} 
                            size={24} 
                            color={assignedQuizzes.includes(quiz.id) ? colors.success : colors.secondary} 
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View style={styles.emptyState}>
                  <MaterialIcons name="quiz" size={48} color={colors.secondary} />
                  <ThemedText style={[styles.emptyText, { color: colors.secondary }]}>
                    Aucun quiz disponible
                  </ThemedText>
                  <ThemedText style={[styles.emptyDescription, { color: colors.secondary }]}>
                    Créez d'abord des quiz pour pouvoir les assigner à ce niveau
                  </ThemedText>
                </View>
              )}
            </View>
          </ThemedView>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  mainContent: {
    gap: 20,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
  },
  errorCard: {
    padding: 40,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    gap: 16,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorDescription: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  loadingCard: {
    padding: 40,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  colorPicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  quizList: {
    gap: 12,
  },
  quizItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  quizDescription: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
  },
  quizMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  quizMetaText: {
    fontSize: 12,
  },
  quizCheckbox: {
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptyDescription: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.7,
  },
}); 