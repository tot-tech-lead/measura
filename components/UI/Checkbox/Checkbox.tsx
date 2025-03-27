import React from 'react';
import { Box, Label, Wrapper } from './Styles';
import { Image } from 'react-native';

type Props = {
  label: string;
  value?: boolean;
  onChange?: (newValue: boolean) => void;
  checkedColor?: string;
  uncheckedColor?: string;
};

const CheckBox: React.FC<Props> = ({
  label,
  value = false,
  onChange,
  checkedColor = '#807568',
  uncheckedColor = '#595959',
}) => {
  const handleChange = () => {
    if (onChange) {
      onChange(!value);
    }
  };
  return (
    <Wrapper>
      <Box
        checked={value}
        checkedColor={checkedColor}
        uncheckedColor={uncheckedColor}
        onPress={handleChange}
      >
        {value ? (
          <Image
            style={{ height: 9, width: 12 }}
            resizeMode="contain"
            source={require('../../../assets/images/icons/tick.png')}
          />
        ) : null}
      </Box>
      <Label>{label}</Label>
    </Wrapper>
  );
};

export default CheckBox;
