import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Quiz } from '@/types/quiz';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Modal,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useQuizDataContext } from './QuizDataProvider';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

interface QuizSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  stepNumber: number;
  elementType?: 'church' | 'pilgrim' | 'footprint';
}

export const QuizSelectionModal: React.FC<QuizSelectionModalProps> = ({
  visible,
  onClose,
  stepNumber,
  elementType = 'church',
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { getAvailableQuizzes } = useQuizDataContext();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [availableQuizzes, setAvailableQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      loadQuizzes();
    }
  }, [visible]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredQuizzes(availableQuizzes);
    } else {
      const filtered = availableQuizzes.filter(quiz =>
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredQuizzes(filtered);
    }
  }, [searchQuery, availableQuizzes]);

  const loadQuizzes = async () => {
    setIsLoading(true);
    try {
      const quizzes = await getAvailableQuizzes(1); // Charger tous les quiz disponibles
      setAvailableQuizzes(quizzes);
      setFilteredQuizzes(quizzes);
    } catch (error) {
      console.error('Erreur lors du chargement des quiz:', error);
      Alert.alert('Erreur', 'Impossible de charger les quiz disponibles');
    } finally {
      setIsLoading(false);
    }
  };

  const getElementTitle = () => {
    switch (elementType) {
      case 'church':
        return '⛪ Église';
      case 'pilgrim':
        return '🚶 Pèlerin';
      case 'footprint':
        return '👣 Empreinte';
      default:
        return '⛪ Église';
    }
  };

  const handleQuizSelect = (quiz: Quiz) => {
    onClose();
    router.push({
      pathname: '/quiz/[id]',
      params: { id: quiz.id }
    });
  };

  const renderQuizItem = ({ item }: { item: Quiz }) => (
    <TouchableOpacity
      style={[styles.quizItem, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => handleQuizSelect(item)}
    >
      <View style={styles.quizContent}>
        <ThemedText type="subtitle" style={[styles.quizTitle, { color: colors.text }]}>
          {item.title}
        </ThemedText>
        {item.description && (
          <ThemedText style={[styles.quizDescription, { color: colors.text }]}>
            {item.description}
          </ThemedText>
        )}
        <View style={styles.quizMeta}>
          <ThemedText style={[styles.quizMetaText, { color: colors.text }]}>
            Niveau {item.level || 1}
          </ThemedText>
          <ThemedText style={[styles.quizMetaText, { color: colors.text }]}>
            {item.questions?.length || 0} questions
          </ThemedText>
        </View>
      </View>
      <IconSymbol name="chevron.right" size={20} color={colors.primary} />
    </TouchableOpacity>
  );

     return (
     <Modal
       visible={visible}
       animationType="fade"
       transparent={true}
       onRequestClose={onClose}
     >
       <View style={styles.overlay}>
         <TouchableOpacity 
           style={styles.backdrop} 
           activeOpacity={1} 
           onPress={onClose}
         />
         <ThemedView style={[styles.popup, { backgroundColor: colors.background, borderColor: colors.border }]}>
           {/* Header */}
           <View style={[styles.header, { borderBottomColor: colors.border }]}>
             <ThemedText type="subtitle" style={[styles.title, { color: colors.text }]}>
               {getElementTitle()} - Étape {stepNumber}
             </ThemedText>
             <TouchableOpacity onPress={onClose} style={styles.closeButton}>
               <IconSymbol name="xmark" size={20} color={colors.text} />
             </TouchableOpacity>
           </View>

           {/* Search Bar */}
           <View style={styles.searchContainer}>
             <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
               <IconSymbol name="magnifyingglass" size={16} color={colors.text} />
               <TextInput
                 style={[styles.searchInput, { color: colors.text }]}
                 placeholder="Rechercher..."
                 placeholderTextColor={`${colors.text}80`}
                 value={searchQuery}
                 onChangeText={setSearchQuery}
               />
             </View>
           </View>

           {/* Quiz List */}
           <FlatList
             data={filteredQuizzes.slice(0, 5)} // Limiter à 5 quiz pour la popup
             renderItem={renderQuizItem}
             keyExtractor={(item) => item.id}
             style={styles.quizList}
             showsVerticalScrollIndicator={false}
             ListEmptyComponent={
               <View style={styles.emptyContainer}>
                 <IconSymbol name="questionmark.circle" size={32} color={colors.text} />
                 <ThemedText style={[styles.emptyText, { color: colors.text }]}>
                   {isLoading ? 'Chargement...' : 'Aucun quiz'}
                 </ThemedText>
               </View>
             }
           />
         </ThemedView>
       </View>
     </Modal>
   );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  popup: {
    width: '85%',
    maxWidth: 400,
    maxHeight: '70%',
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    padding: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  quizList: {
    maxHeight: 250,
  },
  quizItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quizContent: {
    flex: 1,
    marginRight: 8,
  },
  quizTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  quizDescription: {
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 4,
  },
  quizMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  quizMetaText: {
    fontSize: 10,
    opacity: 0.7,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.7,
  },
});
