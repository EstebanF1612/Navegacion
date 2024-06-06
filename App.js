import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, TextInput, View, Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

function HomeScreen({route, navigation}) {
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount((c)=> c + 1)} title="Update count" />
      ),
    });
  });
  
  return (
    <Stack.Navigator>
      <Stack.Screen name='Main Screen'>
        {() => (
          <View style={{flex: 1, backgroundColor: "white"}}>
            <View style={{flex: 1/10, margin: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>Count: {count}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Button
                title="Create a Post"
                onPress={() => navigation.navigate('CreatePost')}
                />
                <Text style={{margin: 10}}>Post: {route.params?.post}</Text>
            </View>
        </View>
        )}
      </Stack.Screen>
    </Stack.Navigator>
    
    
  );
}
function CreatePostScreen({navigation, route}) {
  const [postText, setPostText] = React.useState('');
  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{height: 200, padding: 10, backgroundColor: 'white'}}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title = "Done"
        onPress={() => {navigation.navigate({
          name: 'Home',
          params: {post: postText},
          merge: true,
          });
        }}
      />
    </>
  );
}

function ProfileScreen() {
  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Profile Screen</Text>
    </View>
  );
}

function LogoTitle(){
  return(
    <Image
      style={{width: 50, height: 50, borderRadius: 50/2}}
      source={require('./assets/images/Screenshot 2023-09-13 174656.png')}
    />
  );
}

function Settings(){
  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Settings Screen</Text>
    </View>
  );
}

function Root(){
  return(
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen}/>
      <Drawer.Screen name="Profile" component={ProfileScreen}/>
      <Drawer.Screen name="Settings" component={Settings}/>
    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="Root"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen 
          name="Root" 
          component={Root} 
          options={{headerShown: false}}
        />
        <Tab.Screen name="Home" 
          component={HomeScreen} 
          options={({navigation, route}) => ({
            headerTitle: (props) => <LogoTitle{...props}/>,
            headerRight: () => (
              <Button
                title="Update Count"
                color="#fff"
              />
            ),
          })}
        />
        <Tab.Screen 
          name="CreatePost" 
          component={CreatePostScreen} 
          options={{
            headerBackTitle: 'Back',
            headerBackTitleStyle: {fontSize: 20},
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
