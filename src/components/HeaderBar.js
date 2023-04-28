import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";

const HeaderBar = ({ title, leftOnPresed, right, containerStyle }) => {
    return (
        <View style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            ...containerStyle
        }}>
            {/* Back */}

            <View style={{ alignItems: 'flex-start' }}>
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: 25,
                        backgroundColor: "#00000080"
                    }}
                    onPress={leftOnPresed}
                >
                    <Ionicons
                        name="arrow-back"
                        size={22}
                        color={'#fff'}
                    />
                </TouchableOpacity>
            </View>

            {/* Title */}
            {/* <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text
                    style={{color: "#fff"}}
                >{title}</Text>
            </View> */}

            {/* Settings */}
            {/* <TouchableOpacity
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: right ? "#FF000000": null
                }}
            >
                {right && 
                    <Ionicons
                    name="settings-outline"
                    size={25}
                    color={'#fff'}
                />
                }
            </TouchableOpacity> */}
        </View>
    )
}

export default HeaderBar

const styles = StyleSheet.create({})