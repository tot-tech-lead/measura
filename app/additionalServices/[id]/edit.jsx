import ViewWithDoubleBackground from "../../../components/ViewWithDoubleBackground";
import Headline from "../../../components/Headline";
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Dimensions, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import DarkButton from "../../../components/DarkButton";
import React, {useCallback, useState} from "react";
import UnderlinedInput from "../../../components/UnderlinedInput";


export default function Edit() {
    let {id} = useLocalSearchParams();
    let router = useRouter();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);

    const options = ["м^2", "одиниці"]

    const saveHandler = useCallback(() => {
        console.log(id);
    })

    return (
        <ViewWithDoubleBackground style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Headline>Змініть додаткову послугу</Headline>
                <UnderlinedInput
                    label="Назва"
                    inputType="default"
                    value={name}
                    setValue={setName}
                />
                <UnderlinedInput
                    label="Вартість"
                    inputType="numeric"
                    value={price}
                    setValue={setPrice}
                />
                <View style={styles.inputWithIcon}>
                    <UnderlinedInput
                        label="Тип"
                        inputType="default"
                        value={type}
                        setValue={setType}
                    />
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => setModalVisible(true)}
                    >
                        <Image
                            source={require("../../../assets/images/downArrow.png")}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.actionButtons}>
                <DarkButton style={{width: (Dimensions.get("window").width / 2) - 27.5}}
                            onPress={() => router.navigate("/additionalServices")}
                >
                    Назад
                </DarkButton>
                <DarkButton style={{width: (Dimensions.get("window").width / 2) - 27.5}}
                            onPress={saveHandler}
                >
                    Зберегти
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
        </ViewWithDoubleBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 50,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: "column",
        gap: 25,
        zIndex: 1,
    },

    actionButtons: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        gap: 15,
        zIndex: 1
    },

    scrollContainer: {
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
    },
    icon: {
        resizeMode: "contain",
        width: 20,
        height: 20,
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

})