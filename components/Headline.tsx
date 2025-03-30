import { StyleSheet } from 'react-native';

import Txt from '../components/Text';

export default function Headline({ children }) {
  return <Txt style={styles.text}>{children}</Txt>;
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '500',
    fontSize: 32,
    textAlign: 'center',
    color: '#595959',
  },
});
