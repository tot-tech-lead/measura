import {useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {Dimensions, FlatList, Image, Modal, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";

import ViewWithBackground from "../../components/ViewWithBackground";
import Headline from "../../components/Headline";
import DarkButton from "../../components/DarkButton";
import UnderlinedInput from "../../components/UnderlinedInput";
import {useRouter} from "expo-router";
import Txt from "../../components/Text";

import {addNew} from "../../store/additionalServices/additionalServices";

const encodeType = {
    "м²": "forArea",
    "одиниці": "once"
}

export default function CreateService() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");

    const [isModalVisible, setModalVisible] = useState(false);

    const options = useMemo(() => Object.keys(encodeType), []);

    const handleSelect = (value) => {
        setType(value);
        setModalVisible(false);
    };

    const handleSubmit = () => {
        let nameCopy = String(name);
        let localPrice = Number(price);
        let typeCopy = String(type);

        if (Number.isNaN(localPrice)) {
            alert(`Халепа!\nСхоже що вказана вартість не є числом. Перевірте ще раз і спробуйте знову`)
            return;
        }

        if (nameCopy.length <= 2) {
            alert(`Халепа!\nНазва послуги повинно містити більше ніж 2 символи`)
            return;
        }

        if (typeCopy.length <= 2) {
            alert(`Халепа!\nЗаповніть поле "Платіж за"`)
            return;
        }

        if (!encodeType[typeCopy.trim()]) {
            alert(`Помилка!\nОберіть ще раз у полі "Платіж за"`)
        }

        let newAdditionalService = {
            name: nameCopy,
            type: encodeType[typeCopy.trim()],
            price: localPrice
        }

        dispatch(addNew(newAdditionalService));
        alert("Додаткову послугу створено!")

        router.navigate("/additionalServices")
    };

    return (
        <ViewWithBackground style={styles.fullScreen}>
            <ScrollView contentContainerStyle={styles.container}>
                <Headline>Створити додаткову послугу</Headline>
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
                        label="Платіж за ..."
                        inputType="default"
                        value={type}
                        setValue={() => alert("Оберіть зі списку")}
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
                    onPress={() => router.navigate("/additionalServices")}
                >
                    Скасувати
                </DarkButton>
                <DarkButton
                    style={{
                        width: Dimensions.get("window").width / 2 - 27.5,
                    }}
                    onPress={handleSubmit}
                >
                    Додати
                </DarkButton>
            </View>

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Headline>Оберіть зі списку</Headline>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Txt style={styles.optionText}>
                                        {item}
                                    </Txt>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Txt style={styles.closeButtonText}>Скасувати</Txt>
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
        paddingVertical: 20,
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
        paddingBottom: 20,
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
        width: "100%",
        marginTop: 20,
        backgroundColor: "#333333",
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center"
    },
});
