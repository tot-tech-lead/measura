import React from 'react';
import {Text} from 'react-native';





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
]

export default function Txt({children, style={}, ...props}) {
    let font = fonts[style?.fontWeight ? Math.floor(Number(style.fontWeight) / 100) - 1 : 3];

    return (
        <Text {...{...props}} style={[
            {fontFamily: font}, style, {fontWeight: "auto"}
        ]}>
            {children}
        </Text>
    );
}

