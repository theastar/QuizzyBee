import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';

const EditQuiz = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  const quizParam = useMemo(() => {
    return params.quiz ? JSON.parse(params.quiz) : null;
  }, [params.quiz]);

  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (quizParam) {
      setQuizTitle(quizParam.title);
      setQuestions(quizParam.questions.map(q => ({ ...q })));
    }
  }, [quizParam]);

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

  const handleUpdate = () => {
    if (!quizTitle.trim()) return;

    const validQuestions = questions.filter(q =>
      q.question.trim() && q.options.every(o => o.trim())
    );

    if (validQuestions.length === 0) return;

    const updatedQuiz = {
      id: quizParam?.id || Date.now(),
      title: quizTitle,
      questions,
      completed: quizParam?.completed || false,
    };

    router.push({ pathname: '/tabs/quizzybee', params: { updatedQuiz: JSON.stringify(updatedQuiz) } });
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <View style={styles.backButtonWrapper}>
          <BackButton />
        </View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
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
          <View style={styles.questionsContainer}>
            {questions.map((q, qIndex) => (
              <View key={qIndex} style={styles.questionCard}>
                <View style={styles.questionHeader}>
                  <Text style={styles.questionNumber}>Question {qIndex + 1}</Text>
                  {questions.length > 1 && (
                    <TouchableOpacity onPress={() => removeQuestion(qIndex)} style={styles.removeButton}>
                      <Text style={styles.removeButtonText}>✕</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <TextInput
                  style={styles.questionInput}
                  value={q.question}
                  onChangeText={(value) => updateQuestion(qIndex, value)}
                  placeholder="Enter your question"
                  placeholderTextColor="#9CA3AF"
                  multiline
                />
                <Text style={styles.choicesLabel}>Multiple Choices (tap to set correct answer)</Text>
                {q.options.map((option, oIndex) => (
                  <View key={oIndex} style={styles.optionRow}>
                    <TouchableOpacity
                      onPress={() => setCorrectAnswer(qIndex, oIndex)}
                      style={[
                        styles.optionCircle,
                        q.correct === oIndex && styles.optionCircleSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionCircleText,
                          q.correct === oIndex && styles.optionCircleTextSelected,
                        ]}
                      >
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
          <View style={styles.footer}>
            <TouchableOpacity style={styles.addQuestionButton} onPress={addQuestion}>
              <Ionicons name="add" size={24} color="#222" style={styles.addIcon} />
              <Text style={styles.addQuestionButtonText}>Add Another Question</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
              <Text style={styles.updateButtonText}>Update Quiz</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default EditQuiz;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#FFFBF0',
  },
  modalContainer: {
    backgroundColor: '#FFFBF0',
    borderWidth: 2,
    borderColor: '#FDE68A',
    borderRadius: 20,
    flex: 1,
    maxHeight: '100%',
    paddingTop: 20,
  },
  backButtonWrapper: {
    marginTop: -5,
    marginLeft: 15,
    paddingVertical: 10,
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
    marginTop: -15,
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
  footer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  addQuestionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    borderWidth: 3,
    borderColor: '#FDE68A',
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 16,
    width: '100%',
  },
  addIcon: {
    marginRight: 8,
  },
  addQuestionButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#1A1D16',
  },
  updateButton: {
    backgroundColor: '#FE9A00',
    borderRadius: 10,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  updateButtonText: {
    fontSize: 14,
    color: '#FFFBF0',
    fontFamily: 'Poppins_600SemiBold',
  },
});
