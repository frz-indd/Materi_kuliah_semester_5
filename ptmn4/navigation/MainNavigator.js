import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarActiveTintColor: '#0284c7' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Beranda',
          tabBarLabel: 'Beranda',
          tabBarIcon: ({ color }) => <Text style={{ color }}>🏠</Text>
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profil',
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => <Text style={{ color }}>👤</Text>
        }}
      />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Tabs">
      <Drawer.Screen
        name="Tabs"
        component={MainTabs}
        options={{ title: 'Menu utama', drawerLabel: 'Beranda dan Profil' }}
      />
      <Drawer.Screen
        name="ProfileMenu"
        component={ProfileScreen}
        options={{ title: 'Profil Pengguna', drawerLabel: 'Profil Pengguna' }}
      />
    </Drawer.Navigator>
  );
}