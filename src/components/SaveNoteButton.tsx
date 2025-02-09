import React from 'react';
import { Pressable, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Note } from '../types';
import { editNote, saveNote } from '../../services/noteService';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SaveNoteButton({id, body, title}: Note) {
    const navigation = useNavigation();

    const handleSave = async () => {
        try {
            if (!title || !body){
                Alert.alert('Missing Fields', 'Please enter both a title and body to save.');
                return;
            }

            if (id){
                await editNote(id, body, title);
                Alert.alert('Success', 'Your note has been successfully updated.');
            } else {
                await saveNote(body, title);
                Alert.alert('Success', 'A new note has been added to your list.');
            }
            
            navigation.goBack();
        } catch (error) {
            console.error('Error saving note', error);
            Alert.alert('Error', 'Failed to save note.');
        }
    };

    return ( 
        <Pressable onPress={handleSave} style={styles.button}>
            <Icon name="save" size={24} color="lightgrey" />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
});