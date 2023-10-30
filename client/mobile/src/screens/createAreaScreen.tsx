// Import necessary libraries and methods
import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import createNodeJson from '../../methods/createNodeJson';
import sendNewNode from '../../methods/sendNewNode';
import { TriggerProps } from "../../interfaces/triggers";
import { ReactionProps } from "../../interfaces/reactions";

// Define the CreateArea component
const CreateArea = () => {
  const navigation = useNavigation();
  
  // Define state hooks
  const [actionName, setActionName] = useState('');
  const [trigger, setTrigger] = useState<TriggerProps>(/* ...default trigger value... */);
  const [reactions, setReactions] = useState<Array<ReactionProps>>([]);
  
  // Define function to handle the saving of the new AREA
  const handleSaveArea = async () => {
    // Assume userId is available, replace 'your-user-id' with actual userId or get it dynamically
    const userId = 'your-user-id'; 
    const nodeJson = createNodeJson(userId, actionName, trigger, reactions);
    await sendNewNode(nodeJson);
    navigation.navigate('BottomTabNavigator', {screen: 'HomeTab'})
};
  
  return (
    <View style={{ padding: 16 }}>
      <Card style={{ marginBottom: 16 }}>
        <Card.Content>
          <TextInput
            label="Area Name"
            value={actionName}
            onChangeText={setActionName}
            style={{ marginBottom: 16 }}
          />
          {/* Trigger Selection UI */}
          {/* ... */}
          
          {/* Reactions Selection UI */}
          {/* ... */}
          
          <Button onPress={handleSaveArea}>Save AREA</Button>
        </Card.Content>
      </Card>
    </View>
  );
};

// Export the CreateArea component
export default CreateArea;
