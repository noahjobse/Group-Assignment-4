import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Sign In" }} />
      <Stack.Screen name="home/index" options={{ title: "Home" }} />
    </Stack>
  );
}
