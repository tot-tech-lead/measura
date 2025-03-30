import React from 'react';
import { Text } from 'react-native';

const fonts = [
  'GeologicaThin',
  'GeologicaExtraLight',
  'GeologicaLight',
  'GeologicaRegular',
  'GeologicaMedium',
  'GeologicaSemiBold',
  'GeologicaBold',
  'GeologicaExtraBold',
  'GeologicaBlack',
];

import { TextStyle } from 'react-native';

export default function Txt({
  children,
  style = {} as TextStyle,
  ...props
}: {
  children: React.ReactNode;
  style?: TextStyle;
  [key: string]: any;
}) {
  let font =
    fonts[
      style?.fontWeight ? Math.floor(Number(style.fontWeight) / 100) - 1 : 3
    ];

  return (
    <Text
      {...{ ...props }}
      style={[{ fontFamily: font }, style]}
    >
      {children}
    </Text>
  );
}
