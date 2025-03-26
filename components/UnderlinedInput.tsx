import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TextInput, View } from 'react-native';
import Txt from './Text';

type Props = {
  value: string;
  setValue: (value: string) => void;
  label: string;
  inputType: 'default' | 'numeric' | 'decimal-pad';
};

export default function UnderlinedInput({
  value,
  setValue,
  label,
  inputType,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const borderColorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(borderColorAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 60,
      useNativeDriver: false,
    }).start();
  }, [isFocused, borderColorAnim]);

  const borderBottomColor = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ccc', '#000'],
  });

  return (
    <View style={styles.container}>
      <Txt
        style={{
          fontSize: 12,
          fontFamily: 'GeologicaRegular',
          fontWeight: '400',
          marginBottom: 4,
          marginLeft: 5,
        }}
      >
        {label}
      </Txt>
      <Animated.View style={{ borderBottomColor, borderBottomWidth: 1 }}>
        <TextInput
          style={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder=""
          placeholderTextColor="#ccc"
          value={value}
          onChangeText={setValue}
          keyboardType={inputType}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    fontSize: 15,
    paddingVertical: 5,
    color: '#000',
    zIndex: 1,
  },
});
