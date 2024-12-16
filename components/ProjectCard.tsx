import {Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View} from 'react-native';
import Txt from "./Text";
import {useRouter} from "expo-router";

type Props = {
    image?: ImageSourcePropType;
    name: string;
    address: string;
    price: number;
    ID: string;
}

function ProjectCard({image, name, address, price, ID}: Props) {
    let router = useRouter();


    return (
        <View style={styles.card}>
            <Image source={image || require("../assets/images/card/default-cover.png")}
                   style={styles.cover}
                   resizeMode="cover"
            />
            <View style={styles.body}>
                <View style={styles.textContainer}>
                    <Txt style={styles.headline}
                         numberOfLines={1}
                         ellipsizeMode="tail"
                    >
                        {name}
                    </Txt>
                    <Txt style={styles.text}
                         numberOfLines={2}
                         ellipsizeMode="tail"
                    >
                        {address}
                    </Txt>
                    <Txt style={styles.text}>
                        Cost: <Txt style={styles.textBold}>{price}₴</Txt>
                    </Txt>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity onPress={() => router.navigate(`/projects/${ID}/view`)} style={styles.actionItem}>
                        <Image height={24}
                               width={24}
                               resizeMode="contain"
                               style={styles.actionItemIcon}
                               source={require("../assets/images/card/view.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.navigate(`/projects/${ID}/pricelist`)} style={styles.actionItem}>
                        <Image height={24}
                               width={24}
                               resizeMode="contain"
                               style={styles.actionItemIcon}
                               source={require("../assets/images/card/bill.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.navigate(`/projects/${ID}/edit`)} style={styles.actionItem}>
                        <Image height={24}
                               width={24}
                               resizeMode="contain"
                               style={styles.actionItemIcon}
                               source={require("../assets/images/card/edit.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert("In development")} style={styles.actionItem}>
                        <Image height={24}
                               width={24}
                               resizeMode="contain"
                               style={styles.actionItemIcon}
                               source={require("../assets/images/card/delete.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        flexShrink: 1,
        flexGrow: 0,
        overflow: "hidden",
        borderRadius: 12,
        backgroundColor: "#ffffff",
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowRadius: 15,
        shadowOpacity: 0.25,
        elevation: 6,
    },
    cover: {
        width: "100%",
        height: "auto",
        aspectRatio: 359 / 122,
        overflow: "hidden"
    },
    body: {
        padding: 20,
        flexDirection: "column",
        gap: 10,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    textContainer: {
        flexDirection: "column",
        gap: 6,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    headline: {
        color: "#3F3F3F",
        fontSize: 18,
        fontWeight: "600",
    },
    text: {
        color: "rgba(63, 63, 63, 0.5)",
        fontSize: 14,
        fontWeight: "300",
    },
    textBold: {
        fontWeight: "600"
    },
    actions: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    actionItem: {
        width: 35,
        height: 35,
        backgroundColor: "#333333",
        borderRadius: 17,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    actionItemIcon: {
        height: 24,
        width: 24,
        objectFit: "contain",
    },
})

export default ProjectCard;