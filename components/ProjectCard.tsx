import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Txt from './Text';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { deleteOne } from '../store/projects/projects';
import Headline from './Headline';
import { useState } from 'react';

type Props = {
  image?: ImageSourcePropType;
  name: string;
  address: string;
  area: number;
  ID: string;
};

function ProjectCard({ image, name, address, area, ID }: Props) {
  let router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteOne(id));
    setModalVisible(false);
    alert('Проект видалено!');
  };

  return (
    <View style={styles.card}>
      <Image
        source={image || require('../assets/images/card/default-cover.png')}
        style={styles.cover}
        resizeMode="cover"
      />
      <View style={styles.body}>
        <View style={styles.textContainer}>
          <Txt style={styles.headline} numberOfLines={1} ellipsizeMode="tail">
            {name}
          </Txt>
          <Txt style={styles.text} numberOfLines={2} ellipsizeMode="tail">
            Адреса: <Txt style={styles.textBold}>{address || '-'}</Txt>
          </Txt>
          <Txt style={styles.text}>
            Площа поверхні: <Txt style={styles.textBold}>{area} м²</Txt>
          </Txt>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => router.navigate(`/projects/${ID}/view`)}
            style={styles.actionItem}
          >
            <Image
              height={24}
              width={24}
              resizeMode="contain"
              style={styles.actionItemIcon}
              source={require('../assets/images/card/view.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.navigate(`/projects/${ID}/pricelist`)}
            style={styles.actionItem}
          >
            <Image
              height={24}
              width={24}
              resizeMode="contain"
              style={styles.actionItemIcon}
              source={require('../assets/images/card/bill.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.navigate(`/projects/${ID}/edit`)}
            style={styles.actionItem}
          >
            <Image
              height={24}
              width={24}
              resizeMode="contain"
              style={styles.actionItemIcon}
              source={require('../assets/images/card/edit.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.actionItem}
          >
            <Image
              height={24}
              width={24}
              resizeMode="contain"
              style={styles.actionItemIcon}
              source={require('../assets/images/card/delete.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Headline>Видалити ?</Headline>

            <Txt style={styles.modalText}>
              Ви впевнені що хочете видалити проект {name}? Цю дію не можна буде
              скасувати
            </Txt>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Txt style={styles.ButtonText}>Ні</Txt>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => handleDelete(ID)}
              >
                <Txt style={styles.ButtonText}>Так</Txt>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    flexShrink: 1,
    flexGrow: 0,
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 15,
    shadowOpacity: 0.25,
    elevation: 6,
  },
  cover: {
    width: '100%',
    height: 'auto',
    aspectRatio: 359 / 122,
    overflow: 'hidden',
  },
  body: {
    padding: 20,
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textContainer: {
    flexDirection: 'column',
    gap: 6,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  headline: {
    color: '#3F3F3F',
    fontSize: 18,
    fontWeight: '600',
  },
  text: {
    color: 'rgba(63, 63, 63, 0.5)',
    fontSize: 14,
    fontWeight: '300',
  },
  textBold: {
    fontWeight: '600',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  actionItem: {
    width: 35,
    height: 35,
    backgroundColor: '#333333',
    borderRadius: 17,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionItemIcon: {
    height: 24,
    width: 24,
    objectFit: 'contain',
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
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
});

export default ProjectCard;
