import {Text} from "react-native";

const Txt = ({ style, ...props }) => {
    return (
        <Text
            {...props}
            style={[{ fontFamily: "Geologica", color: "#000" }, style]}
        />
    );
};

export default Txt;