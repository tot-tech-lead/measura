import {Dimensions, FlatList, Image, Modal, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useDispatch, useSelector} from "react-redux";

import ViewWithDoubleBackground from "../../../components/ViewWithDoubleBackground";
import Headline from "../../../components/Headline";
import Txt from "../../../components/Text";
import UnderlinedInput from "../../../components/UnderlinedInput";
import DarkButton from "../../../components/DarkButton";
import {editOne} from "../../../store/additionalServices/additionalServices";

const encodeType = {
    "одиницю площі": "forArea",
    "одиниці": "once"
};

export default function EditService() {
    const router = useRouter();
    const dispatch = useDispatch();
    const additionalServices = useSelector(state => state.additionalServices.additionalServices);
    const {id} = useLocalSearchParams();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");

    const [isModalVisible, setModalVisible] = useState(false);
    const options = useMemo(() => Object.keys(encodeType), []);

    const handleSelect = (value) => {
        setType(encodeType[value] || value); // Зберігаємо кодоване значення
        setModalVisible(false);
    };

    useEffect(() => {
        if (additionalServices && id) {
            const currentService = additionalServices.find(item => item.id === id);

            if (currentService) {
                setName(currentService.name);
                setPrice(String(currentService.price));
                setType(currentService.type);
            }
        }
    }, [id, additionalServices]);

    const saveHandler = useCallback(() => {
        const nameCopy = String(name);
        const localPrice = Number(price);
        const typeCopy = String(type);

        if (nameCopy.length <= 2) {
            alert("Назва повинна містити більше ніж 2 символи");
            return;
        }

        if (Number.isNaN(localPrice)) {
            alert("Вартість повинна бути числом");
            return;
        }

        if (!Object.values(encodeType).includes(typeCopy)) {
            alert("Поле 'Тип' повинно бути заповнене коректно");
            return;
        }

        const updatedService = {
            id: id,
            name: nameCopy,
            price: localPrice,
            type: typeCopy,
        };

        dispatch(editOne(updatedService));
        alert("Послугу успішно змінено!");
        router.push("/additionalServices");
    }, [name, price, type, id, dispatch, router]);

    const readableType = useMemo(
        () => Object.keys(encodeType).find(key => encodeType[key] === type) || type,
        [type]
    );

    return (
        <ViewWithDoubleBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <Headline>Редагування послуги</Headline>
                <View style={styles.formContainer}>
                    <UnderlinedInput
                        value={name}
                        setValue={setName}
                        label="Назва"
                        inputType="default"
                    />
                    <UnderlinedInput
                        value={price}
                        setValue={setPrice}
                        label="Вартість"
                        inputType="decimal-pad"
                    />
                    <View style={styles.inputWithIcon}>
                        <UnderlinedInput
                            label="Платіж за ..."
                            inputType="default"
                            value={readableType}
                            setValue={() => alert("Оберіть зі списку")}
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
                </View>
            </ScrollView>
            <View style={styles.actionButtons}>
                <DarkButton style={{width: (Dimensions.get("window").width / 2) - 27.5}}
                            onPress={() => router.navigate("/additionalServices")}>
                    Назад
                </DarkButton>
                <DarkButton style={{width: (Dimensions.get("window").width / 2) - 27.5}}
                            onPress={saveHandler}>
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
        </ViewWithDoubleBackground>
    );
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

