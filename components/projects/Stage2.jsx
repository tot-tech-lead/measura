import {StyleSheet, View} from "react-native";

import Headline from "../../components/Headline";
import UnderlinedInput from "../UnderlinedInput";

export default function Stage2({data, setProperty}) {
    return (
        <View style={styles.container}>
            <Headline>Матеріали</Headline>
            <UnderlinedInput value={data?.tileWidth || ""}
                             setValue={(v) => setProperty("tileWidth", v)}
                             label={"Ширина плитки"}
                             inputType="numeric" />
            <UnderlinedInput value={data?.tileHeight || ""}
                             setValue={(v) => setProperty("tileHeight", v)}
                             label={"Довжина плитки"}
                             inputType="numeric" />
            <UnderlinedInput value={data?.tileCostForMeterSq || ""}
                             setValue={(v) => setProperty("tileCostForMeterSq", v)}
                             label={"Вартість за 1 м2"}
                             inputType="numeric" />
            <UnderlinedInput value={data?.gluePrice || ""}
                             setValue={(v) => setProperty("gluePrice", v)}
                             label={"Вартість мішка клею"}
                             inputType="numeric" />
            <UnderlinedInput value={data?.glueWeight || ""}
                             setValue={(v) => setProperty("glueWeight", v)}
                             label={"Маса мішка"}
                             inputType="numeric" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 25,
    }
});
