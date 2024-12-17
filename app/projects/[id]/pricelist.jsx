import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import ViewWithDoubleBackground from "../../../components/ViewWithDoubleBackground";
import Headline from "../../../components/Headline";
import DarkButton from "../../../components/DarkButton";
import Txt from "../../../components/Text";
import { router } from "expo-router";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";
import * as Print from "expo-print";

import React, { useRef } from "react";

export default function ViewProject() {
    const { id } = useLocalSearchParams();
    const viewShotRef = useRef();

    const saveAsPNG = async () => {
        try {
            const uri = await viewShotRef.current.capture();
            const fileUri = `${FileSystem.documentDirectory}estimate.png`;

            await FileSystem.copyAsync({
                from: uri,
                to: fileUri,
            });

            await Sharing.shareAsync(fileUri);
        } catch (error) {
            console.error("Помилка збереження PNG:", error);
        }
    };

    const saveAsPDF = async () => {
        try {
            const uri = await viewShotRef.current.capture();
            const htmlContent = `
                <html>
                    <body style="display: flex; justify-content: center; align-items: center;">
                        <img src="${uri}" style="width: 100%; height: auto;" />
                    </body>
                </html>
            `;
            const { uri: pdfUri } = await Print.printToFileAsync({ html: htmlContent });
            await Sharing.shareAsync(pdfUri);
        } catch (error) {
            console.error("Помилка збереження PDF:", error);
        }
    };

    return (
        <ViewWithDoubleBackground style={styles.container}>
            <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}>
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
                        <Txt style={styles.leftText}>Вартість плитки</Txt>
                        <Txt style={styles.rightText}>21400₴</Txt>
                    </View>
                    <View style={styles.total}>
                        <Txt style={styles.totalText}>Загальна вартість</Txt>
                        <Txt style={styles.totalAmount}>42470₴</Txt>
                    </View>
                </View>
            </ViewShot>
            <View style={styles.buttonContainer}>
                <DarkButton onPress={saveAsPDF} style={styles.button}>
                    Зберегти PDF
                </DarkButton>
                <DarkButton onPress={saveAsPNG} style={styles.button}>
                    Зберегти PNG
                </DarkButton>
                <DarkButton onPress={() => router.push("/")} style={styles.button}>
                    Назад
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
