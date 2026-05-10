import { useDebounceFn } from '@vueuse/core';
import { formatForIpc, normalizeNote, sortNotes } from '~/lib/note-actions';

export function useNotes() {
    const backend = window.electron;

    const isReady = computedAsync(async () => await backend.electronReady());
    const route = useRoute();

    const notes = useState<Note[]>('notes', () => []);

    const hasNotes = computed(() => notes.value.length > 0);

    const rawQuery = shallowRef("");


    const refreshNotes = async () => {
        if (!isReady.value) return;

        const data = await backend.notes.list();
        notes.value = data.map(normalizeNote);

        sortNotes(notes.value);
    };

    const addNote = async () => {
        if (!isReady.value) return;

        const { assameseMode } = useAssamese();
        const defaultTitle = assameseMode.value ? APP_CONSTANTS.DEFAULT_TITLE_AS : APP_CONSTANTS.DEFAULT_TITLE_EN;

        const now = new Date();
        const id = Date.now().toString();

        const newNote: Note = normalizeNote({
            id,
            title: defaultTitle,
            content: "",
            createdAt: now.toISOString(),
            updatedAt: now.toISOString()
        });

        notes.value.push(newNote);

        try {
            await backend.notes.save(JSON.parse(JSON.stringify(newNote)));
            sortNotes(notes.value);
            navigateTo(`/note/${id}`);
        } catch (error) {
            notes.value = notes.value.filter((n) => n.id !== id);
            console.error("Failed to add note", error);
        }
    };

    const getNote = (id: string) => {
        return notes.value.find((note) => note.id === id);
    };

    const goToNote = (id: string) => {
        navigateTo(`/note/${id}`);
    };

    const deleteNote = async (id: string) => {
        const note = getNote(id);
        if (!note) return;

        notes.value = notes.value.filter((n) => n.id !== id);

        try {
            await backend.notes.delete(id);
            sortNotes(notes.value);

            if (route.params.id === id) {
                navigateTo('/');
            }
        } catch (error) {
            notes.value.push(note);
            sortNotes(notes.value);
            console.error("Failed to delete note", error);
        }
    };

    const updateNote = async (updatedNote: Partial<Note>) => {
        if (!isReady.value) return;

        const oldNotes = [...notes.value];

        notes.value = oldNotes.map((note) => {
            if (note.id === updatedNote.id) {
                if (updatedNote.title !== undefined) note.title = updatedNote.title;
                if (updatedNote.content !== undefined) note.content = updatedNote.content;

                note.updatedAt = new Date().toISOString();

                note._search = (note.title + " " + note.content).toLowerCase();
            }
            return note;
        });

        try {
            await backend.notes.saveAllNotes(formatForIpc(notes.value));
            sortNotes(notes.value);
        } catch (error) {
            notes.value = oldNotes;
            console.error("Failed to save all notes", error);
        }
    };


    const _search = async (query: string) => {
        if (!query || query === "") {
            await refreshNotes();
            return;
        }

        const q = query.toLowerCase();

        notes.value = notes.value.filter((note) =>
            note._search?.includes(q)
        );
    };

    const searchNotes = useDebounceFn(_search, 150);

    return {
        notes,
        hasNotes,

        addNote,
        deleteNote,
        updateNote,

        getNote,
        goToNote,
        refreshNotes,

        searchNotes,
        rawQuery,

        backendReady: isReady
    };
}