import {StyleSheet, View, Image} from "react-native";

import Headline from "../../components/Headline";
import {StatusBar} from "expo-status-bar";

export default function Stage1() {
    return (
        <>
            <View style={styles.container}>
                <Image style={styles.cover} source={require('../../assets/images/card/default-cover.png')} />
                <Headline>Новий проєкт</Headline>
            </View>
            <StatusBar style="inverted" animated={true}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20,
    },
    cover: {
        width: '100%',
        height: "auto",
        aspectRatio: 78/35
    }
});
