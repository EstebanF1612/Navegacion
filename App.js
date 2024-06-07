import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, TextInput, View, Image, Alert} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import appFirebase from './credenciales';
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const db = getFirestore(appFirebase);


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
      <Stack.Screen name='Main Screen' options={{headerShown: false}}>
        {() => (
          <View style={{flex: 1, backgroundColor: "white"}}>
            <View style={{flex: 1/10, margin: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>Count: {count}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Button
                title="Create a Post"
                onPress={() => navigation.navigate('Create Post')}
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
  const savePost = async () => {
    try{
      await addDoc(collection(db, 'Posts'),{
        ...postText
      }) 
      Alert.alert('Post published!');
      navigation.navigate({
        name: 'Home',
        params: {post: postText},
        merge: true,
      });
    }
    catch(e){
      console.error(error);
    }
  }
  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{height: 200, padding: 10, backgroundColor: 'white', margin: 10, borderRadius: 10}}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title = "Done"
        onPress={savePost}
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

function FeedHome(){
  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Feed Home Screen</Text>
    </View>
  );
}

function Feed(){
  return(
    <Drawer.Navigator screenOptions={{headerTintColor: '#f4511e'}}>
      <Drawer.Screen name="Feed Home" component={FeedHome}/>
      <Drawer.Screen name="Profile" component={ProfileScreen}/>
      <Drawer.Screen name="Settings" component={Settings}/>
    </Drawer.Navigator>
  );
}



function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="Feed"
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
          name="Feed" 
          component={Feed} 
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
          name="Create Post" 
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
