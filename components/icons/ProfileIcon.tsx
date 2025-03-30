const profileActiveIcon = require('../../assets/images/tabs/profile_active.png');
const profileDisabledIcon = require('../../assets/images/tabs/profile_disabled.png');
import { Image } from 'react-native';

export default function ProfileIcon({ active, size }) {
  return (
    <Image
      height={size}
      source={active ? profileActiveIcon : profileDisabledIcon}
      style={{ objectFit: 'contain', height: size, width: size }}
    />
  );
}
