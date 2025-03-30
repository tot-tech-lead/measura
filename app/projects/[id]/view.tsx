import { Href, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useRef } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';

import ViewWithDoubleBackground from '../../../components/ViewWithDoubleBackground';
import Headline from '../../../components/Headline';
import { useDispatch, useSelector } from 'react-redux';
import useCalculateProjectDetails from '../../../lib/calculations';
import Txt from '../../../components/Text';
import RoundButton from '../../../components/RoundButton';
import { deleteOne } from '../../../store/projects/projects';
import Checkbox from '../../../components/UI/Checkbox/Checkbox';
import {
  AdditionalServicesState,
  ProjectInfoState,
  ServicesState,
} from '../../../types';

const defaultImg = require('../../../assets/images/card/default-cover.png');


export default function ViewProject() {
  let { id } = useLocalSearchParams();

  const [isChecked, setIsChecked] = useState(false);

  let router = useRouter();
  const projectInfo = useSelector((state: { projects: ProjectInfoState }) =>
    state.projects.projects.find(project => project.id === id)
  );
  if (!projectInfo) {
    return (
      <View style={styles.deletedContainer}>
        <Txt style={styles.deletedText}>Проєкт видалено або не знайдено.</Txt>
      </View>
    );
  }

  const project = {
    area: projectInfo.area,
    gluePrice: projectInfo.gluePrice,
    glueWeight: projectInfo.glueWeight,
    services: [projectInfo.services],
    tarif: projectInfo.tarif,
    tileCostForMeterSq: projectInfo.tileCostForMeterSq,
    tileHeight: projectInfo.tileHeight,
    tileWidth: projectInfo.tileWidth,
  };

  const calculated = useCalculateProjectDetails(project);

  const AdditionalServices = useSelector(
    (state: { additionalServices: AdditionalServicesState }) =>
      state.additionalServices.additionalServices
  );

  const filteredAdditionalServices = AdditionalServices.filter(obj =>
    projectInfo.services.includes(obj.id)
  );

  const service = useSelector((state: { services: ServicesState }) =>
    state.services.services.find(service => service.id === projectInfo.tarif)
  );

  const [isExpanded, setIsExpanded] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;

  const toggleButtons = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(animationValue, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const button1TranslateY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  });
  const button2TranslateY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -120],
  });
  const button3TranslateY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -180],
  });

  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = id => {
    setModalVisible(false);
    router.replace(`/projects` as Href);
    setTimeout(() => {
      dispatch(deleteOne(id));
      alert('Проект видалено!');
    }, 400);
  };

  return (
    <ViewWithDoubleBackground>
      <Image
        source={projectInfo?.cover ? { uri: projectInfo.cover } : defaultImg}
        style={styles.image}
      />
      <ScrollView style={styles.container}>
        <Headline>{projectInfo.name}</Headline>

        <View style={styles.infoContainer}>
          <Txt style={styles.totalPrice}>
            Загальна вартість:{' '}
            {isChecked ? (
              <Txt style={styles.totalPriceBold}>
                {calculated.totalPriceWithPercentage.toFixed(2)} ₴
              </Txt>
            ) : (
              <Txt style={styles.totalPriceBold}>
                {calculated.totalPrice.toFixed(2)} ₴
              </Txt>
            )}
          </Txt>

          <Txt style={styles.text}>
            Опис:{' '}
            <Txt style={styles.textBold}>
              {projectInfo.description || 'Немає опису'}
            </Txt>
          </Txt>

          <Txt style={styles.subHead}>Розрахунки</Txt>

          <View style={styles.calculationsContainer}>
            <Txt style={styles.text}>
              Площа плитки:{' '}
              <Txt style={styles.textBold}>
                {calculated.tileArea.toFixed(4)} м²
              </Txt>
            </Txt>

            <Txt style={styles.text}>
              Площа поверхні:
              <Txt style={styles.textBold}>{calculated.area.toFixed(2)} м²</Txt>
            </Txt>

            <Txt style={styles.text}>
              Кількість мішків клею:{' '}
              {isChecked ? (
                <Txt style={styles.textBold}>
                  {calculated.countOfGlueBagsWithPercentage.toFixed(0)} шт.
                </Txt>
              ) : (
                <Txt style={styles.textBold}>
                  {calculated.countOfGlueBags.toFixed(0)} шт.
                </Txt>
              )}
            </Txt>

            <Txt style={styles.text}>
              Загальна вартість покриття:{' '}
              {isChecked ? (
                <Txt style={styles.textBold}>
                  {calculated.totalTilePriceWithPercentage.toFixed(2)} ₴
                </Txt>
              ) : (
                <Txt style={styles.textBold}>
                  {calculated.totalTilePrice.toFixed(2)} ₴
                </Txt>
              )}
            </Txt>

            <Txt style={styles.text}>
              Загальна вартість клею:{' '}
              {isChecked ? (
                <Txt style={styles.textBold}>
                  {calculated.glueTotalPriceWithPercentage.toFixed(2)} ₴
                </Txt>
              ) : (
                <Txt style={styles.textBold}>
                  {calculated.glueTotalPrice.toFixed(2)} ₴
                </Txt>
              )}
            </Txt>

            <Txt style={styles.text}>
              Вартість послуг:{' '}
              <Txt style={styles.textBold}>
                {calculated.workPrice.toFixed(2)} ₴
              </Txt>
            </Txt>

            <Txt style={styles.text}>
              Вартість додаткових послуг:{' '}
              <Txt style={styles.textBold}>
                {calculated.additionalPrice === 0 ? (
                  <Txt style={styles.textBold}>-</Txt>
                ) : (
                  <Txt style={styles.textBold}>
                    {calculated.additionalPrice.toFixed(2)} ₴
                  </Txt>
                )}
              </Txt>
            </Txt>

            <Txt style={styles.text}>
              Загальна вартість роботи:{' '}
              <Txt style={styles.textBold}>{calculated.totalWorkPrice} ₴</Txt>
            </Txt>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Checkbox
                label="з врах. відсотку"
                value={isChecked}
                onChange={setIsChecked}
              />
            </View>
          </View>

          <Txt style={styles.subHead}>Вибрані послуги</Txt>

          <View style={styles.servicesContainer}>
            <Txt style={styles.serviceHeadline}>Послуги:</Txt>

            <View style={styles.serviceContainer}>
              <Txt style={styles.textBold}>• {service.conditions}</Txt>
            </View>

            <Txt style={styles.serviceHeadline}>Додаткові послуги:</Txt>

            <View style={styles.serviceContainer}>
              {filteredAdditionalServices.length === 0 ? (
                <Txt
                  style={{
                    color: '#000000',
                    fontSize: 16,
                    fontWeight: 500,
                    textAlign: 'center',
                    marginRight: 20,
                  }}
                >
                  Додаткових послуг не вибрано
                </Txt>
              ) : (
                filteredAdditionalServices.map(item => (
                  <Txt key={item.id} style={styles.textBold}>
                    • {item.name}
                  </Txt>
                ))
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <RoundButton
          iconSource={require('../../../assets/images/MoreIcon.png')}
          onPress={toggleButtons}
        />

        {/* Додаткові кнопки */}
        <Animated.View
          style={[
            styles.button,
            { transform: [{ translateY: button1TranslateY }] },
          ]}
        >
          <RoundButton
            iconSource={require('../../../assets/images/card/bill.png')}
            onPress={() =>
              router.navigate(`/projects/${projectInfo.id}/pricelist`  as Href)
            }
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.button,
            { transform: [{ translateY: button2TranslateY }] },
          ]}
        >
          <RoundButton
            iconSource={require('../../../assets/images/card/delete.png')}
            onPress={() => setModalVisible(true)}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.button,
            { transform: [{ translateY: button3TranslateY }] },
          ]}
        >
          <RoundButton
            iconSource={require('../../../assets/images/card/edit.png')}
            onPress={() => router.navigate(`/projects/${projectInfo.id}/edit` as Href)}
          />
        </Animated.View>
      </View>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Headline>Видалити ?</Headline>

            <Txt style={styles.modalText}>
              Ви впевнені що хочете видалити проект {projectInfo.name}? Цю дію
              не можна буде скасувати
            </Txt>

            <View style={styles.buttonsModalContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Txt style={styles.ButtonText}>Ні</Txt>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => handleDelete(projectInfo.id)}
              >
                <Txt style={styles.ButtonText}>Так</Txt>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ViewWithDoubleBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 35,
    gap: 25,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },

  subHead: {
    color: '#333',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 500,
    fontFamily: 'GeologicaMedium',
  },
  textBold: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'GeologicaMedium',
    fontStyle: 'normal',
  },

  text: {
    color: '#595959',
    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'GeologicaMedium',
    fontStyle: 'normal',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: 10,
    textAlign: 'center',
  },

  totalPrice: {
    color: '#595959',
    fontSize: 20,
    fontWeight: 500,
    fontFamily: 'GeologicaMedium',
    fontStyle: 'normal',
  },

  totalPriceBold: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 500,
    fontFamily: 'GeologicaMedium',
    fontStyle: 'normal',
  },
  calculationsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  serviceHeadline: {
    color: '#595959',
    fontSize: 18,
    fontWeight: 500,
    fontFamily: 'GeologicaMedium',
    fontStyle: 'normal',
  },
  serviceContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginLeft: 20,
  },

  servicesContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 70,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 23,
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    width: (Dimensions.get('window').width - 101) / 2,
    marginTop: 20,
    backgroundColor: '#333333',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
  },
  modalText: {
    fontWeight: 300,
    fontSize: 14,
    textAlign: 'center',
    color: '#333333',
    opacity: 0.4,
  },
  ButtonText: {
    fontSize: 18,
    fontWeight: 300,
    color: '#fff',
    textAlign: 'center',
  },
  buttonsModalContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  deletedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  deletedText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },

  checkBox: {},
});
