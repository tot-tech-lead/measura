import {StyleSheet} from "react-native";
import {useLocalSearchParams} from "expo-router";

import ViewWithDoubleBackground from "../../../components/ViewWithDoubleBackground";
import Headline from "../../../components/Headline";

export default function ViewProject() {
    let {id} = useLocalSearchParams()

    return (
        <ViewWithDoubleBackground>
            <Headline>Price list of project with id {id}</Headline>
        </ViewWithDoubleBackground>
    )
}

const styles = StyleSheet.create({});
