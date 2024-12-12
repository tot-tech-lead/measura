import {Stack} from "expo-router";
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from "react";
import {StatusBar} from "expo-status-bar";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "../store";


SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
    const [loaded, error] = useFonts({
        'GeologicaThin': require("../assets/fonts/Geologica_Thin.otf"),
        'GeologicaExtraLight': require("../assets/fonts/Geologica_ExtraLight.otf"),
        'GeologicaLight': require("../assets/fonts/Geologica_Light.otf"),
        'GeologicaRegular': require("../assets/fonts/Geologica_Regular.otf"),
        'GeologicaMedium': require("../assets/fonts/Geologica_Medium.otf"),
        'GeologicaSemiBold': require("../assets/fonts/Geologica_SemiBold.otf"),
        'GeologicaBold': require("../assets/fonts/Geologica_Bold.otf"),
        'GeologicaExtraBold': require("../assets/fonts/Geologica_ExtraBold.otf"),
        'GeologicaBlack': require("../assets/fonts/Geologica_Black.otf"),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    <Stack.Screen name="+not-found" options={{headerShown: false}}/>
                </Stack>
                <StatusBar style="dark" animated={true} backgroundColor="transparent"/>
            </PersistGate>
        </Provider>
    );
}
