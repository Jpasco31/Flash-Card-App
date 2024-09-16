// QuestionFlipCards.tsx

import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import FlipCard from "@/components/FlipCard";
import { questions } from "@/assets/QuestionsData";
import { Ionicons } from "@expo/vector-icons";

const QuestionFlipCards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [shuffledQuestions, setShuffledQuestions] = useState(questions);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(false); // State for autoplay
  const [flipTrigger, setFlipTrigger] = useState<boolean>(false); // State to trigger card flip
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null); // Ref to store the autoplay timer

  // Function to flip the card and then go to the next card
  const handleNextWithFlip = () => {
    setFlipTrigger((prev) => !prev); // Trigger the flip
  };

  // Function to go to the next card without flip
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < shuffledQuestions.length - 1 ? prevIndex + 1 : 0
    );
  };

  // Function to shuffle the questions
  const handleShuffle = () => {
    const shuffled = [...questions]; // Make a copy of the original questions array
    // Implementing Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledQuestions(shuffled);
    setCurrentIndex(0); // Reset index to start from the beginning of the shuffled array
    setFlipTrigger(false); // Reset flip state
  };

  // Function to go to the previous card
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Start autoplay with flipping before advancing
  const startAutoplay = () => {
    setIsAutoplay(true);
    autoplayTimer.current = setInterval(handleNextWithFlip, 5000); // Set interval as needed, 5000ms in this case
  };

  // Stop autoplay
  const stopAutoplay = () => {
    setIsAutoplay(false);
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
      autoplayTimer.current = null;
    }
  };

  // Clean up timers when the component unmounts
  useEffect(() => {
    return () => {
      stopAutoplay(); // Stop autoplay and clear timers when unmounting
    };
  }, []);

  const handleFlipComplete = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < shuffledQuestions.length - 1 ? prevIndex + 1 : 0
    );
  };

  const currentQuestion = shuffledQuestions[currentIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.counterText}>
          Question {currentIndex + 1} of {shuffledQuestions.length}
        </Text>

        <View style={styles.cardWrapper}>
          <FlipCard
            frontText={currentQuestion.question}
            backText={currentQuestion.answer}
            autoFlipTrigger={flipTrigger} // Pass flip trigger to FlipCard
            onFlipComplete={handleFlipComplete}
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

          <TouchableOpacity onPress={handleShuffle} style={styles.navButton}>
            <Ionicons name="shuffle-outline" size={32} color="#4f4f4f" />
          </TouchableOpacity>

          {isAutoplay ? (
            <TouchableOpacity onPress={stopAutoplay} style={styles.navButton}>
              <Ionicons name="pause" size={32} color="#4f4f4f" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={startAutoplay} style={styles.navButton}>
              <Ionicons name="play" size={32} color="#4f4f4f" />
            </TouchableOpacity>
          )}

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
    </SafeAreaView>
  );
};

export default QuestionFlipCards;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // Optional: Set background color for the safe area
  },
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
    justifyContent: "space-around",
    paddingHorizontal: 20,
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
