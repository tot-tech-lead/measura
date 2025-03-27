import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import ViewWithBackground from '../../components/ViewWithBackground';
import RoundedInput from '../../components/RoundedInput';
import Headline from '../../components/Headline';
import ProjectCard from '../../components/ProjectCard';
import RoundButton from '../../components/RoundButton';
import { useSelector } from 'react-redux';

const Index = () => {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const Projects = useSelector(state => state.projects.projects);

  const filteredProjects = Projects.filter(project => {
    return project.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <ViewWithBackground style={styles.container}>
      <ScrollView
        style={styles.projects}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.headingContainer}>
          <Headline>Мої проєкти</Headline>
          <RoundedInput
            value={searchValue}
            setValue={setSearchValue}
            placeholder={'Пошук за адресою'}
            iconSource={require('../../assets/images/SearchIcon.png')}
            onIconPress={() => {
              alert(`Ви шукаєте проєкти за адресою: ${searchValue}`);
            }}
          />
        </View>
        <View style={styles.projectsContainer}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map(item => (
              <ProjectCard
                key={item.id}
                image={item.cover && { uri: item.cover }}
                name={item.name}
                address={item.address}
                area={item.area}
                ID={item.id}
              />
            ))
          ) : (
            <Headline>Проєктів за цією адресою не знайдено</Headline>
          )}
        </View>
      </ScrollView>
      <RoundButton
        onPress={() => router.push('/projects/create')}
        iconSource={require('../../assets/images/AddIcon.png')}
      />
    </ViewWithBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    gap: 25,
    overflow: 'visible',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 40,
  },
  projects: {
    overflow: 'visible',
    zIndex: 1,
    width: '100%',
  },
  headingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    flexDirection: 'column',
    zIndex: 2,
  },
  projectsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 25,
    marginTop: 25,
  },
});

export default Index;
