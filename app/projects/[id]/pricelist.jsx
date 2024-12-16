import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import ViewWithDoubleBackground from "../../../components/ViewWithDoubleBackground";
import Headline from "../../../components/Headline";
import DarkButton from "../../../components/DarkButton";
import Txt from "../../../components/Text";
import { router } from "expo-router";
export default function ViewProject() {
    let { id } = useLocalSearchParams();

    return (
        <ViewWithDoubleBackground style={styles.container}>
            <Headline>Проєкт {id}</Headline>
            <View style={styles.budgetContainer}>
                <Txt style={styles.budgetHeadline}>Кошторис</Txt>
                <View style={styles.lineItem}>
                    <Txt style={styles.leftText}>Вартість роботи</Txt>
                    <Txt style={styles.rightText}>20000₴</Txt>
                </View>
                <View style={styles.lineItem}>
                    <Txt style={styles.leftText}>Вартість клею</Txt>
                    <Txt style={styles.rightText}>1070₴</Txt>
                </View>
                <View style={styles.lineItem}>
                    <Txt style={styles.leftText}>Вартість плитки </Txt>
                    <Txt style={styles.rightText}>21400₴</Txt>
                </View>
                <View style={styles.lineItem}>
                    <Txt style={styles.leftText}>Загальна вартість матеріалів</Txt>
                    <Txt style={styles.rightText}>22470₴</Txt>
                </View>
                <View style={styles.total}>
                    <Txt style={styles.totalText}>Загальна вартість</Txt>
                    <Txt style={styles.totalAmount}>42470₴</Txt>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <DarkButton
                    iconSource={require("../../../assets/images/pdfIcon.png")}
                    iconPlacement="before"
                    style={styles.button}
                >
                    Зберегти PDF
                </DarkButton>
                <DarkButton
                    iconSource={require("../../../assets/images/jpgIcon.png")}
                    iconPlacement="before"
                    style={styles.button}
                >
                    Зберегти JPG
                </DarkButton>
                <DarkButton
                    iconSource={require("../../../assets/images/HouseIcon.png")}
                    iconPlacement="before"
                    style={styles.button}
                    onPress={() => router.push("/")}
                >
                    Додому
                </DarkButton>
            </View>
        </ViewWithDoubleBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
    },
    budgetHeadline: {
        fontSize: 24,
        color: "#595959",
        textAlign: "center",
        marginBottom: 10,
    },
    budgetContainer: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
        gap: 15,
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4,
        flexShrink: 1,
    },
    lineItem: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    leftText: {
        fontSize: 16,
        color: "#595959",
    },
    rightText: {
        fontSize: 16,
        color: "#595959",
    },
    total: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },
    totalText: {
        fontSize: 20,
        color: "#595959",
    },
    totalAmount: {
        fontSize: 22,
        color: "#595959",
    },
    buttonContainer: {
        gap: 15,
        marginTop: "auto",
    },
    button: {
        justifyContent: "center",
        borderRadius: 8,
        width: "100%",
    },
});
