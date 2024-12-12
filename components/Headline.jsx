import Txt from "../components/Text";

export default function Headline({children}) {
    return(
        <Txt children={children} style={{fontWeight: "500", fontSize: 32, textAlign: "center", color: "#595959"}}/>
    )
}