import { ConflictError, UnauthorizedError } from "../errors/httpErrors";
import { Note } from "../models/note";

const BASE_URL = "https://frognotes-api.onrender.com"

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(`${BASE_URL}${input}`, init);
    if (response.ok) {
        return response
    } else {
        const errorBody = await response.json()
        const errorMessage = errorBody.error
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage)
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage)
        } else {
            throw Error(errorMessage)
        }  
    }
}

export async function fetchNotes(): Promise<Note[]> {
    const response = await fetchData("/api/notes", {method: 'GET', credentials: 'include'})
    return response.json()
}

export interface NoteInput {
    title: string,
    text?: string,
}

export async function createNote(note: NoteInput):Promise<Note> {
    const response = await fetchData("/api/notes",
    {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
    })
    return response.json()
}

export async function updateNote(noteId: string, note: NoteInput):Promise<Note> {
    const response = await fetchData("/api/notes/" + noteId,
    {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
    })
    return response.json()
}

export async function deleteNote(noteId: string) {
    await fetchData("/api/notes/" + noteId, {method: 'DELETE', credentials: 'include'})
}