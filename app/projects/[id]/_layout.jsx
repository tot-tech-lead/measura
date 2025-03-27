import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
    return (
        <>
            <Stack>
                <Stack.Screen name="edit" options={{ headerShown: false }} />
                <Stack.Screen name="view" options={{ headerShown: false }} />
                <Stack.Screen name="pricelist" options={{ headerShown: false }} />
                <Stack.Screen name="surfaces" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="dark" animated={true} backgroundColor="transparent" />
        </>
    );
}
