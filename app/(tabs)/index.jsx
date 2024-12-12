import {useState} from "react";
import {ScrollView, StyleSheet, View} from "react-native";

import ViewWithBackground from "../../components/ViewWithBackground";
import RoundedInput from "../../components/RoundedInput";
import Headline from "../../components/Headline";
import ProjectCard from "../../components/ProjectCard";
import RoundButton from "../../components/RoundButton";


const Index = () => {
    let [searchValue, setSearchValue] = useState("");

    return (
        <ViewWithBackground style={styles.container}>
            <ScrollView style={styles.projects} contentContainerStyle={styles.scrollContainer}>
                <View style={styles.headingContainer}>
                    <Headline>Мої проєкти</Headline>
                    <RoundedInput value={searchValue}
                                  setValue={setSearchValue}
                                  placeholder={"Пошук"}
                                  iconSource={require("../../assets/images/SearchIcon.png")}
                                  onIconPress={() => {
                                      alert(`Ви шукаєте: ${searchValue}\n\nАле функціонал у розробці :(`);
                                  }}
                    />
                </View>
                <View style={styles.projectsContainer}>
                    <ProjectCard name="name"
                                 address="address"
                                 price={1000500}
                                 ID="1"/>
                    <ProjectCard name="name 1"
                                 address="address"
                                 price={1000500}
                                 ID="2"/>
                    <ProjectCard name="name 2"
                                 address="address"
                                 price={1000500}
                                 ID="3"/>
                    <ProjectCard name="name 3"
                                 address="address"
                                 price={1000500}
                                 ID="5"/>
                </View>
            </ScrollView>
            <RoundButton />
        </ViewWithBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: "column",
        gap: 25,
        overflow: "visible"
    },
    scrollContainer: {
        padding: 20,
        paddingTop: 40,
    },
    projects: {
        overflow: "visible",
        zIndex: 1,
        width: "100%",
    },
    headingContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        flexDirection: "column",
        zIndex: 2
    },
    projectsContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 25,
        marginTop: 25
    }
})

export default Index;
