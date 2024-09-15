// QuestionFlipCards.tsx

import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import FlipCard from "@/components/FlipCard";
import { questions } from "@/assets/QuestionsData";
import { Ionicons } from "@expo/vector-icons"; // Import the icon library

const QuestionFlipCards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [shuffledQuestions, setShuffledQuestions] = useState(questions);

  const handleNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...questions]; // Make a copy of the original questions array
    // Implementing Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledQuestions(shuffled);
    setCurrentIndex(0); // Reset index to start from the beginning of the shuffled array
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const currentQuestion = shuffledQuestions[currentIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>
        Question {currentIndex + 1} of {shuffledQuestions.length}
      </Text>

      <View style={styles.cardWrapper}>
        <FlipCard
          frontText={currentQuestion.question}
          backText={currentQuestion.answer}
        />
      </View>

      <View style={styles.navigation}>
        <TouchableOpacity
          onPress={handlePrevious}
          disabled={currentIndex === 0}
          style={[
            styles.navButton,
            currentIndex === 0 && styles.navButtonDisabled,
          ]}
        >
          <Ionicons name="arrow-back" size={32} color="#4f4f4f" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleShuffle} style={[styles.navButton]}>
          <Ionicons name="shuffle-outline" size={32} color="#4f4f4f" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          disabled={currentIndex === shuffledQuestions.length - 1}
          style={[
            styles.navButton,
            currentIndex === shuffledQuestions.length - 1 &&
              styles.navButtonDisabled,
          ]}
        >
          <Ionicons name="arrow-forward" size={32} color="#4f4f4f" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuestionFlipCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  counterText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  cardWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 60,
    marginBottom: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  navButton: {
    padding: 10,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
});
