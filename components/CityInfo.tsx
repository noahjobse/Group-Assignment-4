import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

// Define the props for the CityInfo component
interface CityInfoProps {
  city: string;
  image: any;
  description: string;
}

// CityInfo component
export default function CityInfo({ city, image, description }: CityInfoProps) {
  return (
    // Container for the city information
    <View style={styles.container}>
      <Text style={styles.title}>{city}</Text>
      <Image source={image} style={styles.image} />
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

// Styles for the CityInfo component
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#121212",
    borderRadius: 10,
    marginHorizontal: 15,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 200,
    marginVertical: 15,
    borderRadius: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
});