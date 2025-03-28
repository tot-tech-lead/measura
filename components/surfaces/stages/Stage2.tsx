import { StyleSheet, View } from 'react-native';

import Headline from '@components/Headline';
import UnderlinedInput from '@components/UnderlinedInput';
import { useState } from 'react';

export default function Stage2({ data, setProperty }) {
  const [tileWidth, setTileWidth] = useState<string>('');
  const [tileLength, setTileLength] = useState<string>('');
  const [tilePrice, setTilePrice] = useState<string>('');
  const [glueWeight, setGlueWeight] = useState<string>('');
  const [gluePrice, setGluePrice] = useState<string>('');

  return (
    <View style={styles.container}>
      <Headline>Матеріали</Headline>
      <UnderlinedInput
        value={tileWidth}
        setValue={v => setTileWidth(v)}
        label={'Ширина плитки (мм.)'}
        inputType="numeric"
      />
      <UnderlinedInput
        value={tileLength}
        setValue={v => setTileLength(v)}
        label={'Довжина плитки (мм.)'}
        inputType="numeric"
      />
      <UnderlinedInput
        value={tilePrice}
        setValue={v => setTilePrice(v)}
        label={'Вартість за 1 м² (матеріалу)'}
        inputType="numeric"
      />
      <UnderlinedInput
        value={gluePrice}
        setValue={v => setGluePrice(v)}
        label={'Вартість мішка клею'}
        inputType="numeric"
      />
      <UnderlinedInput
        value={glueWeight}
        setValue={v => setGlueWeight(v)}
        label={'Маса мішка (кг)'}
        inputType="numeric"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 25,
    paddingHorizontal: 20,
    paddingTop:50
  },
});
