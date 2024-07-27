import AsyncStorage from "@react-native-async-storage/async-storage";
import { Note } from "../src/types";

const KEY = "NOTES_APP";

export async function getAllNotes(): Promise<Note[]> {
    try {
        const notes = await AsyncStorage.getItem(KEY);
        return JSON.parse(notes ?? '[]');
    } catch (error) {
        console.error("Failed to fetch notes", error);
        return [];
    }
}

export async function saveNotesToStorage(notes: Note[]): Promise<void> {
    try {
        await AsyncStorage.setItem(KEY, JSON.stringify(notes));
    } catch (error) {
        console.error("Failed to save notes", error);
    }
}

export async function getNoteById(id: string): Promise<Note | null> {
    try {
        const allNotes = await getAllNotes();
        return allNotes.find((note) => note.id === id) || null; 
    } catch (error) {
        console.error("Failed to fetch note", error);
        return null;
    }
}

export async function saveNote(text: string): Promise<void> {
    try {
        const allNotes = await getAllNotes();
        allNotes.push({ id: Date.now().toString(), text });
        await saveNotesToStorage(allNotes);
    } catch (error) {
        console.error("Failed to save note", error);
    }
}

export async function editNote(id: string, text: string): Promise<void> {
    try {
        const allNotes = await getAllNotes();
        const noteIndex = allNotes.findIndex((note) => note.id === id);       
        if (noteIndex !== -1) {
            allNotes[noteIndex] = { id, text }; 
            await saveNotesToStorage(allNotes);
        } else {
            console.error("No note was found to update");
        }
    } catch (error) {
        console.error("Failed to edit note", error);
    }
}

export async function deleteNote(id: string): Promise<void> {
    try {
        const allNotes = await getAllNotes();
        const noteIndex = allNotes.findIndex((note) => note.id === id);
        if (noteIndex !== -1) {
            allNotes.splice(noteIndex, 1);
            await saveNotesToStorage(allNotes);
        } else {
            console.error("No note was found to delete");
        }
    } catch (error) {
        console.error("Failed to delete note", error);
    }
}
