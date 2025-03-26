import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../util/supabase";
import { signUp } from "../../util/auth";

const SignUp = () => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    const { data, error } = await signUp(Email, password);

    if (error) {
      Alert.alert("Sign up failed", error.message);
      return;
    }

    const UUID = data.user?.id;

    if (UUID) {
      const { error: insertError } = await supabase.from("user_details").insert([
        {
          UUID,
          Email,
          FirstName: firstName,
          LastName: lastName,
        },
      ]);

      if (insertError) {
        Alert.alert("Failed to save user details", insertError.message);
      } else {
        Alert.alert("Success", "Account created! Please sign in.");
        router.replace("/auth/SignIn");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Email" value={Email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 },
});
