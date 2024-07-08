import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text className="text-6xl">Home</Text>
      <Link href="home">Go to Home</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
