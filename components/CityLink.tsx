import React from "react";
import { Text, TouchableOpacity, StyleSheet, Linking } from "react-native";

// Define the props for the CityLink component
interface CityLinkProps {
  link: string;
}

// CityLink component
export default function CityLink({ link }: CityLinkProps) {
  return (
    <TouchableOpacity onPress={() => Linking.openURL(link)}>
      <Text style={styles.link}>Go to city page</Text>
    </TouchableOpacity>
  );
}

// Styles for the CityLink component
const styles = StyleSheet.create({
  link: {
    fontSize: 18,
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});