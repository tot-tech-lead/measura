import {View, Image, Text, StyleSheet} from "react-native";

export default function NotFound(props) {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/SVG/not-found.svg')} />
            <View style={styles.textContainer}>
                <Text style={styles.headline}>Сторінку не знайдено!</Text>
                <Text style={styles.text}>Схоже ви зайшли кудись не туди. Поверніться назад або перезапустіть додаток</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 18,
        gap: 15,
        backgroundColor: "#333333"
    },
    textContainer: {
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
    },
    headline: {
        color: "#FFFFFF",
        fontSize: 18
    },
    text: {
        color: "#FFFFFF",
        fontSize: 16,
        textAlign: "center",
        opacity: 0.5
    }
})