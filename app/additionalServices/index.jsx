import {StyleSheet, View} from "react-native";
import Txt from "../../components/Text";
import Headline from "../../components/Headline";
import {useMemo} from "react";
import {useRouter} from "expo-router";
import RoundButton from "../../components/RoundButton";
import ViewWithDoubleBackground from "../../components/ViewWithDoubleBackground";
import {useSelector} from "react-redux";
import AdditionalServiceCard from "../../components/AdditionalServiceCard";

const decodeType = {
    "forArea": "м^2",
    "once": "одиниці"
}

export default function Services() {
    let router = useRouter();
    let additionalServices = useSelector(state => state.additionalServices.additionalServices);
    let list = useMemo(() => {
        return additionalServices.map(item => ({
            ...item, type: decodeType[item.type],
        }))
    }, [additionalServices]);

    return (
        <ViewWithDoubleBackground>
            <View style={styles.container}>
                <Headline>Додаткові послуги</Headline>
                {
                    additionalServices.length === 0 ? (
                        <Txt style={styles.ifEmpty}>Тут поки порожньо</Txt>
                    ) : (
                        <AdditionalServiceCard list={list}/>
                    )
                }
            </View>
            <RoundButton iconSource={require("../../assets/images/AddIcon.png")}
                         onPress={() => router.push("/additionalServices/create")}
            />
        </ViewWithDoubleBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 50,
        gap: 25,
        flex: 1,
    },
    ifEmpty: {
        fontSize: 16,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
})