import React, {useState, useEffect, useContext} from 'react';
import {View, TextInput, Button, ScrollView, StyleSheet} from 'react-native';
import {List, useTheme} from 'react-native-paper';
import createNodeJson from '../../methods/createNodeJson';
import sendNewNode from '../../methods/sendNewNode';
import fetchAboutJson from '../../methods/fetchAboutJson';
import Navigation from './navigation';
import {UserContext} from '../context/userContext'; // Adjust the path to match your file structure

const CreateArea = () => {
  const [servicesData, setServicesData] = useState([]);
  const [selectedTrigger, setSelectedTrigger] = useState(null);
  const [areaTitle, setAreaTitle] = useState('');
  const [triggerParams, setTriggerParams] = useState({});
  const [reactionParams, setReactionParams] = useState([]);
  const [selectedActionParams, setSelectedActionParams] = useState({});
  const [selectedReactionParams, setSelectedReactionParams] = useState({});
  const [selectedActions, setSelectedActions] = useState({});
  const [selectedReactions, setSelectedReactions] = useState({});
  const {sub} = useContext(UserContext); // Add this line

  const theme = useTheme();

  useEffect(() => {
    fetchAboutJson({setServices: setServicesData});
  }, []);

  const handleTriggerSelect = trigger => {
    console.log('Selected Trigger:', trigger); // Add this line
    setSelectedTrigger(trigger);
  };

  const handleActionToggle = (action, service) => {
    if (
      selectedTrigger &&
      selectedTrigger.name === action.name &&
      selectedTrigger.service === service.name
    ) {
      setSelectedTrigger(null); // Deselecting action
      setSelectedActions(prev => ({
        ...prev,
        [service.name]: null,
      })); // Deselecting action in selectedActions state
    } else {
      setSelectedTrigger({service: service.name, ...action}); // Selecting new action
      setSelectedActions(prev => ({
        ...prev,
        [service.name]: action.name,
      })); // Updating selectedActions state
    }
  };

  const handleReactionToggle = (reaction, service) => {
    setSelectedReactions(prev => ({
      ...prev,
      [service.name]:
        prev[service.name] === reaction.name ? null : reaction.name,
    }));
  };

  const handleParamChange = (
    paramName,
    value,
    actionName,
    isReaction = false,
  ) => {
    if (isReaction) {
      setSelectedReactionParams(prev => ({
        ...prev,
        [actionName]: {...(prev[actionName] || {}), [paramName]: value},
      }));
    } else {
      setSelectedActionParams(prev => ({
        ...prev,
        [actionName]: {...(prev[actionName] || {}), [paramName]: value},
      }));
    }
    console.log(
      'Updated Params:',
      selectedActionParams,
      selectedReactionParams,
    );
  };

  const renderParamInputs = (params, actionName, isReaction = false) => {
    console.log('Rendering param inputs for:', actionName, params); // Log the action and params
    return params.map(param => (
      <TextInput
        key={param.name}
        placeholder={param.name}
        onChangeText={value =>
          handleParamChange(param.name, value, actionName, isReaction)
        }
        style={styles.input}
      />
    ));
  };

  const handleCreateArea = () => {
    console.log('areaTitle:', areaTitle);
    const selectedReactionServices = Object.keys(selectedReactionParams);
    const selectedActionServices = Object.keys(selectedActionParams);

    if (
      selectedTrigger &&
      (selectedReactionServices.length > 0 ||
        selectedActionServices.length > 0) &&
      areaTitle
    ) {
      const nodeJson = createNodeJson(
        sub,
        areaTitle,
        {
          service: selectedTrigger.name, // Updated from selectedTrigger.service to selectedTrigger.name
          paramValues: Object.entries(
            selectedActionParams[selectedTrigger.service] || {},
          ).map(([name, value]) => ({name, value})),
        },
        selectedReactionServices.map(serviceName => ({
          service: serviceName,
          paramValues: Object.entries(
            selectedReactionParams[serviceName] || {},
          ).map(([name, value]) => ({name, value})),
        })),
      );
      console.log('selectedActionParams:', selectedActionParams);
      console.log('selectedTrigger:', selectedTrigger);
      console.log('selectedReactionParams:', selectedReactionParams);
      console.log('nodeJson:', nodeJson);

      sendNewNode(nodeJson);
      // navigation.navigate('BottomTabNavigator', {screen: 'HomeTab'});
    } else {
      alert('Please complete all fields.');
    }
  };
  
  const styles = StyleSheet.create({
    container: {flex: 1, padding: 16, backgroundColor: theme.colors.background},
    titleInput: {
      marginBottom: 20,
      padding: 10,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 4,
      color: theme.colors.onSurface,
    },
    input: {
      marginBottom: 10,
      padding: 10,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 10,
      color: theme.colors.onSurface,
    },
    serviceContainer: {
      marginBottom: 20,
      borderRadius: 10,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <TextInput
        value={areaTitle}
        onChangeText={setAreaTitle}
        placeholder="Enter Area Title"
        placeholderTextColor= {theme.colors.onSurfaceDisabled}
        style={styles.titleInput}
      />
      {servicesData.map(service => (
        <View key={service.name} style={styles.serviceContainer}>
          <List.Accordion title={service.name}>
            {service.actions.map(action => (
              <View key={action.name}>
                <List.Item
                  title={action.name}
                  description={action.description}
                  onPress={() => handleActionToggle(action, service)}
                />
                {/* Ensure the condition here is correct for displaying the parameter inputs: */}
                {selectedActions[service.name] === action.name &&
                  renderParamInputs(action.params, action.name)}
              </View>
            ))}
            {service.reactions.map(reaction => (
              <View key={reaction.name}>
                <List.Item
                  title={reaction.name}
                  description={reaction.description}
                  onPress={() => handleReactionToggle(reaction, service)}
                />
                {/* Ensure the condition here is correct for displaying the parameter inputs: */}
                {selectedReactions[service.name] === reaction.name &&
                  renderParamInputs(reaction.params, reaction.name, true)}
              </View>
            ))}
          </List.Accordion>
        </View>
      ))}
      <Button
        onPress={handleCreateArea}
        title="Create Area"
        color={theme.colors.primary}
      />
    </ScrollView>
  );
};


export default CreateArea;
