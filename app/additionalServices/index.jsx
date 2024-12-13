import {ScrollView, StyleSheet} from "react-native";

import Headline from "../../components/Headline";
import {useRouter} from "expo-router";
import RoundButton from "../../components/RoundButton";
import ViewWithDoubleBackground from "../../components/ViewWithDoubleBackground";


export default function Services() {
    let router = useRouter();

    return (
        <ViewWithDoubleBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <Headline>Additional Services</Headline>
            </ScrollView>
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
    }
})