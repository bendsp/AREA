// Import necessary libraries
import React, {useEffect, useState, useContext} from 'react';
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
import { useNavigation} from '@react-navigation/native'; // Import useNavigation
import fetchAllUserNodes from '../../methods/fetchAllUserNodes'; // Import fetchAllUserNodes
import deleteNode from '../../methods/deleteNode'; // Adjust the path to where deleteNode.ts is located
import {UserContext} from '../context/userContext'; // Adjust the path to match your file structure
import { EllipsizeProp } from 'react-native-paper/lib/typescript/types';

const HomeScreen = () => {
  const [userAreas, setUserAreas] = useState([]);
  const [services, setServices] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const {sub} = useContext(UserContext); // Add this line
  const [areaVisible, setAreaVisible] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);

  const theme = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    fetchAboutJson({setServices});
    fetchAllUserNodes(sub)
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
    fetchAllUserNodes(sub)
      .then(data => {
        setUserAreas(data);
        setRefreshing(false);
      })
      .catch(error => {
        console.error(error);
        setRefreshing(false);
      });
  }, []);

  const handleDelete = async (areaId: string) => {
    try {
      const userId = sub; // Replace with the actual user ID
      const result = await deleteNode(userId, areaId);
      setAreaVisible(false);  // Close the modal
      console.log('Delete result:', result);
      // Optionally, refresh the list of areas after deletion:
      onRefresh();
    } catch (error) {
      console.error('Failed to delete area:', error);
    }
  };

  const showModal = (service: React.SetStateAction<null>) => {
    setSelectedService(service);
    setVisible(true);
  };

  const hideModal = () => {
    setSelectedService(null);
    setVisible(false);
  };

  const showAreaModal = (area: React.SetStateAction<null>) => {
    setSelectedArea(area);
    setAreaVisible(true);
  };

  const hideAreaModal = () => {
    setSelectedArea(null);
    setAreaVisible(false);
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
              <TouchableOpacity
                key={area.area_id || index}
                onPress={() => showAreaModal(area)}>
                <List.Item title={area.area_name} />
              </TouchableOpacity>
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
            backgroundColor: theme.colors.surface,
            padding: 20,
            alignSelf: 'center',
            width: '90%',
            maxWidth: '90%',
            borderRadius: 10,
          }}>
          {selectedService && (
            <>
              <Title numberOfLines={10} ellipsizeMode="tail">
                {selectedService.name}
              </Title>

              {/* Heading for Actions */}
              {selectedService.actions &&
                selectedService.actions.length > 0 && (
                  <Text style={{fontWeight: 'bold', marginTop: 10}}>
                    Actions
                  </Text>
                )}
              {selectedService.actions &&
                selectedService.actions.map((action: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | ((props: { selectable: boolean; ellipsizeMode: EllipsizeProp | undefined; color: string; fontSize: number; }) => React.ReactNode) | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | ((props: { selectable: boolean; ellipsizeMode: EllipsizeProp | undefined; color: string; fontSize: number; }) => React.ReactNode) | null | undefined; }, actionIndex: React.Key | null | undefined) => (
                  <List.Item
                    key={actionIndex}
                    title={action.name}
                    description={action.description}
                    titleNumberOfLines={10}
                    descriptionNumberOfLines={10}
                    ellipsizeMode="tail"
                  />
                ))}

              {/* Heading for Reactions */}
              {selectedService.reactions &&
                selectedService.reactions.length > 0 && (
                  <Text style={{fontWeight: 'bold', marginTop: 10}}>
                    Reactions
                  </Text>
                )}
              {selectedService.reactions &&
                selectedService.reactions.map((reaction: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | ((props: { selectable: boolean; ellipsizeMode: EllipsizeProp | undefined; color: string; fontSize: number; }) => React.ReactNode) | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | ((props: { selectable: boolean; ellipsizeMode: EllipsizeProp | undefined; color: string; fontSize: number; }) => React.ReactNode) | null | undefined; }, reactionIndex: React.Key | null | undefined) => (
                  <List.Item
                    key={reactionIndex}
                    title={reaction.name}
                    description={reaction.description}
                    titleNumberOfLines={10}
                    descriptionNumberOfLines={10}
                    ellipsizeMode="tail"
                  />
                ))}
            </>
          )}
        </Modal>
      </Portal>
      <Portal>
        <Modal
          visible={areaVisible}
          onDismiss={hideAreaModal}
          contentContainerStyle={{
            backgroundColor: theme.colors.surface,
            padding: 20,
            alignSelf: 'center',
            width: '90%',
            maxWidth: '90%',
            borderRadius: 10,
          }}>
          {selectedArea && (
            <>
              <Title numberOfLines={10} ellipsizeMode="tail">
                {selectedArea.area_name}
              </Title>
              <List.Item
                title={`${selectedArea.action.serviceName} - ${JSON.stringify(
                  selectedArea.action.body,
                )}`}
                description={JSON.stringify(selectedArea.reaction)}
                titleNumberOfLines={10}
                descriptionNumberOfLines={10}
                ellipsizeMode="tail"
              />
              <Button
                icon="delete"
                onPress={() => handleDelete(selectedArea.area_id)}>
                Delete
              </Button>
            </>
          )}
        </Modal>
      </Portal>
    </ScrollView>
  );
};

export default HomeScreen;
