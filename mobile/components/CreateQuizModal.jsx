import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, StyleSheet,} from 'react-native';

const CreateQuizModal = ({ visible, onClose, onCreateQuiz }) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correct: 0 }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correct: 0 }]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].question = value;
    setQuestions(updated);
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const setCorrectAnswer = (qIndex, oIndex) => {
    const updated = [...questions];
    updated[qIndex].correct = oIndex;
    setQuestions(updated);
  };

  const handleCreate = () => {
    if (!quizTitle.trim()) return;

    const validQuestions = questions.filter(q => 
      q.question.trim() && q.options.every(o => o.trim())
    );

    if (validQuestions.length === 0) return;

    onCreateQuiz({
      title: quizTitle,
      questions: validQuestions,
    });

    // Reset
    setQuizTitle('');
    setQuestions([{ question: '', options: ['', '', '', ''], correct: 0 }]);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Create New Quiz</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Quiz Title */}
            <View style={styles.section}>
              <Text style={styles.label}>Quiz Title</Text>
              <TextInput
                style={styles.input}
                value={quizTitle}
                onChangeText={setQuizTitle}
                placeholder="Enter quiz title"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Questions */}
            <View style={styles.questionsContainer}>
              {questions.map((q, qIndex) => (
                <View key={qIndex} style={styles.questionCard}>
                  {/* Question Header */}
                  <View style={styles.questionHeader}>
                    <Text style={styles.questionNumber}>Question {qIndex + 1}</Text>
                    {questions.length > 1 && (
                      <TouchableOpacity
                        onPress={() => removeQuestion(qIndex)}
                        style={styles.removeButton}
                      >
                        <Text style={styles.removeButtonText}>✕</Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* Question Input */}
                  <TextInput
                    style={styles.questionInput}
                    value={q.question}
                    onChangeText={(value) => updateQuestion(qIndex, value)}
                    placeholder="Enter your question"
                    placeholderTextColor="#9CA3AF"
                    multiline
                  />

                  {/* Multiple Choices */}
                  <Text style={styles.choicesLabel}>
                    Multiple Choices (tap to set correct answer)
                  </Text>
                  {q.options.map((option, oIndex) => (
                    <View key={oIndex} style={styles.optionRow}>
                      <TouchableOpacity
                        onPress={() => setCorrectAnswer(qIndex, oIndex)}
                        style={[
                          styles.optionCircle,
                          q.correct === oIndex && styles.optionCircleSelected
                        ]}
                      >
                        <Text style={[
                          styles.optionCircleText,
                          q.correct === oIndex && styles.optionCircleTextSelected
                        ]}>
                          {q.correct === oIndex ? '✓' : String.fromCharCode(65 + oIndex)}
                        </Text>
                      </TouchableOpacity>
                      <TextInput
                        style={styles.optionInput}
                        value={option}
                        onChangeText={(value) => updateOption(qIndex, oIndex, value)}
                        placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                        placeholderTextColor="#9CA3AF"
                      />
                    </View>
                  ))}
                </View>
              ))}
            </View>

            {/* Add Question Button */}
            <TouchableOpacity
              style={styles.addQuestionButton}
              onPress={addQuestion}
            >
              <Text style={styles.addQuestionButtonText}>+ Add Another Question</Text>
            </TouchableOpacity>

            {/* Create Quiz Button */}
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreate}
            >
              <Text style={styles.createButtonText}>Create Quiz</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CreateQuizModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFBF0',
    borderWidth: 2,
    borderColor: '#FDE68A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FDEBA1',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1D16',
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#808080',
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#1A1D16',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FDE68A',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1A1D16',
  },
  questionsContainer: {
    marginBottom: 16,
  },
  questionCard: {
    backgroundColor: '#FFFBEB',
    borderWidth: 2,
    borderColor: '#FDE68A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionNumber: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#A25C30',
  },
  removeButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 20,
    color: '#808080',
  },
  questionInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1A1D16',
    marginBottom: 12,
    minHeight: 45,
  },
  choicesLabel: {
    fontSize: 11,
    color: '#808080',
    marginBottom: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  optionCircleSelected: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  optionCircleText: {
    fontSize: 12,
    color: '#808080',
    fontFamily: 'Poppins_600SemiBold',
  },
  optionCircleTextSelected: {
    color: '#FFFFFF',
  },
  optionInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 10,
    fontSize: 13,
    color: '#1A1D16',
  },
  addQuestionButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FCD34D',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  addQuestionButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#A25C30',
  },
  createButton: {
    backgroundColor: '#FE9A00',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  createButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
});
