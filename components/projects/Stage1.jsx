import {Image, StyleSheet, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import Headline from "../../components/Headline";
import UnderlinedInput from "../UnderlinedInput";
import DarkButton from "../DarkButton";


export default function Stage1({data, setProperty}) {
    const saveImageLocally = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                const {uri} = result.assets[0];

                const fileName = uri.split('/').pop();
                const destPath = `${FileSystem.documentDirectory}${fileName}`;

                await FileSystem.copyAsync({
                    from: uri,
                    to: destPath,
                });

                await setProperty("cover", destPath)
            }
        } catch (error) {
            console.error("Error saving image:", error);
        }
    };

    return (
        <>
            <View style={styles.container}>
                <Image
                    style={styles.cover}
                    source={
                        data?.cover
                            ? {uri: data.cover}
                            : require('../../assets/images/card/default-cover.png')
                    }
                />

                <Headline>Новий проєкт</Headline>
                <View style={styles.form}>
                    <UnderlinedInput value={data?.name ? String(data?.name): ""}
                                     setValue={(v) => setProperty("name", v)}
                                     label="Назва"
                                     inputType="default"
                    />
                    <UnderlinedInput value={data?.address ? String(data?.address): ""}
                                     setValue={(v) => setProperty("address", v)}
                                     label="Адреса (не обов'язково)"
                                     inputType="default"
                    />
                    <UnderlinedInput value={data?.area ? String(data?.area): ""}
                                     setValue={(v) => setProperty("area", v)}
                                     label="Площа поверхні"
                                     inputType="numeric"
                    />
                    <UnderlinedInput value={data?.description ? String(data?.description): ""}
                                     setValue={(v) => setProperty("description", v)}
                                     label="Опис (не обов'язково)"
                                     inputType="default"
                    />
                    <DarkButton onPress={saveImageLocally}
                                iconSource={require("../../assets/images/icons/image-icon.png")}
                                iconPlacement={"before"}
                                style={{width: "100%"}}
                    >
                        {data.cover ? "Замінити обкладинку" : "Обкладинка (необов’язково)"}
                    </DarkButton>
                </View>
            </View>
            <StatusBar style="inverted" animated={true}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
    },
    cover: {
        width: '100%',
        height: "auto",
        aspectRatio: 78 / 35
    },
    form: {
        width: '100%',
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        gap: 25,
    },
});
