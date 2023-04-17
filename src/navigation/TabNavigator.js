import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MyBlog from '../screens/MyBlog';
import NotificationsScreen from '../screens/NotificationsScreen';
import { MAIN_COLOR } from '../utils/color';

const Tab = createBottomTabNavigator();


const TabNavigator = () => {
	return (
		<Tab.Navigator screenOptions={{
			headerShown: false,
			tabBarShowLabel: false,
			tabBarStyle: { backgroundColor: MAIN_COLOR },
			tabBarInactiveTintColor: '#fff',
			tabBarActiveTintColor: '#FFFF00'
		}}>
			<Tab.Screen
				name='Home'
				component={HomeScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='home-outline' color={color} size={size}></Ionicons>
					)
				}}
			></Tab.Screen>

			<Tab.Screen
				name='MyBlog'
				component={MyBlog}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='newspaper-outline' color={color} size={size}></Ionicons>
					)
				}}
			></Tab.Screen>

			<Tab.Screen
				name='Notifications'
				component={NotificationsScreen}
				options={{
					tabBarBadge: 3,
					// tabBarBadgeStyle: {backgroundColor: '#FFFF00'},
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='notifications-outline' color={color} size={size}></Ionicons>
					)
				}}
			></Tab.Screen>

			<Tab.Screen
				name='Profile'
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='person-outline' color={color} size={size}></Ionicons>
					)
				}}
			></Tab.Screen>


		</Tab.Navigator>
	)
}

export default TabNavigator

const styles = StyleSheet.create({})