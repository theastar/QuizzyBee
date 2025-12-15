import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DeleteModal from '../../components/DeleteModal';
import { useRouter } from 'expo-router';
import { QuizContext } from '../../context/QuizContext';

const QuizzyBee = () => {
  const { quizzes, loading, deleteQuiz } = useContext(QuizContext);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);

  const router = useRouter();

  const showDeleteModal = (quiz) => {
    setQuizToDelete(quiz);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (quizToDelete) {
      try {
        await deleteQuiz(quizToDelete._id);
        setQuizToDelete(null);
        setDeleteModalVisible(false);
      } catch (error) {
        console.error('Error deleting quiz:', error);
        alert('Failed to delete quiz');
      }
    }
  };

  const cancelDelete = () => {
    setQuizToDelete(null);
    setDeleteModalVisible(false);
  };

  const handleOpenEdit = (quiz) => {
    router.push({ pathname: '/editquiz', params: { quiz: JSON.stringify(quiz) } });
  };

  const handleStartQuiz = (quiz) => {
    router.push({ pathname: '/startquiz', params: { quiz: JSON.stringify(quiz) } });
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#FE9A00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.addRow}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push('/create-quiz')}
        >
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
          <Text style={styles.createButtonText}>Create Quiz</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {quizzes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No quizzes yet. Create your first quiz!</Text>
          </View>
        ) : (
          quizzes.map((quiz) => (
            <View key={quiz._id} style={styles.quizCard}>
              <View style={styles.quizInfo}>
                <View style={styles.quizTitleRow}>
                  <Text style={styles.quizTitle}>{quiz.title}</Text>
                </View>
                <Text style={[styles.quizSubtitle, { color: '#A25C30' }]}>
                  {quiz.questions.length} questions
                </Text>
              </View>
              <View style={styles.buttonColumn}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleStartQuiz(quiz)}
                >
                  <Ionicons name="play-outline" size={16} color="#fff" style={styles.iconSpacing} />
                  <Text style={styles.buttonText}>
                    {quiz.completed ? 'Retake' : 'Start'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.iconButton, { backgroundColor: '#4CAF50' }]}
                  onPress={() => handleOpenEdit(quiz)}
                >
                  <Ionicons name="pencil-outline" size={16} color="#fff" style={styles.iconSpacing} />
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.iconButton, { backgroundColor: '#E53935' }]}
                  onPress={() => showDeleteModal(quiz)}
                >
                  <Ionicons name="trash" size={16} color="#fff" style={styles.iconSpacing} />
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <DeleteModal
        visible={deleteModalVisible}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="Are you sure you want to delete this quiz?"
      />
    </View>
  );
};

export default QuizzyBee;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  addRow: { flexDirection: "row", alignItems: "center", justifyContent: "flex-end", paddingTop: 10, paddingBottom: 10, paddingHorizontal: 10, marginBottom: 2 },
  createButton: { flexDirection: 'row', backgroundColor: '#FE9A00', borderRadius: 8, marginTop: 50, alignItems: 'center', paddingVertical: 6, paddingHorizontal: 13, elevation: 2, shadowColor: '#FABF41', shadowOpacity: 0.25, shadowRadius: 4 },
  createButtonText: { color: '#fff', fontSize: 16, marginLeft: 6, fontFamily: 'Poppins_600SemiBold' },
  scrollView: { flex: 1, padding: 20 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 16, color: '#A25C30', fontFamily: 'Poppins_400Regular', textAlign: 'center' },
  quizCard: { backgroundColor: '#FFFFFF', borderWidth: 3, borderColor: '#FDEBA1', borderRadius: 12, padding: 16, marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between' },
  quizInfo: { flex: 1 },
  quizTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' },
  quizTitle: { fontSize: 18, fontFamily: 'Poppins_400Regular', color: '#1A1D16', marginRight: 8 },
  quizSubtitle: { fontSize: 14 },
  buttonColumn: { gap: 8 },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F59E0B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 100,
  },
  iconSpacing: { marginRight: 6 },
  buttonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 13, textAlign: 'center' },
});