import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import BackButton from '../components/BackButton';

const StartQuiz = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const quiz = JSON.parse(params.quiz);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (answerIndex) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleComplete = (score, correct, wrong, total) => {
    router.push({
      pathname: '/endquiz',
      params: {
        quiz: JSON.stringify(quiz),
        summaryData: JSON.stringify({ correct, wrong, total, score }),
      },
    });
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || showFeedback) return;

    setShowFeedback(true);
    const isCorrect = selectedAnswer === question.correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        if (currentQuestion < quiz.questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowFeedback(false);
          fadeAnim.setValue(1);
        } else {
          const finalCorrect = score + (isCorrect ? 1 : 0);
          const finalWrong = quiz.questions.length - finalCorrect;
          const finalScore = Math.round((finalCorrect / quiz.questions.length) * 100);

          handleComplete(finalScore, finalCorrect, finalWrong, quiz.questions.length);
        }
      });
    }, 1500);
  };

  return (
    <View style={styles.pageBackground}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.backButtonWrapper}>
          <BackButton />
        </View>
      </View>

      <View style={styles.quizCard}>
        <Text style={styles.quizTitle}>{quiz.title}</Text>
        <Text style={styles.questionCount}>{quiz.questions.length} questions</Text>
        <View style={styles.questionBlock}>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correct;
            const showCorrect = showFeedback && isCorrect;
            const showWrong = showFeedback && isSelected && !isCorrect;

            let optionStyle = [styles.optionButton];
            if (showCorrect) optionStyle.push(styles.optionButtonCorrect);
            if (showWrong) optionStyle.push(styles.optionButtonWrong);
            if (isSelected && !showFeedback) optionStyle.push(styles.optionButtonSelected);

            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleAnswerSelect(index)}
                disabled={showFeedback}
                style={optionStyle}
              >
                <Text style={[
                  styles.optionButtonText,
                  isSelected && !showFeedback && styles.optionButtonTextSelected,
                  showCorrect && styles.optionButtonTextCorrect,
                  showWrong && styles.optionButtonTextWrong,
                ]}>
                  {String.fromCharCode(65 + index)}. {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            (selectedAnswer === null || showFeedback) && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={selectedAnswer === null || showFeedback}
        >
          <Text style={styles.submitButtonText}>
            {showFeedback
              ? 'Submitting...'
              : currentQuestion < quiz.questions.length - 1
                ? 'Submit Answer'
                : 'Finish Quiz'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StartQuiz;

const styles = StyleSheet.create({
  pageBackground: {
    flex: 1,
    backgroundColor: '#FFFBF0',
    justifyContent: 'center'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 0,
    marginTop: 0,
    height: 44,
  },
  backButtonWrapper: {
    marginTop: -67,
    marginLeft: 10,
  },
  quizCard: {
    margin: 16,
    padding: 24,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FDEBA1',
    backgroundColor: '#fff',
    elevation: 3,
  },
  quizTitle: {
    fontSize: 20,
    color: '#1A1D16',
    fontFamily: 'Poppins_400Regular',
    marginBottom: 2,
  },
  questionCount: {
    fontSize: 16,
    color: '#A25C30',
    marginBottom: 20,
  },
  questionBlock: {
    backgroundColor: '#FE9A00',
    borderRadius: 8,
    paddingVertical: 24,
    paddingHorizontal: 8,
    marginBottom: 30,
    width: '100%',
    height: '150',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    color: '#FFFBF0',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 26,
  },
  optionButton: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFE29A',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  optionButtonSelected: {
    backgroundColor: '#FDE68A',
    borderColor: '#FDE68A',
  },
  optionButtonCorrect: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  optionButtonWrong: {
    backgroundColor: '#FEF2F2',
    borderColor: '#EF4444',
  },
  optionButtonText: {
    color: '#78350F',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  optionButtonTextSelected: {
    color: '#92400E',
    fontFamily: 'Poppins_600SemiBold',
  },
  optionButtonTextCorrect: {
    color: '#10B981',
    fontFamily: 'Poppins_600SemiBold',
  },
  optionButtonTextWrong: {
    color: '#EF4444',
    fontFamily: 'Poppins_600SemiBold',
  },
  submitButton: {
    backgroundColor: '#FDE68A',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#EDD382',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#FFE29A',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#78350F',
    fontFamily: 'Poppins_400Regular',
  },
});
