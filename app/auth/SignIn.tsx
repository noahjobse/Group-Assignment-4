// Jacobs Version 09:44 10-02-2025
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import credentialsData from "../../credentials.json"; // Import user credentials (for local testing only)

interface User {
  username: string;
  password: string;
}

// Load array of users from the credentials.json file (Not secure for production).
const users: User[] = credentialsData.users;

const SignIn: React.FC = () => {
  // State variables to store user input.
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter(); // Router for navigation

  // Validate username length (must be at least 5 characters).
  const isValidUsername = (uname: string): boolean => uname.length >= 5;

  // Validate password complexity (at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char).
  const isValidPassword = (pass: string): boolean =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(pass);

  // Function to authenticate user credentials.
  const authenticateUser = () => {
    // Check username validity.
    if (!isValidUsername(username)) {
      Alert.alert("Error", "Username must be at least 5 characters long.");
      return;
    }

    // Check password validity.
    if (!isValidPassword(password)) {
      Alert.alert(
        "Error",
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    // Attempt to find the user in the credentials list.
    const user = users.find(
      (cred) => cred.username === username && cred.password === password
    );

    if (!user) {
      // Alert user if authentication fails.
      Alert.alert("Error", "Invalid username or password.");
      return;
    }

    // On successful authentication, navigate to home screen.
    router.push("/home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      {/* Username Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      {/* Password Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Sign In Button */}
      <Button title="Sign In" onPress={authenticateUser} />
    </View>
  );
};

export default SignIn;

// Styles for the component.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 200,
    margin: 6,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
