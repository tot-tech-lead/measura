import {ScrollView, StyleSheet} from "react-native";

import Headline from "../../components/Headline";
import {Link, useRouter} from "expo-router";
import RoundButton from "../../components/RoundButton";
import ViewWithDoubleBackground from "../../components/ViewWithDoubleBackground";
import Txt from "../../components/Text";


export default function Services() {
    let router = useRouter();

    return (
        <ViewWithDoubleBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <Headline>Services</Headline>
                <Link href="/services/1/edit">
                    <Txt>Go to 1</Txt>
                </Link>
                <Link href="/services/2/edit">
                    <Txt>Go to 2</Txt>
                </Link>
            </ScrollView>
            <RoundButton iconSource={require("../../assets/images/AddIcon.png")}
                         onPress={() => router.push("/services/create")}
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