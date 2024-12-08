import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={style.screen}>
      <Text>Hello world from React Native!</Text>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Text>&copy; Train of thought {new Date().getFullYear()}</Text>
    </View>
  );
}

const style = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})
