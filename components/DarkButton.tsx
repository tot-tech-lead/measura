import {Image, ImageSourcePropType, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React from "react";
import Txt from "./Text";

type Props = {
    children: React.ReactNode;
    onPress: () => void;
    iconSource?: ImageSourcePropType;
    iconPlacement?: "before" | "after";
    style?: ViewStyle;
}

export default function DarkButton({children, onPress, iconSource, iconPlacement = "before", style}: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            {(iconSource && iconPlacement === "before") &&
                <Image height={23} width={23}
                       resizeMode="contain"
                       style={[styles.icon, styles.beforeIcon]}
                       source={iconSource}
                />
            }
            <Txt style={styles.btnText}>{children}</Txt>
            {(iconSource && iconPlacement === "after") &&
                <Image height={23} width={23}
                       resizeMode="contain"
                       style={[styles.icon, styles.afterIcon]}
                       source={iconSource}
                />
            }
        </TouchableOpacity>
    )
}

let styles = StyleSheet.create({
    button: {
        width: "auto",
        paddingHorizontal: 50,
        paddingVertical: 15,
        backgroundColor: "#333333",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderRadius: 5
    },
    btnText: {
        color: "#ffffff",
        textAlign: 'center'
    },
    icon: {
        position: "absolute",
        top: "60%",
        height: 23,
        width: 23
    },
    afterIcon: {
        right: 15
    },
    beforeIcon: {
        left: 15
    },
})