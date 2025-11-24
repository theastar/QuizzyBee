import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CreateQuizModal from '../../components/CreateQuizModal';
import DeleteModal from '../../components/DeleteModal';
import { useRouter, useLocalSearchParams } from 'expo-router';

const QuizzyBee = () => {
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: 'Sample Quiz',
      questions: [
        { question: 'What is the capital of France?', options: ['London', 'Paris', 'Berlin', 'Madrid'], correct: 1 },
        { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correct: 1 },
      ],
      completed: false,
    },
  ]);

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);

  const router = useRouter();
  const params = useLocalSearchParams();

  // Listen for updatedQuiz param to update quizzes state after editing
  useEffect(() => {
    if (params.updatedQuiz) {
      const updatedQuiz = JSON.parse(params.updatedQuiz);
      setQuizzes((prev) => {
        const index = prev.findIndex(q => q.id === updatedQuiz.id);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = updatedQuiz;
          return updated;
        } else {
          // Optionally add if not found
          return [...prev, updatedQuiz];
        }
      });
      // Clear updatedQuiz param after handling to prevent repeat updates
      router.replace({ pathname: '/', params: {} });
    }
  }, [params.updatedQuiz]);

  const showDeleteModal = (quiz) => {
    setQuizToDelete(quiz);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    setQuizzes(quizzes.filter(q => q.id !== quizToDelete.id));
    setQuizToDelete(null);
    setDeleteModalVisible(false);
  };

  const cancelDelete = () => {
    setQuizToDelete(null);
    setDeleteModalVisible(false);
  };

  const handleCreateQuiz = (newQuiz) => {
    const quiz = { id: Date.now(), title: newQuiz.title, questions: newQuiz.questions, completed: false };
    setQuizzes([...quizzes, quiz]);
  };

  const handleOpenEdit = (quiz) => {
    router.push({ pathname: '/editquiz', params: { quiz: JSON.stringify(quiz) } });
  };

  const handleStartQuiz = (quizId) => {
    const quizToStart = quizzes.find(q => q.id === quizId);
    router.push({ pathname: '/startquiz', params: { quiz: JSON.stringify(quizToStart) } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.addRow}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setCreateModalVisible(true)}
        >
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
          <Text style={styles.createButtonText}>Create Quiz</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {quizzes.map((quiz) => (
          <View key={quiz.id} style={styles.quizCard}>
            <View style={styles.quizInfo}>
              <View style={styles.quizTitleRow}>
                <Text style={styles.quizTitle}>{quiz.title}</Text>
                {/* Champion badge removed */}
              </View>
              <Text style={[styles.quizSubtitle, { color: '#A25C30' }]}>
                {quiz.questions.length} questions
              </Text>
            </View>
            <View style={styles.buttonColumn}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleStartQuiz(quiz.id)}
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
        ))}
      </ScrollView>

      <CreateQuizModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onCreateQuiz={handleCreateQuiz}
      />

      <DeleteModal
        visible={deleteModalVisible}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
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
