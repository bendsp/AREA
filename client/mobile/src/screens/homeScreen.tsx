// Import necessary libraries
import React, {useEffect, useState} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
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

// Define the HomeScreen component
const HomeScreen = () => {
  // Define state hooks
  const [userAreas, setUserAreas] = useState([]); // State hook for user areas
  const [services, setServices] = useState([]); // State hook for services
  const [visible, setVisible] = useState(false); // State hook for modal visibility
  const [selectedService, setSelectedService] = useState(null); // State hook for selected service

  // Get the current theme and navigation prop
  const theme = useTheme();
  const navigation = useNavigation();

  // Define useEffect hook to fetch data
  useEffect(() => {
    // Fetch service data
    fetchAboutJson({setServices});

    // Fetch user areas
    // Assume subId is available, replace 'your-sub-id' with actual subId or get it dynamically
    fetchAllUserNodes('google-oauth2|114479912414647541183')
      .then(data => {
        setUserAreas(data);
        console.log(data);
      })
      .catch(error => console.error(error));
  }, []);

  // Define function to show the modal
  const showModal = service => {
    setSelectedService(service);
    setVisible(true);
  };

  // Define function to hide the modal
  const hideModal = () => {
    setSelectedService(null);
    setVisible(false);
  };

  // Define the JSX to be rendered
  return (
    <ScrollView style={{flex: 1, padding: 16}}>
      {/* Areas Container */}
      <Card style={{marginBottom: 16}}>
        <Card.Content>
          {/* Title and Add Button */}
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
              onPress={() => navigation.navigate('CreateArea')} // Replace 'CreateArea' with the name of your create area screen
            >
              Add
            </Button>
          </View>
          {userAreas.length > 0 ? (
            userAreas.map((area, index) => (
              <List.Item
                key={area.area_id || index} // Use area_id if available, otherwise use index
                title={area.area_name}
                description={`${area.action.serviceName} - ${JSON.stringify(
                  area.action.body,
                )} / ${JSON.stringify(area.reaction)}`}
              />
            ))
          ) : (
            <Text style={{color: theme.colors.onSurface}}>
              Press on the + to create an AREA!
            </Text>
          )}
        </Card.Content>
      </Card>

      {/* Services Container */}
      <Card>
        <Card.Content>
          <Title>Services</Title>
          {services.map((service, index) => (
            <TouchableOpacity key={index} onPress={() => showModal(service)}>
              <List.Item
                key={index} // Use index as key
                title={service.name}
                left={props => <List.Icon {...props} icon="folder" />}
              />
            </TouchableOpacity>
          ))}
        </Card.Content>
      </Card>

      {/* Modal for displaying service actions and reactions */}
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

// Export the HomeScreen component
export default HomeScreen;
