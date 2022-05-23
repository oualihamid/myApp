import * as React from 'react';
import { View, Text,Button,YellowBox } from 'react-native';
import { NavigationContainer,useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabBar from 'react-native-tab-bar-footer';

console.disableYellowBox = true;
YellowBox.ignoreWarnings(['Class RCTCxxModule']);

import { 
    HomeScreen,
    LoginScreen,
    RouteScreen,
    SearchScreen,
    StationScreen,
    ListScreen,
    EspaceScreen,
    AdminScreen
 } from './screens';
const Tab = createNativeStackNavigator();
const tabs = [
    {
    
     icon:require('./images/icons/map.png'),
     //activeIcon: './images/icons/accueil.png',
      title: 'Carte',
    },
    {
       icon:require('./images/icons/parking.png'),
     // activeIcon: playActive,
      title: 'Stations'
    },
    {
       icon:require('./images/icons/search.png'),
     // activeIcon: playActive,
      title: 'Recherche'
    },
  ]
function navigate(ref,choix){
  let screen;
  if(choix == 0){ screen = "Home" };
  if(choix == 1){ screen = "List" };
  if(choix == 2){ screen = "Search" };
  
  ref.current && ref.current.navigate(screen);
}

function App() {
    const ref = React.useRef(null);

    return (
        <NavigationContainer ref={ref}>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="List" component={ListScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Route" component={RouteScreen} />
          <Tab.Screen name="Station" component={StationScreen} />
             
        </Tab.Navigator>
        <View>
        <TabBar titleStyle={{color:'#ff0078'}} onTabChange={(index) => navigate(ref,index) } tabs={tabs} />
        </View>

       </NavigationContainer>
    );
  
}
export default App;
