import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ViewWithDoubleBackground from '../../../components/ViewWithDoubleBackground';
import Headline from '../../../components/Headline';
import DarkButton from '../../../components/DarkButton';
import Txt from '../../../components/Text';
import { router } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import ViewShot from 'react-native-view-shot';
import * as Print from 'expo-print';
import useCalculateProjectDetails from '../../../lib/calculations';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

export default function ViewProject() {
  const { id } = useLocalSearchParams();

  const projectInfo = useSelector(state =>
    state.projects.projects.find(project => project.id === id)
  );
  const projectData = {
    area: projectInfo.area,
    gluePrice: projectInfo.gluePrice,
    glueWeight: projectInfo.glueWeight,
    services: [projectInfo.services],
    tarif: projectInfo.tarif,
    tileCostForMeterSq: projectInfo.tileCostForMeterSq,
    tileHeight: projectInfo.tileHeight,
    tileWidth: projectInfo.tileWidth,
  };

  const calculations = useCalculateProjectDetails(projectData);

  const viewShotRef = useRef();
  const saveAsPNG = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const fileUri = `${FileSystem.documentDirectory}estimate.png`;

      await FileSystem.copyAsync({
        from: uri,
        to: fileUri,
      });

      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error('Помилка збереження PNG:', error);
    }
  };

  const saveAsPDF = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const htmlContent = `
                <html>
                    <body style="display: flex; justify-content: center; align-items: center;">
                        <img src="${uri}" style="width: 100%; height: auto;" />
                    </body>
                </html>
            `;
      const { uri: pdfUri } = await Print.printToFileAsync({
        html: htmlContent,
      });
      await Sharing.shareAsync(pdfUri);
    } catch (error) {
      console.error('Помилка збереження PDF:', error);
    }
  };

  return (
    <ViewWithDoubleBackground style={styles.container}>
      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
        <Headline>Проєкт {projectInfo.name}</Headline>
        <View style={styles.budgetContainer}>
          <Txt style={styles.budgetHeadline}>Кошторис</Txt>
          <View style={styles.lineItem}>
            <Txt style={styles.leftText}>Вартість роботи</Txt>
            <Txt style={styles.rightText}>
              {calculations.totalWorkPrice.toLocaleString('uk-UA', {
                minimumFractionDigits: 2,
              })}
              ₴
            </Txt>
          </View>
          <View style={styles.lineItem}>
            <Txt style={styles.leftText}>Вартість клею</Txt>
            <Txt style={styles.rightText}>
              {calculations.glueTotalPrice.toLocaleString('uk-UA', {
                minimumFractionDigits: 2,
              })}
              ₴
            </Txt>
          </View>
          <View style={styles.lineItem}>
            <Txt style={styles.leftText}>Вартість плитки</Txt>
            <Txt style={styles.rightText}>
              {calculations.totalTilePrice.toLocaleString('uk-UA', {
                minimumFractionDigits: 2,
              })}
              ₴
            </Txt>
          </View>
          <View style={styles.total}>
            <Txt style={styles.totalText}>Загальна вартість</Txt>
            <Txt style={styles.totalAmount}>
              {calculations.totalPrice.toLocaleString('uk-UA', {
                minimumFractionDigits: 2,
              })}
              ₴
            </Txt>
          </View>
        </View>
      </ViewShot>
      <View style={styles.buttonContainer}>
        <DarkButton
          onPress={saveAsPDF}
          style={styles.button}
          iconSource={require('../../../assets/images/pdfIcon.png')}
          iconPlacement="before"
        >
          Зберегти PDF
        </DarkButton>
        <DarkButton
          onPress={saveAsPNG}
          style={styles.button}
          iconSource={require('../../../assets/images/jpgIcon.png')}
          iconPlacement="before"
        >
          Зберегти JPG
        </DarkButton>
        <DarkButton
          onPress={() => router.push('/')}
          style={styles.button}
          iconSource={require('../../../assets/images/homeIcon.png')}
          iconPlacement="before"
        >
          Назад
        </DarkButton>
      </View>
    </ViewWithDoubleBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  budgetHeadline: {
    fontSize: 24,
    color: '#595959',
    textAlign: 'center',
    marginBottom: 10,
  },
  budgetContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    gap: 15,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftText: {
    fontSize: 16,
    color: '#595959',
  },
  rightText: {
    fontSize: 16,
    color: '#595959',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    gap: 10,
  },
  totalText: {
    fontSize: 20,
    color: '#595959',
  },
  totalAmount: {
    fontSize: 22,
    color: '#595959',
  },
  buttonContainer: {
    gap: 15,
    marginTop: 'auto',
  },
  button: {
    justifyContent: 'center',
    borderRadius: 8,
    width: '100%',
  },
});
