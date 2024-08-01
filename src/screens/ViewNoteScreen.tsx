import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { ViewNoteScreenRouteProps } from '../types';
import { getNoteById } from '../../services/noteService';
import ZoomableText from '../components/ZoomableText';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ViewNoteScreen() {
    const [note, setNote] = useState<{ body: string; title: string } | null>(null);
    const route = useRoute<ViewNoteScreenRouteProps>();
    const navigation = useNavigation();
    const id = route.params.id;

    useFocusEffect(() => {
        async function fetchNote() {
            if (id) {
                const fetchedNote = await getNoteById(id);
                setNote(fetchedNote);
            }
        }
        fetchNote();
    });

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity 
                    style={styles.editButton} 
                    onPress={() => {
                        navigation.navigate('Note', { id });
                    }}>
                    <Icon name="pencil" size={24} color="lightgrey" />
                </TouchableOpacity>
            ),
        });
    }, [navigation, id]);

    return (
        <View style={styles.container}>
            {note ? (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {note.title}
                        </Text>
                    </View>
                    <ZoomableText style={styles.body} minFontSize={14} maxFontSize={40} startingFontSize={20}>
                        {note.body}
                    </ZoomableText>
                </ScrollView>
            ) : (
                <Text style={styles.loadingText}>Loading...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5cbba',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    titleContainer: {
        backgroundColor: '#d4b0a0', 
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        padding: 15,
    },
    body: {
        fontSize: 16,
        color: '#000',
        padding: 15,
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    },
    editButton: {
        marginRight: 15,
    },
    editButtonText: {
        fontSize: 16,
        color: '#007BFF',
    },
});
