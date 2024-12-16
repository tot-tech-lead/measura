import {Image, ScrollView, StyleSheet,Text, View} from "react-native";
import {useLocalSearchParams} from "expo-router";

import ViewWithDoubleBackground from "../../../components/ViewWithDoubleBackground";
import Headline from "../../../components/Headline";



export default function ViewProject() {
    let {id} = useLocalSearchParams()




    return (
        <ViewWithDoubleBackground>
            <Image style={styles.image}></Image>
            <ScrollView style={styles.container}>
                <Headline>{id}</Headline>

            </ScrollView>


        </ViewWithDoubleBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 25
    },
    image: {
        width: "100%",
        height: 200,
        resizeMode: "cover",

    },
});
