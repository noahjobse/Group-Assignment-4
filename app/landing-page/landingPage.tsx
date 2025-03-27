import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../util/supabase";

export default function LandingPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { count, error: countError } = await supabase
        .from('user_details')
        .select('*', { count: 'exact', head: true })
        .eq('UUID', user.id);

      if (countError) throw countError;
      if (count === 0) throw new Error('No user details found in database');

      const { data, error } = await supabase
        .from('user_details')
        .select('*')
        .eq('UUID', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setFirstName(data.FirstName || 'Guest');
        setLastName(data.LastName || '');
      }
    } catch (error) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setFirstName('Guest');
        setLastName('');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/auth/SignIn");
  };

  return (
    <ImageBackground
      source={require('../../assets/landing-bg.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          {loading ? 'Welcome to City Explorer' :
            lastName ? `Welcome, ${firstName} ${lastName}!` : `Welcome, ${firstName}!`}
        </Text>

        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => router.push("/home")}
        >
          <Text style={styles.buttonText}>Continue to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.mainButton, styles.signOutButton]}
          onPress={handleSignOut}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 40,
    textAlign: 'center',
  },
  mainButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signOutButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
});
