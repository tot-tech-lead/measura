import React from 'react';
import { StyleSheet, TextInput, View, Image, TouchableOpacity } from 'react-native';

export default function RoundedInput({
                                         value,
                                         setValue,
                                         placeholder,
                                         onIconPress,
                                         iconSource,
                                     }) {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={setValue}
                style={styles.input}
            />

            <TouchableOpacity onPress={() => onIconPress(value)} style={styles.iconContainer}>
                <Image source={iconSource} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 28,
        paddingVertical: 10,
        paddingLeft: 25,
    },
    input: {
        flex: 1,
        fontFamily: "GeologicaRegular",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "400",
        color: '#49454F',
    },
    iconContainer: {
        marginRight: 10,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
    },
});
