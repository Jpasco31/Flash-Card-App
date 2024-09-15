// FlipCard.tsx

import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";

interface FlipCardProps {
  frontText: string;
  backText: string;
  style?: StyleProp<ViewStyle>;
}

const FlipCard: React.FC<FlipCardProps> = ({ frontText, backText, style }) => {
  const animate = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset the flip state when frontText changes
  useEffect(() => {
    animate.setValue(0);
    setIsFlipped(false);
  }, [frontText]);

  const handleFlip = () => {
    Animated.timing(animate, {
      toValue: isFlipped ? 0 : 180,
      duration: 800,
      useNativeDriver: true,
    }).start(() => setIsFlipped(!isFlipped));
  };

  const frontInterpolate = animate.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = animate.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <View>
      <TouchableOpacity onPress={handleFlip}>
        <Animated.View style={[styles.card, frontAnimatedStyle, style]}>
          <Text style={styles.text}>{frontText}</Text>
        </Animated.View>
        <Animated.View
          style={[styles.card, styles.cardBack, backAnimatedStyle, style]}
        >
          <Text style={styles.text}>{backText}</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default FlipCard;

const styles = StyleSheet.create({
  card: {
    width: 360,
    height: 240,
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    backfaceVisibility: "hidden",
    alignItems: "center",
    justifyContent: "center",
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    // Android shadow
    elevation: 5,
  },
  cardBack: {
    position: "absolute",
    top: 0,
  },
  text: {
    fontSize: 24,
    textAlign: "center",
    paddingHorizontal: 10,
  },
});
