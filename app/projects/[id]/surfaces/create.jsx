import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react";

import ViewWithDoubleBackground from "../../../../components/ViewWithDoubleBackground";
import Stage1 from "../../../../components/surfaces/stages/Stage1";
import Stage2 from "../../../../components/surfaces/stages/Stage2";
import DarkButton from "../../../../components/DarkButton";
import StageBar from "../../../../components/projects/StageBar";

export default function CreateSurface() {
    let [stage, setStage] = useState(0);

    let stagesArray = [
        <Stage1 />,
        <Stage2 />,
    ];

    const goBack = () => {
        if (stage > 0) {
            setStage(stage - 1);
        }
    };

    const goForward = () => {
        if (stage < stagesArray.length - 1) {
            setStage(stage + 1);
        }
    };

    return (
        <ViewWithDoubleBackground style={[styles.container, {
            paddingTop: stage === 0 ? 0 : 50,
            padding: stage === 0 ? 0 : 20,
        }]}>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
                {stagesArray[stage]}
            </ScrollView>
            <View style={styles.control}>
                <StageBar countOfStages={stagesArray.length} currentStage={stage} />
                <View style={styles.actions}>
                    <DarkButton style={styles.actionBtn} onPress={goBack} disabled={stage === 0}>
                        {stage === 0 ? "Скасувати" : "Назад"}
                    </DarkButton>
                    <DarkButton style={styles.actionBtn} onPress={goForward} disabled={stage === stagesArray.length - 1}>
                        {stage === stagesArray.length - 1 ? "Зберегти" : "Далі"}
                    </DarkButton>
                </View>
            </View>
        </ViewWithDoubleBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 20,
        paddingTop: 50,
        paddingBottom: 120,
        flex: 1,
        zIndex: 1,
    },
    scrollContainer: {
        width: "100%",
    },
    contentContainer: {
        width: "100%",
        minHeight: "100%",
    },
    actions: {
        width: "100%",
        flexDirection: "row",
        gap: 15,
        zIndex: 1,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    control: {
        position: "absolute",
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 10,
    },
    actionBtn: {
        width: (Dimensions.get("window").width / 2) - 27.5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
});
