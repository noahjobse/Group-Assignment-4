//Jacobs v 2025-03-26
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { signIn } from "../../util/auth";
import { supabase } from "../../util/supabase";


const SignIn = () => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

const handleSignIn = async () => {
  const { data: signInData, error } = await signIn(Email, password);

  if (error) {
    Alert.alert("Login failed", error.message);
    return;
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    Alert.alert("Login failed", "Unable to retrieve user information.");
    return;
  }

  if (!user.email_confirmed_at) {
    Alert.alert("Email not verified", "Please verify your email before signing in.");
    return;
  }

  // Check if user profile exists in user_details
  const { data: existingProfile, error: profileError } = await supabase
    .from("user_details")
    .select("*")
    .eq("UUID", user.id)
    .single();

  if (!existingProfile && !profileError) {
    // If no profile exists, insert a placeholder (optional: prompt later for full profile)
    const { error: insertError } = await supabase.from("user_details").insert([
      {
        UUID: user.id,
        Email: user.email,
        FirstName: "Unknown",
        LastName: "User",
      },
    ]);

    if (insertError) {
      console.warn("Profile insert failed:", insertError.message);
    }
  }

  // Success
  router.push("/landing-page/landingPage");
};


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formBox}>
            <View style={styles.noticeBox}>
              <Text style={styles.noticeTitle}>⚠️ Confirm Your Email</Text>
              <Text style={styles.noticeText}>
                Please confirm your email address before signing in.
              </Text>
              <Text style={styles.noticeText}>
                Check your inbox for the confirmation link.
              </Text>
            </View>

            <Text style={styles.title}>Sign In</Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={Email}
              onChangeText={(text) => setEmail(text.trim())}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <View style={styles.buttonWrapper}>
              <Button title="Sign In" onPress={handleSignIn} />
              <View style={{ marginTop: 10 }}>
                <Button
                  title="Go to Sign Up"
                  onPress={() => router.push("/auth/SignUp")}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  formBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  noticeBox: {
    backgroundColor: "#ffe4b5",
    borderColor: "#ffa500",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#cc6600",
    marginBottom: 4,
    textAlign: "center",
  },
  noticeText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },
  buttonWrapper: {
    marginTop: 10,
  },
});
