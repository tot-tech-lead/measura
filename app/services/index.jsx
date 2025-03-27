import { ScrollView, StyleSheet, View } from 'react-native';

import Headline from '../../components/Headline';
import { Link, useRouter } from 'expo-router';
import RoundButton from '../../components/RoundButton';
import ViewWithDoubleBackground from '../../components/ViewWithDoubleBackground';
import Txt from '../../components/Text';
import { useSelector } from 'react-redux';
import ServiceCard from '../../components/ServiceCard';

export default function Services() {
  let router = useRouter();
  let services = useSelector(state => state.services.services);

  return (
    <ViewWithDoubleBackground>
      <View style={styles.container}>
        <Headline>Мої послуги</Headline>
        {services.length === 0 ? (
          <Txt style={styles.ifEmpty}>Тут поки порожньо</Txt>
        ) : (
          <ServiceCard list={services} />
        )}
      </View>
      <RoundButton
        iconSource={require('../../assets/images/AddIcon.png')}
        onPress={() => router.push('/services/create')}
      />
    </ViewWithDoubleBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 30,
    zIndex: 1,
  },

  ifEmpty: {
    color: '#333',
    fontStyle: 'normal',
    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'GeologicaMedium',
  },
});
