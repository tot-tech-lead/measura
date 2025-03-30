import React from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';

const RoundButton = ({
  onPress,
  iconSource,
  size = 24,
  backgroundColor = '#333333',
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <Image
        source={iconSource}
        style={{ width: size, height: size, resizeMode: 'contain' }}
        width={20}
        height={20}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    zIndex: 10000,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    // Тіні на iOS
    shadowColor: '#333333',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    // Тіні на Андраєд
    elevation: 3,
  },
});

export default RoundButton;
