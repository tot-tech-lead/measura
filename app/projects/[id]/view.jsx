import {Image, ScrollView, StyleSheet,Text, View} from "react-native";
import {useLocalSearchParams} from "expo-router";

import ViewWithDoubleBackground from "../../../components/ViewWithDoubleBackground";
import Headline from "../../../components/Headline";
import {useSelector} from "react-redux";
import defaultImg from "../../../assets/images/card/default-cover.png";
import useCalculateProjectDetails from "../../../lib/calculations";

export default function ViewProject() {
    let {id} = useLocalSearchParams()

    const ProjectInf = useSelector(state => state.projects.projects)

    const projectInfo = useSelector(state =>
        state.projects.projects.find((project) => project.id === id)
    );
    const project = {
        "area": projectInfo.area,
        "gluePrice": projectInfo.gluePrice,
        "glueWeight": projectInfo.glueWeight,
        "services": [
            projectInfo.services
        ],
        "tarif": projectInfo.tarif,
        "tileCostForMeterSq": projectInfo.tileCostForMeterSq,
        "tileHeight": projectInfo.tileHeight,
        "tileWidth": projectInfo.tileWidth,
    }

    const calculated = useCalculateProjectDetails(project)
    return (
        <ViewWithDoubleBackground>
            <Image source={projectInfo.cover || defaultImg} style={styles.image}></Image>
            <ScrollView style={styles.container}>
                <Headline>{projectInfo.name}</Headline>

                <View>
                    <Text>{calculated.tileArea}</Text>
                    <Text>{calculated.areaWithPercentage}</Text>
                    <Text>{calculated.totalTileCount}</Text>
                    <Text>{calculated.tilesPerSquareMeter}</Text>
                    <Text>{calculated.workPrice}</Text>
                    <Text>{calculated.additionalPrice}</Text>
                </View>

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
