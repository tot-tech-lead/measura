import React from "react";
import {Dimensions, Image, StyleSheet, View} from "react-native";

import blobImage from "../assets/images/blob.png"

function ViewWithDoubleBackground({children, ...props}) {
    return (
        <View {...props} style={[styles.container, props.style]}>
            <Image source={blobImage}
                   width={Dimensions.get("window").width * 2}
                   height={Math.round(Dimensions.get("window").width * 0.671) * 2}
                   resizeMode="cover"
                   style={styles.background}
            />
            <Image source={blobImage}
                   width={Dimensions.get("window").width * 2}
                   height={Math.round(Dimensions.get("window").width * 0.671) * 2}
                   resizeMode="cover"
                   style={styles.backgroundBottom}
            />
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#ffffff",
    },
    background: {
        position: "absolute",
        top: -(Dimensions.get("window").width * 0.214) * 2,
        left: "-50%",
        width: Dimensions.get("window").width * 2,
        height: Math.round(Dimensions.get("window").width * 0.671) * 2,
        zIndex: 0
    },
    backgroundBottom: {
        position: "absolute",
        bottom: -(Dimensions.get("window").width * 0.294) * 2,
        left: "-100%",
        width: Dimensions.get("window").width * 2,
        height: Math.round(Dimensions.get("window").width * 0.671) * 2,
        transform: "rotate(180deg)",
        zIndex: 0
    },
});

export default ViewWithDoubleBackground;
