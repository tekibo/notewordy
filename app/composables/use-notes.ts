export type Note = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export function useNotes() {
    const notes = useState<Note[]>('notes', () => [] as Note[]);


    const hasNotes = computed(() => notes.value.length > 0)

    const addNote = () => {
        const now = new Date();
        const id = Date.now().toString();
        notes.value.push({
            id,
            title: "Untitled",
            content: "",
            createdAt: now.toISOString(),
            updatedAt: now.toISOString()
        });

        sortNotes();

        navigateTo(`/note/${id}`);
    }

    const getNote = (id: string) => {
        return notes.value.find((note) => note.id === id)
    }

    const goToNote = (id: string) => {
        navigateTo(`/note/${id}`);
    }

    const deleteNote = (id: string) => {
        notes.value = notes.value.filter((note) => note.id !== id)
        sortNotes();
        navigateTo('/')
    }

    const updateNote = ({ id, title, content }: { id: string, title?: string, content?: string }) => {
        notes.value = notes.value.map((note) => {
            if (note.id === id) {
                if (title) note.title = title;
                if (content) note.content = content;
                note.updatedAt = new Date().toISOString();
            }
            return note;
        })
        sortNotes();
    }

    const sortNotes = () => {
        notes.value.sort((a, b) => {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        })
    }

    return {
        notes,
        addNote,
        deleteNote,
        updateNote,
        hasNotes,
        getNote,
        goToNote
    }
}