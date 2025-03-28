import Txt from '../../components/Text';
import ViewWithBackground from '../../components/ViewWithBackground';
import Create from "../projects/[id]/surfaces/create"

const Profile = () => {
  return (
    <ViewWithBackground
      style={{ padding: 18, paddingTop: 36, flex: 1, justifyContent: 'center' }}
    >
      <Create></Create>
    </ViewWithBackground>
  );
};

export default Profile;
