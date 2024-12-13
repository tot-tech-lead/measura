import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    Modal,
    Text,
    FlatList,
} from "react-native";

import ViewWithBackground from "../../components/ViewWithBackground";
import Headline from "../../components/Headline";
import DarkButton from "../../components/DarkButton";
import UnderlinedInput from "../../components/UnderlinedInput";
import { useRouter } from "expo-router";

export default function CreateService() {
    const router = useRouter();

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");

    const options = ["м", "м^2", "м^3", "шт"]

    const handleSelect = (value) => {
        setSelectedValue(value);
        setModalVisible(false);
    };

    return (
        <ViewWithBackground style={styles.fullScreen}>
            <ScrollView contentContainerStyle={styles.container}>
                <Headline>Створити додаткову послугу</Headline>
                <UnderlinedInput label="Назва" inputType="default" />
                <UnderlinedInput label="Вартість" inputType="numeric" />
                <View style={styles.inputWithIcon}>
                    <UnderlinedInput
                        label="Кількість"
                        inputType="default"
                        value={selectedValue}
                        setValue={setSelectedValue}
                    />
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => setModalVisible(true)}
                    >
                        <Image
                            source={require("../../assets/images/downArrow.png")}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <DarkButton
                    style={{
                        width: Dimensions.get("window").width / 2 - 27.5,
                    }}
                    onPress={() => router.navigate("/")}
                >
                    Скасувати
                </DarkButton>
                <DarkButton
                    style={{
                        width: Dimensions.get("window").width / 2 - 27.5,
                    }}
                    onPress={() => router.navigate("/")}
                >
                    Ок
                </DarkButton>
            </View>

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={styles.optionText}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Закрити</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ViewWithBackground>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
    },
    container: {
        padding: 20,
        paddingTop: 40,
        gap: 20,
        flexGrow: 1,
    },
    inputWithIcon: {
        position: "relative",
    },
    iconContainer: {
        position: "absolute",
        right: 10,
        paddingVertical: 5,
    },
    icon: {
        resizeMode: "contain",
        width: 20,
        height: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        paddingBottom: 40,
        backgroundColor: "white",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    option: {
        paddingVertical: 10,
        width: "100%",
        alignItems: "center",
    },
    optionText: {
        fontSize: 16,
        color: "#333",
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: "#ccc",
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        fontSize: 16,
        color: "#fff",
    },
});
