import { Image } from 'react-native';

const projectsActiveIcon = require('../../assets/images/tabs/projects_active.png');
const projectsDisabledIcon = require('../../assets/images/tabs/projects_disabled.png');

export default function ProjectsIcon({ active, size }) {
  return (
    <Image
      height={size}
      source={active ? projectsActiveIcon : projectsDisabledIcon}
      style={{ objectFit: 'contain', height: size, width: size }}
    />
  );
}
