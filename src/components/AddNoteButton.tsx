import React from 'react';
import {Text, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddNoteButton() {

    const navigation = useNavigation();
    return ( 
        <Pressable onPress={() => navigation.navigate("Notes", {id: undefined})}>
            <Text>
                Add
            </Text>
        </Pressable>
    );
}