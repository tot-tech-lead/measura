import {Dimensions, ScrollView, StyleSheet, View} from "react-native";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useRouter, useLocalSearchParams} from "expo-router";
import {useDispatch, useSelector} from "react-redux";

import ViewWithDoubleBackground from "../../../components/ViewWithDoubleBackground";
import Stage1 from "../../../components/projects/Stage1";
import Stage2 from "../../../components/projects/Stage2";
import Stage3 from "../../../components/projects/Stage3";
import DarkButton from "../../../components/DarkButton";
import StageBar from "../../../components/projects/StageBar";
import {createdProjectValidationSchema} from "../../../lib/validateProjectForm";
import {editOne} from "../../../store/projects/projects";
import Headline from "../../../components/Headline";
import Txt from "../../../components/Text";


function getIds(arr) {
    return arr.map(item => item.id);
}


let prepareUploaded = (data) => {
    return {
        ...data,
        tileWidth: Number(data.tileWidth) * 1000,
        tileHeight: Number(data.tileHeight) * 1000,
    }
}


export default function CreateProject() {
    let dispatch = useDispatch();
    let router = useRouter();

    let {id} = useLocalSearchParams();
    let projects = useSelector(state => state.projects.projects);
    let serviceIDs = useSelector(state => state.services.services)
    let additionalServiceIDs = useSelector(state => state.additionalServices.additionalServices)
    let [stage, setStage] = useState(0);
    let [data, setData] = useState({});


    let validationSchema = useMemo(() => {
        return createdProjectValidationSchema(getIds(serviceIDs), getIds(additionalServiceIDs))
    }, [serviceIDs, additionalServiceIDs])


    let setProperty = useCallback((key, value) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value
        }));
    }, [setData]);


    let stagesArray = useMemo(() => [
        <Stage1 setProperty={setProperty} data={data}/>,
        <Stage2 setProperty={setProperty} data={data}/>,
        <Stage3 setProperty={setProperty} data={data}/>,
    ], [data, setProperty]);


    let goBack = useCallback(() => {
        if (stage > 0) {
            setStage(stage - 1)
        } else {
            router.push("/");
        }
    }, [stage])


    let prepareToStore = (data) => {
        return {
            ...data,
            tileWidth: Number(data.tileWidth) / 1000,
            tileHeight: Number(data.tileHeight) / 1000,
        }
    }


    let save = useCallback(async () => {
        try {
            const resultOfValidation = await validationSchema.validate(data);
            dispatch(editOne(
                prepareToStore(resultOfValidation),
            ))
            router.push("/")
            alert("Проект змінено успішно!")
        } catch (validationError) {
            alert("- " + validationError.inner.join("\n- "))
        }
    }, [validationSchema, data]);


    let goForward = useCallback(() => {
        if (stage < stagesArray.length - 1) {
            setStage(stage + 1)
        } else {
            save(data)
        }
    }, [stage, save])


    useEffect(() => {
        let currentProject = projects.find(item => item.id === id);

        setData(
            prepareUploaded(currentProject)
        )
    }, [setData]);


    if (!data.id) {
        return <>
            <ViewWithDoubleBackground style={[styles.container]}>
                <Headline>Проекту немає</Headline>
                <Txt style={{textAlign: "center", fontSize: 16}}>
                    Схоже ви намагаєтесь переглянути проект який вже було видалено, або якого не існує.
                </Txt>
            </ViewWithDoubleBackground>
        </>
    }

    return (
        <ViewWithDoubleBackground style={[styles.container, {
            paddingTop: stage === 0 ? 0 : 50,
            padding: stage === 0 ? 0 : 20
        }]}>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
                {stagesArray[stage]}
            </ScrollView>
            <View style={styles.control}>
                <StageBar countOfStages={stagesArray.length}
                          currentStage={stage}
                />
                <View style={styles.actions}>
                    <DarkButton style={styles.actionBtn} onPress={goBack}>
                        {stage === 0 ? "Скасувати" : "Назад"}
                    </DarkButton>
                    <DarkButton style={styles.actionBtn} onPress={goForward}>
                        {stage === stagesArray.length - 1 ? "Зберегти" : "Далі"}
                    </DarkButton>
                </View>
            </View>
        </ViewWithDoubleBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 20,
        paddingTop: 50,
        paddingBottom: 120,
        flex: 1,
        zIndex: 1
    },
    scrollContainer: {
        width: "100%",
    },
    contentContainer: {
        width: "100%",
        minHeight: "100%"
    },
    actions: {
        width: "100%",
        flexDirection: "row",
        gap: 15,
        zIndex: 1,
        paddingBottom: 20,
        paddingHorizontal: 20
    },
    control: {
        position: "absolute",
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 10
    },
    actionBtn: {width: (Dimensions.get("window").width / 2) - 27.5}
});
