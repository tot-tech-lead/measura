import {ScrollView, StyleSheet} from "react-native";

import ViewWithBackground from "../../components/ViewWithBackground";
import Headline from "../../components/Headline";
import RoundButton from "../../components/RoundButton";
import {useNavigation} from "expo-router";


export default function CreateService() {
    let navigation = useNavigation();

    return (
        <ViewWithBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <Headline>Create</Headline>
            </ScrollView>
        </ViewWithBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 50
    }
})