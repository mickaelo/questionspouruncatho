import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useCourseAdmin } from '@/hooks/useCourseAdmin';
import { Course } from '@/types/quiz';
import { showAlert, showConfirmAlert } from '@/utils/alert';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CourseManagementScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const {
    courses,
    statistics,
    isLoading,
    error,
    clearError,
    refreshCourses,
    refreshStatistics,
    deleteCourse
  } = useCourseAdmin();

  // Vérifier si l'utilisateur est admin
  const isAdmin = user?.type?.includes('admin');

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
            <MaterialIcons title="security" size={48} color={colors.error} />
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

  const handleEditCourse = (course: Course) => {
    router.push({
      pathname: '/admin/course-edit/[id]',
      params: { id: course.id.toString() }
    });
  };

  const handleDeleteCourse = (course: Course) => {
    showConfirmAlert(
      'Supprimer le niveau',
      `Êtes-vous sûr de vouloir supprimer le niveau "${course.title}" ?`,
      async () => {
        try {
          await deleteCourse(course.id.toString());
          showAlert('Succès', 'Niveau supprimé avec succès');
        } catch (error) {
          showAlert('Erreur', 'Impossible de supprimer le niveau');
        }
      }
    );
  };

  const handleAddCourse = () => {
    showAlert(
      'Ajouter un niveau',
      'Fonctionnalité d\'ajout de niveau - À implémenter'
    );
  };

  const handleRefresh = () => {
    refreshCourses();
    refreshStatistics();
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
            <MaterialIcons title="arrow-back" size={24} color={colors.primary} />
            <ThemedText style={[styles.backButtonText, { color: colors.primary }]}>
              Retour
            </ThemedText>
          </TouchableOpacity>
          
          <ThemedText type="title" style={[styles.title, { color: colors.text }]}>
            Gestion des Parcours
          </ThemedText>
          
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[styles.headerButton, { backgroundColor: colors.primary }]}
              onPress={handleRefresh}
            >
              <MaterialIcons title="refresh" size={20} color={colors.background} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.headerButton, { backgroundColor: colors.success }]}
              onPress={handleAddCourse}
            >
              <MaterialIcons title="add" size={20} color={colors.background} />
            </TouchableOpacity>
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
          {/* Message d'erreur */}
          {error && (
            <ThemedView style={[styles.errorCard, { backgroundColor: colors.error, borderColor: colors.error }]}>
              <MaterialIcons title="error" size={24} color={colors.background} />
              <ThemedText style={[styles.errorText, { color: colors.background }]}>
                {error}
              </ThemedText>
              <TouchableOpacity
                style={[styles.errorButton, { backgroundColor: colors.background }]}
                onPress={clearError}
              >
                <MaterialIcons title="close" size={16} color={colors.error} />
              </TouchableOpacity>
            </ThemedView>
          )}

          {/* Statistiques */}
          <ThemedView style={[styles.statsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons title="school" size={24} color={colors.primary} />
              <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                Statistiques des Parcours
              </ThemedText>
            </View>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <MaterialIcons title="layers" size={24} color={colors.primary} />
                <ThemedText style={[styles.statNumber, { color: colors.text }]}>
                  {statistics?.totalCourses || courses.length}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: colors.secondary }]}>
                  Niveaux créés
                </ThemedText>
              </View>
            </View>
          </ThemedView>

          {/* Liste des niveaux */}
          <ThemedView style={[styles.coursesCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <MaterialIcons title="list" size={24} color={colors.primary} />
              <ThemedText type="subtitle" style={[styles.cardTitle, { color: colors.text }]}>
                Niveaux de Formation
              </ThemedText>
            </View>
            
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <MaterialIcons title="hourglass-empty" size={48} color={colors.secondary} />
                <ThemedText style={[styles.loadingText, { color: colors.secondary }]}>
                  Chargement des niveaux...
                </ThemedText>
              </View>
            ) : courses.length > 0 ? (
              <View style={styles.coursesList}>
                {courses.map((course) => (
                  <View key={course.id} style={[styles.courseItem, { backgroundColor: colors.background, borderColor: colors.border }]}>
                    <View style={styles.courseInfo}>
                      <View style={[styles.courseColor, { backgroundColor: course.color }]} />
                      <View style={styles.courseDetails}>
                        <ThemedText type="subtitle" style={[styles.courseName, { color: colors.text }]}>
                          {course.title}
                        </ThemedText>
                        <ThemedText style={[styles.courseDescription, { color: colors.secondary }]}>
                          {course.description}
                        </ThemedText>
                        <View style={styles.courseStats}>
                          <ThemedText style={[styles.courseStat, { color: colors.primary }]}>
                            {course.requiredPoints} points requis
                          </ThemedText>
                          <ThemedText style={[styles.courseStat, { color: colors.warning }]}>
                            {course.requiredQuizzes} quiz requis
                          </ThemedText>
                          <ThemedText style={[styles.courseStat, { color: colors.success }]}>
                            {course.requiredBadges} badges requis
                          </ThemedText>
                        </View>
                      </View>
                    </View>
                    
                    <View style={styles.courseActions}>
                      <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: colors.primary }]}
                        onPress={() => handleEditCourse(course)}
                      >
                        <MaterialIcons title="edit" size={16} color={colors.background} />
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: colors.error }]}
                        onPress={() => handleDeleteCourse(course)}
                      >
                        <MaterialIcons title="delete" size={16} color={colors.background} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <MaterialIcons title="school" size={48} color={colors.secondary} />
                <ThemedText style={[styles.emptyText, { color: colors.secondary }]}>
                  Aucun niveau créé
                </ThemedText>
                <ThemedText style={[styles.emptyDescription, { color: colors.secondary }]}>
                  Créez votre premier niveau de formation
                </ThemedText>
              </View>
            )}
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
    gap: 10,
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
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  errorButton: {
    padding: 8,
    borderRadius: 6,
  },
  statsCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.8,
  },
  coursesCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  coursesList: {
    gap: 12,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  courseInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseColor: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  courseDetails: {
    flex: 1,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  courseDescription: {
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.8,
  },
  courseStats: {
    flexDirection: 'row',
    gap: 12,
  },
  courseStat: {
    fontSize: 12,
    opacity: 0.8,
  },
  courseActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  emptyDescription: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
}); 