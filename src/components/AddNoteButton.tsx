import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AddNoteButton() {
    const navigation = useNavigation();

    return (
        <View style={styles.buttonContainer}>
            <Pressable onPress={() => navigation.navigate("Notes", {id: undefined})} style={styles.button}>
                <Icon name="add" size={30} color="#000" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        zIndex: 1000,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
});
