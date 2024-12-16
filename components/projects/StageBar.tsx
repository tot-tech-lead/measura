import {Animated, Dimensions, StyleSheet, View} from "react-native";
import {useEffect, useMemo, useRef} from "react";
import Txt from "../Text";

type Props = {
    countOfStages: number;
    currentStage: number;
};

export default function StageBar({countOfStages, currentStage}: Props) {
    const stages = useMemo<number[]>(() => {
        let arr: number[] = [];
        for (let i = 0; i < countOfStages; i++) {
            arr.push(i);
        }
        return arr;
    }, [countOfStages]);

    const animatedWidths = useRef<Animated.Value[]>(
        stages.map(() => new Animated.Value(0))
    ).current;

    useEffect(() => {
        stages.forEach((stage, index) => {
            Animated.timing(animatedWidths[index], {
                toValue: currentStage >= stage ? 1 : 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        });
    }, [currentStage, stages]);

    return (
        <View style={styles.container}>
            <Txt>Крок {currentStage + 1}</Txt>
            <View style={styles.barContainer}>
                {stages.map((stage, index) => (
                    <Animated.View
                        key={`Stage-${stage}`}
                        style={[
                            styles.stageItem,
                            {
                                width: animatedWidths[index].interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [
                                        (Dimensions.get("window").width / countOfStages) - 5 * countOfStages,
                                        (Dimensions.get("window").width / countOfStages) - 5 * countOfStages
                                    ],
                                }),
                                backgroundColor: animatedWidths[index].interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ["#D9D9D9", "#595959"],
                                }),
                            },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        paddingHorizontal: 20,
        gap: 5,
    },
    barContainer: {
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "center",
        gap: 5,
    },
    stageItem: {
        height: 5,
        minWidth: 5,
        borderRadius: 5,
    },
});
