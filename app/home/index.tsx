import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CityScreen from "./CityScreen";

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome to My New App</Text>
      </View>

      <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="Calgary">
        <Tab.Screen
          name="Calgary"
          children={() => (
            <CityScreen city="Calgary" link="https://www.calgary.ca/home.html" />
          )}
        />
        <Tab.Screen
          name="Edmonton"
          children={() => (
            <CityScreen city="Edmonton" link="https://www.edmonton.ca/" />
          )}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark Grey background for consistency
    paddingTop: 20,
  },
  welcomeContainer: {
    backgroundColor: "#333333", // Slightly lighter grey for contrast
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#444444", // Medium grey border
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF", // White text
  },
});
