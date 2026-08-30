import { formatForIpc, normalizeNote, sortNotes } from '~/lib/note-actions';
import { APP_CONSTANTS } from '~/utils/constants';
import type { Note } from '../../../desktop/src/shared/types';

export function useNotes() {
    const route = useRoute();
    const { rpc } = useElectrobun();

    const notes = useState<Note[]>('notes', () => []);
    const hasNotes = computed(() => notes.value.length > 0);
    const rawQuery = shallowRef("");
    const loaded = useState<boolean>('notesLoaded', () => false);

    const refreshNotes = async () => {
        if (!rpc) return;

        try {
            const data = await rpc.request.listNotes({});
            notes.value = data.map(normalizeNote);
            sortNotes(notes.value);
            loaded.value = true;
        } catch (e) {
            console.error("Failed to list notes:", e);
        }
    };

    if (process.client && !loaded.value) {
        refreshNotes();
    }

    const { assameseMode } = useAssamese();

    const addNote = async () => {
        if (!rpc) return;

        const defaultTitle = assameseMode.value ? APP_CONSTANTS.DEFAULT_TITLE_AS : APP_CONSTANTS.DEFAULT_TITLE_EN;

        const now = new Date();
        const id = Date.now().toString();

        const newNote: Note = normalizeNote({
            id,
            title: defaultTitle,
            content: "",
            createdAt: now.toISOString(),
            updatedAt: now.toISOString(),
        });

        notes.value.push(newNote);

        try {
            await rpc.request.saveNote({ note: JSON.parse(JSON.stringify(newNote)) });
            sortNotes(notes.value);
            await navigateTo(`/note/${id}`);
        } catch (error) {
            notes.value = notes.value.filter((n) => n.id !== id);
            console.error("Failed to add note", error);
        }
    };

    const handleNewNote = async () => {
        if (route.path.startsWith('/note/')) {
            const currentId = route.params.id as string;
            const currentNote = getNote(currentId);
            const isEmpty = !currentNote || (!currentNote.content?.trim() && (
                !currentNote.title?.trim() ||
                currentNote.title === APP_CONSTANTS.DEFAULT_TITLE_EN ||
                currentNote.title === APP_CONSTANTS.DEFAULT_TITLE_AS
            ));
            if (isEmpty) {
                return;
            }
        }
        await addNote();
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

        if (!rpc) return;

        notes.value = notes.value.filter((n) => n.id !== id);

        try {
            await rpc.request.deleteNote({ id });
            sortNotes(notes.value);

            if (route.params.id === id) {
                await navigateTo('/');
            }
        } catch (error) {
            notes.value.push(note);
            sortNotes(notes.value);
            console.error("Failed to delete note", error);
        }
    };

    const updateNote = async (updatedNote: Partial<Note>) => {
        if (!rpc) return;

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
            await rpc.request.saveAllNotes({ notes: formatForIpc(notes.value) });
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
        handleNewNote,
        deleteNote,
        updateNote,

        getNote,
        goToNote,
        refreshNotes,

        searchNotes,
        rawQuery,
    };
}