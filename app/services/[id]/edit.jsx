import ViewWithDoubleBackground from "../../../components/ViewWithDoubleBackground";
import Headline from "../../../components/Headline";
import {useLocalSearchParams} from 'expo-router';
import {StyleSheet} from "react-native";


export default function Edit() {
    let {id} = useLocalSearchParams();

    return (
        <ViewWithDoubleBackground style={styles.container}>
            <Headline>Edit id {id}</Headline>
        </ViewWithDoubleBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50
    }
})