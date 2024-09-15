import React from "react";
import { StyleSheet, View } from "react-native";
import QuestionFlipCards from "@/components/QuestionFlipCards"; // Adjust the import path as needed

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <QuestionFlipCards />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
