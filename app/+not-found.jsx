import {View, Image, StyleSheet} from "react-native";

import notFoundImage from "../assets/SVG/not-found.svg"
import Txt from "../components/Text";

export default function NotFound(props) {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={notFoundImage} height={150} />
            <View style={styles.textContainer}>
                <Txt style={styles.headline}>Сторінку не знайдено!</Txt>
                <Txt style={styles.text}>Схоже ви зайшли кудись не туди. Поверніться назад або перезапустіть додаток</Txt>
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
        fontWeight: "500",
        fontSize: 24
    },
    text: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: '300',
        textAlign: "center",
        opacity: 0.5
    },
    image: {
        height: 150,
    }
})