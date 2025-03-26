import projectsActiveIcon from '../../assets/images/tabs/projects_active.png';
import projectsDisabledIcon from '../../assets/images/tabs/projects_disabled.png';
import { Image } from 'react-native';

export default function ProjectsIcon({ active, size }) {
  return (
    <Image
      height={size}
      source={active ? projectsActiveIcon : projectsDisabledIcon}
      style={{ objectFit: 'contain', height: size, width: size }}
    />
  );
}
