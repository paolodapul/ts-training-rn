import { Text, View } from "react-native";
import { SafeAreaView, StyleSheet } from "react-native";
import { HomeScreen } from "../screens/HomeScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
    </SafeAreaView>
  );
}
