import {ScrollView, StyleSheet, View} from "react-native";
import Txt from "../../components/Text";
import Headline from "../../components/Headline";
import {useRouter} from "expo-router";
import RoundButton from "../../components/RoundButton";
import ViewWithDoubleBackground from "../../components/ViewWithDoubleBackground";
import AdditionalServiceCard from "../../components/AdditionalServiceCard";
import {useSelector} from "react-redux";

export default function Services() {
    let router = useRouter();
    let additionalServices = useSelector(state => state.services.services);
    // const list = [
    //     {
    //         "id": 1,
    //         "name":"шумоізоляція",
    //         "type":"м^2",
    //         "price": 666
    //     },
    //     {
    //         "id": 2,
    //         "name":"перенести холодильник",
    //         "type":"одноразово",
    //         "price": 777
    //     },
    //     {
    //         "id": 3,
    //         "name":"зірвати старий паркет",
    //         "type":"м^2",
    //         "price": 1488
    //     },
    // ] 
    return (
        <ViewWithDoubleBackground>
            <View style={styles.container}>
                <Headline>Додаткові послуги</Headline>
                <Txt style={styles.ifEmpty}>Тут поки порожньо</Txt>
                {/* {additionalServices.lenght === 0 ? (
                    <Txt>Тут поки порожньо</Txt>
                ) : (
                    <AdditionalServiceCard list={list}/>
                )} */}
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
        flex: 1,
    },
    ifEmpty: {
        fontSize: 16,
        justifyContent: "center",
        alignItems: "center",
    },
})