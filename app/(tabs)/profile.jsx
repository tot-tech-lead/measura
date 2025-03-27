import Txt from '../../components/Text';
import ViewWithBackground from '../../components/ViewWithBackground';

const Profile = () => {
  return (
    <ViewWithBackground
      style={{ padding: 18, paddingTop: 36, flex: 1, justifyContent: 'center' }}
    >
      <Txt
        style={{
          fontWeight: '500',
          fontSize: 32,
          textAlign: 'center',
          color: '#595959',
        }}
      >
        Функціонал у розробці ⚙️
      </Txt>
      <Txt
        style={{
          fontWeight: '400',
          fontSize: 16,
          textAlign: 'center',
          color: '#595959',
        }}
      >
        Навідайтесь після оновлення
      </Txt>
    </ViewWithBackground>
  );
};

export default Profile;
