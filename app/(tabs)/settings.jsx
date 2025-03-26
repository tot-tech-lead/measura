import React from 'react';
import { StyleSheet, View } from 'react-native';
import Txt from '../../components/Text';
import ViewWithBackground from '../../components/ViewWithBackground';
import Headline from '../../components/Headline';
import { Link } from 'expo-router';

const Settings = () => {
  return (
    <ViewWithBackground style={styles.container}>
      <Headline>Налаштування</Headline>
      <View style={styles.linksContainer}>
        <Link href="/services" style={styles.linkText}>
          <Txt>Мої послуги</Txt>
        </Link>
        <Link href="/additionalServices" style={styles.linkText}>
          <Txt>Додаткові послуги</Txt>
        </Link>
        <Link
          href="/settings"
          style={styles.linkText}
          onPress={() => alert('У розробці')}
        >
          <Txt>Загальні налаштування</Txt>
        </Link>
      </View>
    </ViewWithBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    flex: 1,
    justifyContent: 'flex-start',
  },
  linksContainer: {
    paddingTop: 20,
    gap: 20,
  },
  linkText: {
    fontSize: 20,
    color: '#595959',
  },
});

export default Settings;
