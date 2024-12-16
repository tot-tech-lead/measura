import {FlatList, Image, Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import {useCallback, useEffect, useState} from "react";


import Headline from "../../components/Headline";
import Checkbox from "../UI/Checkbox/Checkbox";
import {useSelector} from "react-redux";
import Txt from "../Text";
import UnderlinedInput from "../UnderlinedInput";


export default function Stage3({data, setProperty}) {
    const [isModalVisible, setModalVisible] = useState(false);
    const services = useSelector((state) => state.services.services);
    const options = services.map(item => item.conditions.join(" + "))

    let additionalServices = useSelector(state => state.additionalServices.additionalServices);
    let [selectedServices, setSelectedServices] = useState(data.services || [])

    let handleSelect = useCallback((value)=>{
        let service = services.find(item => item.conditions.join(" + ") === value);

        setProperty("tarif", service.id)
        setModalVisible(false)
    }, [])

    let getTarifNameNyId = useCallback((id) => {
        return services.find(item => item.id === id)?.conditions.join(" + ") || "";
    }, [services])

    useEffect(() => {
        setProperty("services", selectedServices)
    }, [selectedServices])

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Headline>Тарифи</Headline>
                <View style={styles.inputWithIcon}>
                    <UnderlinedInput
                        label="Оберіть тариф"
                        inputType="default"
                        value={getTarifNameNyId(data.tarif)}
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
            </View>
            <View style={styles.section}>
                <Headline>Додаткові послуги</Headline>
                {
                    additionalServices && additionalServices.map((item) => (
                        <Checkbox label={item.name}
                                  key={`${item.name}-${item.id}`}
                                  value={selectedServices.includes(item.id)}
                                  onChange={() => {
                                      if (selectedServices.includes(item.id))
                                          setSelectedServices((prev) => prev.filter((i) => i !== item.id))
                                      else
                                          setSelectedServices((prev) => [...prev, item.id])
                                  }}
                        />

                    ))
                }
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
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 25,
    },
    section: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 15
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
