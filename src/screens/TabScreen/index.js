import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../Home';
import Treinos from '../Treinos';
import Configuracoes from '../Configuracoes';
import { Image } from 'react-native';


const Tab = createBottomTabNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#F4485E', 
        tabBarInactiveTintColor: '#909090', 
        tabBarStyle: {
          backgroundColor: '#252525',
          borderTopColor: '#F4485E',
          borderTopWidth: 1,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 12, // Tamanho da fonte do rótulo
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../img/home.png')}
              style={{ tintColor: '#F4485E', width: size, height: size }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Treinos"
        component={Treinos}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../img/treino.png')}
              style={{ tintColor: '#F4485E', width: 25, height: 31 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Configuraçoes"
        component={Configuracoes}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../img/configuracoes.png')}
              style={{ tintColor: '#F4485E', width: 33, height: 30 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabScreen;
