import styled from 'styled-components/native';

export const Wrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

interface BoxProps {
  checked: boolean;
  checkedColor: string;
  uncheckedColor: string;
}

export const Box = styled.TouchableOpacity<BoxProps>`
  width: 25px;
  height: 25px;
  border-width: 2px;
  border-radius: 4px;
  border-color: ${({ checked, checkedColor, uncheckedColor }) =>
    checked ? '#595959' : uncheckedColor};
  background-color: ${({ checked, checkedColor, uncheckedColor }) =>
    checked ? checkedColor : 'transparent'};
  justify-content: center;
  align-items: center;
`;

export const Label = styled.Text`
  color: #595959;
  font-family: 'GeologicaRegular';
  font-size: 16px;
  margin-left: 8px;
`;
