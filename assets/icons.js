import ProjectsIcon from "../components/ProjectsIcon";
import SettingsIcon from "../components/SettingsIcon";
import ProfileIcon from "../components/ProfileIcon";

export const icons = {
    index: (props)=> <ProjectsIcon size={props.size} active={props.color === "#ffffff"} />,
    settings: (props)=> <SettingsIcon size={props.size} active={props.color === "#ffffff"} />,
    profile: (props)=> <ProfileIcon size={props.size} active={props.color === "#ffffff"} />,
}