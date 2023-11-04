// Import necessary libraries
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  List,
  Card,
  Title,
  Modal,
  Portal,
  Text,
  useTheme,
  Button,
} from 'react-native-paper';
import fetchAboutJson from '../../methods/fetchAboutJson'; // Adjust the path to where fetchAboutJson.ts is located
import HomeHeader from '../components/HomeHeader';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation
import fetchAllUserNodes from '../../methods/fetchAllUserNodes'; // Import fetchAllUserNodes
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import deleteNode from '../../methods/deleteNode'; // Adjust the path to where deleteNode.ts is located

const HomeScreen = () => {
  const [userAreas, setUserAreas] = useState([]);
  const [services, setServices] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const theme = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    fetchAboutJson({setServices});
    fetchAllUserNodes('google-oauth2|114479912414647541183')
      .then(data => {
        setUserAreas(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchAboutJson({setServices});
    fetchAllUserNodes('google-oauth2|114479912414647541183')
      .then(data => {
        setUserAreas(data);
        setRefreshing(false);
      })
      .catch(error => {
        console.error(error);
        setRefreshing(false);
      });
  }, []);

  const handleDelete = async areaId => {
    try {
      const userId = 'google-oauth2|114479912414647541183'; // Replace with the actual user ID
      const result = await deleteNode(userId, areaId);
      console.log('Delete result:', result);
      // Optionally, refresh the list of areas after deletion:
      onRefresh();
    } catch (error) {
      console.error('Failed to delete area:', error);
    }
  };

  const showModal = service => {
    setSelectedService(service);
    setVisible(true);
  };

  const hideModal = () => {
    setSelectedService(null);
    setVisible(false);
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{flex: 1, padding: 16, backgroundColor: theme.colors.background}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Card style={{marginBottom: 16}}>
        <Card.Content>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}>
            <Title>Areas</Title>
            <Button
              icon="plus"
              compact
              onPress={() => navigation.navigate('CreateArea')}
              color={theme.colors.primary}>
              Add
            </Button>
          </View>
          {userAreas.length > 0 ? (
            userAreas.map((area, index) => (
              <List.Item
                key={area.area_id || index}
                title={area.area_name}
                description={`${area.action.serviceName} - ${JSON.stringify(
                  area.action.body,
                )} / ${JSON.stringify(area.reaction)}`}
                right={props => (
                  <Button
                    icon="delete"
                    onPress={() => handleDelete(area.area_id)}
                  />
                )}
              />
            ))
          ) : (
            <Text style={{color: theme.colors.onSurface}}>
              Press on the + to create an AREA!
            </Text>
          )}
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Title>Services</Title>
          {services.map((service, index) => (
            <TouchableOpacity key={index} onPress={() => showModal(service)}>
              <List.Item
                key={index}
                title={service.name}
                left={props => <List.Icon {...props} icon="star" />}
              />
            </TouchableOpacity>
          ))}
        </Card.Content>
      </Card>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            alignSelf: 'center',
            width: '80%',
            borderRadius: 10,
          }}>
          {selectedService && (
            <>
              <Title>{selectedService.name}</Title>
              {selectedService.actions &&
                selectedService.actions.map((action, actionIndex) => (
                  <List.Item
                    key={actionIndex}
                    title={action.name}
                    description={action.description}
                  />
                ))}
              {selectedService.reactions &&
                selectedService.reactions.map((reaction, reactionIndex) => (
                  <List.Item
                    key={reactionIndex}
                    title={reaction.name}
                    description={reaction.description}
                  />
                ))}
            </>
          )}
        </Modal>
      </Portal>
    </ScrollView>
  );
};

export default HomeScreen;
