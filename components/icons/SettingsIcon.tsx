import { Image } from 'react-native';

const settingsActiveIcon = require('../../assets/images/tabs/settings_active.png');
const settingsDisabledIcon = require('../../assets/images/tabs/settings_disabled.png');


export default function SettingsIcon({ active, size }) {
  return (
    <Image
      height={size}
      source={active ? settingsActiveIcon : settingsDisabledIcon}
      style={{ objectFit: 'contain', height: size, width: size }}
    />
  );
}
