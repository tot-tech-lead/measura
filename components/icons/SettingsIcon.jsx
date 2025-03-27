import settingsActiveIcon from '../../assets/images/tabs/settings_active.png';
import settingsDisabledIcon from '../../assets/images/tabs/settings_disabled.png';
import { Image } from 'react-native';

export default function SettingsIcon({ active, size }) {
  return (
    <Image
      height={size}
      source={active ? settingsActiveIcon : settingsDisabledIcon}
      style={{ objectFit: 'contain', height: size, width: size }}
    />
  );
}
