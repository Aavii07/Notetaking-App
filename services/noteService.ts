import SQLite from 'react-native-sqlite-storage';
import { Note } from "../src/types";

const db = SQLite.openDatabase(
    { name: 'NotesDB', location: 'default' }, 
    () => { console.log('Database opened') }, 
    error => console.log(error)
);

const createTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS Notes (id TEXT PRIMARY KEY, title TEXT, body TEXT);"
        );
    });
};

createTable();

export async function getAllNotes(): Promise<Note[]> {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Notes",
                [],
                (tx, results) => {
                    const notes: Note[] = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        notes.push(results.rows.item(i));
                    }
                    resolve(notes);
                },
                (tx, error) => {
                    console.error("Failed to fetch notes", error);
                    reject([]);
                }
            );
        });
    });
}

export async function saveNote(body: string, title: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const id = Date.now().toString();
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO Notes (id, title, body) VALUES (?, ?, ?)",
                [id, title, body],
                () => resolve(),
                (tx, error) => {
                    console.error("Failed to save note", error);
                    reject();
                }
            );
        });
    });
}

export async function getNoteById(id: string): Promise<Note | null> {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Notes WHERE id = ?",
                [id],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        resolve(results.rows.item(0));
                    } else {
                        resolve(null);
                    }
                },
                (tx, error) => {
                    console.error("Failed to fetch note", error);
                    reject(null);
                }
            );
        });
    });
}

export async function editNote(id: string, body: string, title: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE Notes SET title = ?, body = ? WHERE id = ?",
                [title, body, id],
                () => resolve(),
                (tx, error) => {
                    console.error("Failed to edit note", error);
                    reject();
                }
            );
        });
    });
}

export async function deleteNote(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM Notes WHERE id = ?",
                [id],
                () => resolve(),
                (tx, error) => {
                    console.error("Failed to delete note", error);
                    reject();
                }
            );
        });
    });
}
