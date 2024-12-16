import {StyleSheet, View} from "react-native";
import {useState} from "react";


import Headline from "../../components/Headline";
import Checkbox from "../UI/Checkbox/Checkbox";
import {useSelector} from "react-redux";


export default function Stage3({data, setProperty}) {
    let additionalServices = useSelector(state => state.additionalServices.additionalServices);
    let [selectedServices, setSelectedServices] = useState([])


    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Headline>Тарифи</Headline>

            </View>
            <View style={styles.section}>
                <Headline>Додаткові послуги</Headline>
                {
                    additionalServices && additionalServices.map((item) => (
                        <Checkbox label={item.name}
                                  key={`${item.name}-${item.id}`}
                                  value={selectedServices.includes(item.id)}
                                  onChange={() => {
                                      if (selectedServices.includes(item.id))
                                          setSelectedServices((prev) => prev.filter((i) => i !== item.id))
                                      else
                                          setSelectedServices((prev) => [...prev, item.id])
                                  }}
                        />

                    ))
                }
            </View>
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
    },
    section: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 15
    }
});
