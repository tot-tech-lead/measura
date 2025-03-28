import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useState, type ReactElement } from 'react';
import Svg, { Rect, Line, Marker, Path, Defs } from 'react-native-svg';

import DarkButton from '@components/DarkButton';
import Headline from '@components/Headline';
import UnderlinedInput from '@components/UnderlinedInput';
import Txt from '@components/Text';

import {
  ShapeTypes,
  SHAPE_OPTIONS,
  SurfaceTypes,
  SURFACE_OPTIONS,
} from '@surfacesConstants/constants';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const maxWidth = screenWidth * 0.8;
const maxLength = screenHeight * 0.2;

const Stage1 = (): ReactElement => {
  const strokeWidth = 1;
  const dashArray: number[] = [10, 5];

  const [selectedShape, setSelectedShape] = useState<ShapeTypes>(ShapeTypes.RECTANGLE);
  const [selectedSurface, setSelectedSurface] = useState<SurfaceTypes>(SurfaceTypes.FLOOR);
  const [name, setName] = useState<string>('');
  const [settedWidth, setWidth] = useState<string>('');
  const [settedLength, setLength] = useState<string>('');

  const widthMeters = parseFloat(settedWidth) || 2;
  const lengthMeters = parseFloat(settedLength) || 1;

  let scaleFactor = maxWidth / widthMeters;
  let scaledWidth = widthMeters * scaleFactor;
  let scaledLength = lengthMeters * scaleFactor;

  if (scaledLength > maxLength) {
    scaleFactor = maxLength / lengthMeters;
    scaledWidth = widthMeters * scaleFactor;
    scaledLength = lengthMeters * scaleFactor;
  }


  return (
    <View style={styles.container}>
      <View style={styles.rectContainer}>
        <Svg width={scaledWidth + 20} height={scaledLength + 20}>
          <Defs>
            <Marker
              id="arrow"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <Path
                d="M0,0 L6,3 L0,6"
                fill="none"
                stroke="black"
                strokeWidth={strokeWidth}
              />
            </Marker>
          </Defs>

          <Rect
            x="10"
            y="10"
            width={scaledWidth}
            height={scaledLength}
            rx="10"
            ry="10"
            fill="rgba(235, 227, 213, 0.9)"
          />

          <Line
            x1="20"
            y1="20"
            x2={scaledWidth - 5}
            y2="20"
            stroke="black"
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            markerEnd="url(#arrow)"
          />
          <Line
            x1="20"
            y1="25"
            x2="20"
            y2={scaledLength - 5}
            stroke="black"
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            markerEnd="url(#arrow)"
          />
        </Svg>
      </View>

      <View style={styles.chooseFigureBtnContainer}>
        {SHAPE_OPTIONS.map(({ label, value }) => (
          <DarkButton
            key={value}
            onPress={() => setSelectedShape(value)}
            style={{
            paddingVertical: 5,
            paddingHorizontal: 5,
            width: screenWidth * 0.27,
            backgroundColor: selectedShape === value ? '#333333' : '#ccc',
          }}
          >
            {label}
          </DarkButton>
        ))}

      </View>

      <View style={styles.formContainer}>
        <Headline>Нова поверхня</Headline>

        {selectedShape === 'RECTANGLE' ? (
          <>
            <UnderlinedInput
              value={name}
              setValue={v => setName(v)}
              label="Назва"
              inputType="default"
            />
            <UnderlinedInput
              value={settedWidth}
              setValue={v => setWidth(v)}
              label="Ширина(м)"
              inputType="numeric"
            />
            <UnderlinedInput
              value={settedLength}
              setValue={v => setLength(v)}
              label="Довжина(м)"
              inputType="numeric"
            />

            <View style={styles.chooseSurfaceBtnContainer}>
              {SURFACE_OPTIONS.map(({ label, value }) => (
                <DarkButton
                  key={value}
                  onPress={() => setSelectedSurface(value)}
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    width: screenWidth * 0.4,
                    backgroundColor: selectedSurface === value ? '#333333' : '#ccc',
                  }}
                >
                  {label}
                </DarkButton>
              ))}

            </View>
          </>
        ) : (
          <Txt style={styles.placeholderText}>Функціонал у розробці ⚙️</Txt>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  rectContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  chooseFigureBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  formContainer: {
    width: '100%',
    flexGrow: 1,
    flexDirection: 'column',
    gap: 20,
    paddingHorizontal: 20,
  },
  chooseSurfaceBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  placeholderText: {
    fontWeight: '500',
    fontSize: 28,
    textAlign: 'center',
    color: '#595959',
  },
});

export default Stage1;
