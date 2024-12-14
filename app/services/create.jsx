import {Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {useCallback, useState} from "react";
import {useRouter} from "expo-router";
import {useDispatch} from "react-redux";

import ViewWithDoubleBackground from "../../components/ViewWithDoubleBackground";
import Headline from "../../components/Headline";
import Txt from "../../components/Text";
import UnderlinedInput from "../../components/UnderlinedInput";
import DarkButton from "../../components/DarkButton";
import {addNew} from "../../store/services/services";

export default function CreateService() {
    let router = useRouter();
    let dispatch = useDispatch();

    let [conditions, setConditions] = useState([""]);
    let [price, setPrice] = useState("");

    const addCondition = useCallback(() => {
        if (conditions.length >= 5) {
            alert("Максимальна кількість умов: 5")
            return
        }

        setConditions([...conditions, ""]);
    }, [conditions, setConditions])

    const onChangeConditionHandler = useCallback((index) => {
        return (value) => {
            setConditions(
                conditions.map((item, insideIndex) =>
                    insideIndex === index ? value : item
                )
            )
        }
    }, [conditions, setConditions]);

    const removeCondition = useCallback((index) => {
        return () => {
            if (conditions.length <= 1) {
                alert("Мінімальна кількість умов: 1")
                return
            }

            setConditions(
                conditions.filter((item, innerIndex) => index !== innerIndex)
            )
        }
    }, [conditions, setConditions]);

    const saveHandler = useCallback(() => {
        let conditionsCopy = JSON.parse(JSON.stringify(conditions));
        let localPrice = Number(price);

        let conditionsValidationPattern = conditionsCopy
            .map((item, index) => String(item).length <= 2 ? index : false)
            .filter(item => typeof item === "number")


        if (conditionsValidationPattern.length > 0) {
            alert(`Перевірте чи заповнені умови у наступних полях: ${
                conditionsValidationPattern.map(item => item + 1).join(",")
            } (кожна умова повинна містити більше ніж 2 символи)`)
            return;
        }

        if (Number.isNaN(localPrice)) {
            alert(`Халепа!\nСхоже що вказана вартість не є числом. Перевірте ще раз і спробуйте знову`)
            return;
        }

        let newService = {
            price: localPrice,
            conditions: conditionsCopy,
        }

        dispatch(addNew(newService));
        alert("Послугу створено!")

        router.push("/services")
    }, [conditions, price])

    return (
        <ViewWithDoubleBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <Headline>Нова послуга</Headline>
                <View style={styles.formContainer}>
                    <View style={styles.conditions}>
                        <Txt style={styles.conditionsHeadline}>Умови:</Txt>
                        <TouchableOpacity style={styles.conditionsAddBtn} onPress={addCondition}>
                            <Image style={styles.conditionsAddIcon}
                                   source={require("../../assets/images/AddIcon.png")}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.conditionsInputs}>
                        {
                            conditions.map((item, index) =>
                                <View style={styles.conditionsInput} key={'input' + index}>
                                    <UnderlinedInput value={item}
                                                     setValue={onChangeConditionHandler(index)}
                                                     label="Умова"
                                                     inputType="default"
                                    />
                                    <TouchableOpacity style={styles.conditionsInputRemove}
                                                      onPress={removeCondition(index)}>
                                        <Image style={styles.conditionsInputRemoveIcon}
                                               source={require("../../assets/images/remove-icon.png")}/>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    </View>
                    <UnderlinedInput value={price}
                                     setValue={(v) => setPrice(v)}
                                     label="Вартість"
                                     inputType="decimal-pad"
                    />
                </View>
            </ScrollView>
            <View style={styles.actionButtons}>
                <DarkButton style={{width: (Dimensions.get("window").width / 2) - 27.5}}
                            onPress={() => router.navigate("/services")}
                >
                    Назад
                </DarkButton>
                <DarkButton style={{width: (Dimensions.get("window").width / 2) - 27.5}}
                            onPress={saveHandler}
                >
                    Створити
                </DarkButton>
            </View>
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
        zIndex: 6,
    },
    formContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 25
    },
    conditions: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    conditionsHeadline: {
        fontSize: 24,
        fontWeight: "500",
        color: "#595959"
    },
    conditionsAddBtn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: "#333333"
    },
    conditionsAddIcon: {
        height: 12,
        width: 12,
    },
    conditionsInputs: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 10
    },
    conditionsInput: {
        width: "100%",
        position: 'relative',
        zIndex: 1
    },
    conditionsInputRemove: {
        position: "absolute",
        bottom: 5,
        right: 5,
        height: 25,
        width: 25,
        zIndex: 2
    },
    conditionsInputRemoveIcon: {
        height: "100%",
        width: "100%"
    },
    actionButtons: {
        width: "100%",
        padding: 20,
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        gap: 15,
        zIndex: 1
    },
});
