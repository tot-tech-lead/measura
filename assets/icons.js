import ProjectsIcon from "../components/icons/ProjectsIcon";
import SettingsIcon from "../components/icons/SettingsIcon";
import ProfileIcon from "../components/icons/ProfileIcon";

export const icons = {
    index: (props)=> <ProjectsIcon size={props.size} active={props.isFocused} />,
    settings: (props)=> <SettingsIcon size={props.size} active={props.isFocused} />,
    profile: (props)=> <ProfileIcon size={props.size} active={props.isFocused} />,
}