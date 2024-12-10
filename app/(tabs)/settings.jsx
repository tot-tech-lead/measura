import Txt from "../../components/Text";
import ViewWithBackground from "../../components/ViewWithBackground";

const Settings = () => {
    return (
        <ViewWithBackground style={{padding: 18, paddingTop: 36, flex: 1, justifyContent: 'center' }}>
            <Txt style={{fontWeight: "500", fontSize: 32, textAlign: "center", color: "#595959"}}>
                Go to settings.jsx to edit this page
            </Txt>
        </ViewWithBackground>
    )
}

export default Settings;
