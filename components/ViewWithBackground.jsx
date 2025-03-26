import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import blobImage from '../assets/images/blob.png';

function ViewWithBackground({ children, ...props }) {
  return (
    <View {...props} style={[styles.container, props.style]}>
      <Image
        source={blobImage}
        width={Dimensions.get('window').width * 2}
        height={Math.round(Dimensions.get('window').width * 0.671) * 2}
        resizeMode="cover"
        style={styles.background}
      />

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  background: {
    position: 'absolute',
    top: -(Dimensions.get('window').width * 0.214) * 2,
    left: '-50%',
    width: Dimensions.get('window').width * 2,
    height: Math.round(Dimensions.get('window').width * 0.671) * 2,
  },
});

export default ViewWithBackground;
