import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useQuizStore } from '../context/QuizStore';

const EndQuiz = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const quiz = JSON.parse(params.quiz);
  const summaryData = JSON.parse(params.summaryData);
  const { correct, wrong, total, score } = summaryData;
  const { addQuizToHistory } = useQuizStore();

  // Save quiz to history when component mounts
  useEffect(() => {
    addQuizToHistory({
      title: quiz.title,
      score,
      correct,
      wrong,
      total,
    });
  }, []);

  const handleReturn = () => {
    router.push('/tabs/quizzybee');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* Header */}
          <Text style={styles.completeText}>Quiz Complete!</Text>
          <Text style={styles.congratsText}>Congratulations</Text>

          {/* Score Display */}
          <Text style={styles.scoreText}>{score}%</Text>
          <Text style={styles.scoreLabel}>Your Score</Text>

          {/* Results Boxes */}
          <View style={styles.resultRow}>
            <View style={[styles.resultBox, styles.correctBox]}>
              <Text style={styles.resultNumGreen}>{correct}</Text>
              <View style={styles.resultLabelWrapper}>
                <Text style={styles.resultLabelGreen}>Correct</Text>
                <Text style={styles.resultLabelGreen}>Answer</Text>
              </View>
            </View>
            <View style={[styles.resultBox, styles.wrongBox]}>
              <Text style={styles.resultNumRed}>{wrong}</Text>
              <View style={styles.resultLabelWrapper}>
                <Text style={styles.resultLabelRed}>Wrong</Text>
                <Text style={styles.resultLabelRed}>Answer</Text>
              </View>
            </View>
          </View>

          <View style={styles.totalQuestionsBox}>
            <Text style={styles.totalQuestionsNum}>{total}</Text>
            <Text style={styles.totalQuestionsLabel}>Total Questions</Text>
          </View>

          {/* Return Button */}
          <TouchableOpacity style={styles.returnButton} onPress={handleReturn}>
            <Text style={styles.returnButtonText}>Return to Quizzes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EndQuiz;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFBE9",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFBE9",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#FDEBA1",
    shadowColor: "#FDEBA1",
    elevation: 2,
    width: "95%",
    padding: 28,
    alignItems: 'center',
  },
  completeText: {
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
    color: "#1A1D16",
    textAlign: "center",
    marginTop: 8,
  },
  congratsText: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: "#A25C30",
    textAlign: "center",
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 50,
    fontFamily: 'Poppins_600SemiBold',
    color: "#E17203",
    textAlign: "center",
    marginBottom: 2,
    marginTop: 3,
  },
  scoreLabel: {
    fontSize: 16,
    color: "#A25C30",
    textAlign: "center",
    marginBottom: 18,
    marginTop: 2,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 24,
    gap: 18,
  },
  resultBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 16,
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 8,
    marginHorizontal: 0,
  },
  correctBox: {
    borderColor: "#29BF12",
  },
  wrongBox: {
    borderColor: "#EF4444",
  },
  resultNumGreen: {
    fontSize: 33,
    fontFamily: 'Poppins_600SemiBold',
    color: "#29BF12",
    textAlign: "center",
    marginBottom: 5,
    marginTop: 6,
  },
  resultNumRed: {
    fontSize: 33,
    fontFamily: 'Poppins_600SemiBold',
    color: "#EF4444",
    textAlign: "center",
    marginBottom: 5,
    marginTop: 6,
  },
  resultLabelWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 2,
  },
  resultLabelGreen: {
    fontSize: 15,
    color: "#29BF12",
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 1,
    fontFamily: 'Poppins_400Regular'
  },
  resultLabelRed: {
    fontSize: 15,
    color: "#EF4444",
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 1,
    fontFamily: 'Poppins_400Regular'
  },
  totalQuestionsBox: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#FDEBA1",
    borderRadius: 16,
    minHeight: 80,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 17,
    marginBottom: 32,
    marginTop: 0
  },
  totalQuestionsNum: {
    fontSize: 31,
    fontFamily: 'Poppins_600SemiBold',
    color: "#A25C30",
    marginBottom: 2,
    textAlign: "center",
  },
  totalQuestionsLabel: {
    fontSize: 17,
    color: "#A25C30",
    textAlign: "center",
    marginTop: 2,
    fontFamily: 'Poppins_600SemiBold',
    letterSpacing: 0.15,
  },
  returnButton: {
    backgroundColor: "#FE9A00",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 6,
    marginTop: 10,
    width: "100%",
    shadowColor: "#FE9A00",
    elevation: 2,
  },
  returnButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: "#FFFBF0",
    textAlign: "center",
    letterSpacing: 0.25,
  },
});
