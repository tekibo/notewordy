<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
    open: boolean
}>()

const emit = defineEmits<{
    'update:open': [value: boolean]
}>()

const isOpen = computed({
    get: () => props.open,
    set: (value) => emit('update:open', value)
})

const consonants = [
    { group: 'Velar', items: [{ t: 'kô', c: 'ক' }, { t: 'khô', c: 'খ' }, { t: 'gô', c: 'গ' }, { t: 'ghô', c: 'ঘ' }, { t: 'ngô', c: 'ঙ' }] },
    { group: 'Palatal', items: [{ t: 'cô', c: 'চ' }, { t: 'chô', c: 'ছ' }, { t: 'jô', c: 'জ' }, { t: 'jhô', c: 'ঝ' }, { t: 'ñô', c: 'ঞ' }] },
    { group: 'Retroflex', items: [{ t: 'Ṭô', c: 'ট' }, { t: 'Ṭhô', c: 'ঠ' }, { t: 'Ḍô', c: 'ড' }, { t: 'Ḍhô', c: 'ঢ' }, { t: 'Ṇô', c: 'ণ' }] },
    { group: 'Dental', items: [{ t: 'tô', c: 'ত' }, { t: 'thô', c: 'থ' }, { t: 'dô', c: 'দ' }, { t: 'dhô', c: 'ধ' }, { t: 'nô', c: 'ন' }] },
    { group: 'Labial', items: [{ t: 'pô', c: 'প' }, { t: 'phô', c: 'ফ' }, { t: 'bô', c: 'ব' }, { t: 'bhô', c: 'ভ' }, { t: 'mô', c: 'ম' }] },
    { group: 'Others', items: [{ t: 'zô', c: 'য' }, { t: 'rô', c: 'ৰ' }, { t: 'lô', c: 'ল' }, { t: 'wô', c: 'ৱ' }, { t: 'śô', c: 'শ' }, { t: 'Ṣô', c: 'ষ' }, { t: 'sô', c: 'স' }, { t: 'hô', c: 'হ' }] },
    { group: 'Special', items: [{ t: 'Khô', c: 'ক্ষ' }, { t: 'Ṛô', c: 'ড়' }, { t: 'Ṛhô', c: 'ঢ়' }, { t: 'Yô', c: 'য়' }] },
]

const vowels = [
    { t: 'a', i: 'অ', d: '—' },
    { t: 'ā', i: 'আ', d: 'া' },
    { t: 'i', i: 'ই', d: 'ি' },
    { t: 'ī', i: 'ঈ', d: 'ী' },
    { t: 'u', i: 'উ', d: 'ু' },
    { t: 'ū', i: 'ঊ', d: 'ূ' },
    { t: 'ri', i: 'ঋ', d: 'ৃ' },
    { t: 'e', i: 'এ', d: 'ে' },
    { t: 'oi', i: 'ঐ', d: 'ৈ' },
    { t: 'o', i: 'ও', d: 'ো' },
    { t: 'ou', i: 'ঔ', d: 'ৌ' },
]

const symbols = [
    { n: 'Candrabindu', c: 'ঁ' },
    { n: 'Anusvara', c: 'ং' },
    { n: 'Visarga', c: 'ঃ' },
    { n: 'Nukta', c: '়' },
    { n: 'Khôndô-tô', c: 'ৎ' },
    { n: 'Virāma', c: '্' },
]

const numerals = [
    { a: '0', as: '০' }, { a: '1', as: '১' }, { a: '2', as: '২' }, { a: '3', as: '৩' }, { a: '4', as: '৪' },
    { a: '5', as: '৫' }, { a: '6', as: '৬' }, { a: '7', as: '৭' }, { a: '8', as: '৮' }, { a: '9', as: '৯' },
]

const rules = [
    { key: 'T, Th, D, Dh, N', desc: 'Uppercase for retroflex (dot below)' },
    { key: 'aa, ii, uu / A, I, U', desc: 'Long vowels' },
    { key: 'G / ng', desc: 'ngô (ঙ)' },
    { key: 'J', desc: 'ñô (ঞ)' },
    { key: 'z / sh', desc: 'śô (শ)' },
    { key: 't-', desc: 'Khôndô-tô (ৎ)' },
    { key: 'M / MM', desc: 'Anusvara / Candrabindu' },
    { key: 'H', desc: 'Visarga' },
    { key: '_', desc: 'Half consonant (Virāma)' },
    { key: '/ or |', desc: 'Dāri (।)' },
]

const footerNotes = [
    "Assamese ৰ is different from Bengali র",
    "Assamese ৱ is distinct from ব",
    "Assamese স is often pronounced as /x/",
]

const { assameseMode, setAssameseMode } = useSettings();
</script>

<template>
    <Dialog v-model:open="isOpen">
        <DialogContent
            class="max-w-md w-[95vw] max-h-[85vh] overflow-hidden flex flex-col p-0 bg-background/95 backdrop-blur-xl border-primary/10 shadow-2xl rounded-3xl">
            <DialogHeader class="p-5 pb-3 border-b border-border/50 shrink-0">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                        <Icon icon="lucide:keyboard" class="w-5 h-5" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <DialogTitle class="text-xl font-bold tracking-tight">Layout Guide</DialogTitle>
                        <DialogDescription class="text-xs font-medium text-muted-foreground/60">
                            Assamese Transliteration
                        </DialogDescription>
                    </div>
                </div>
            </DialogHeader>

            <div class="flex-1 overflow-y-auto overflow-x-hidden p-5 space-y-12 custom-scrollbar">
                <!-- Consonants Section -->
                <section>
                    <div class="flex items-center gap-2 mb-5 shrink-0">
                        <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40">Consonants</h3>
                        <div class="h-px flex-1 bg-linear-to-r from-primary/10 to-transparent"></div>
                    </div>
                    <div class="flex flex-col gap-8">
                        <div v-for="group in consonants" :key="group.group" class="space-y-3">
                            <h4
                                class="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-wider flex items-center gap-2 px-1">
                                {{ group.group }}
                            </h4>
                            <div class="flex flex-wrap gap-2">
                                <div v-for="item in group.items" :key="item.c"
                                    class="group flex flex-col items-center justify-center w-14 h-14 rounded-xl border border-border/40 bg-card/10 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300">
                                    <span class="text-xl font-as group-hover:scale-110 transition-transform">{{ item.c
                                        }}</span>
                                    <span
                                        class="text-[9px] font-mono uppercase opacity-40 group-hover:opacity-100 text-center px-1 truncate w-full">{{
                                        item.t }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Vowels Section -->
                <section>
                    <div class="flex items-center gap-2 mb-5 shrink-0">
                        <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40">Vowels</h3>
                        <div class="h-px flex-1 bg-linear-to-r from-primary/10 to-transparent"></div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <div v-for="v in vowels" :key="v.i"
                            class="flex items-center justify-between p-3 rounded-2xl border border-border/30 bg-card/5 hover:bg-primary/2 transition-colors group">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center shrink-0">
                                    <span class="text-2xl font-as text-primary">{{ v.i }}</span>
                                </div>
                                <div class="flex flex-col min-w-0">
                                    <span class="text-xs font-bold font-mono text-muted-foreground truncate">{{ v.t
                                        }}</span>
                                    <span class="text-[10px] text-muted-foreground/50">Base</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-3 text-right shrink-0">
                                <div class="flex flex-col items-end">
                                    <span class="text-xl font-as text-foreground/80 leading-none">{{ v.d }}</span>
                                    <span
                                        class="text-[9px] uppercase tracking-widest text-muted-foreground/40 font-bold mt-1">Sign</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Symbols Section -->
                <section>
                    <div class="flex items-center gap-2 mb-5 shrink-0">
                        <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40">Special Symbols
                        </h3>
                        <div class="h-px flex-1 bg-linear-to-r from-primary/10 to-transparent"></div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <div v-for="s in symbols" :key="s.c"
                            class="flex items-center justify-between p-3 px-4 rounded-xl border border-border/30 bg-card/5">
                            <span class="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter">{{
                                s.n }}</span>
                            <span class="text-xl font-as text-primary">{{ s.c }}</span>
                        </div>
                    </div>
                </section>

                <!-- Numerals Section -->
                <section>
                    <div class="flex items-center gap-2 mb-5 shrink-0">
                        <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40">Numerals</h3>
                        <div class="h-px flex-1 bg-linear-to-r from-primary/10 to-transparent"></div>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <div v-for="n in numerals" :key="n.as"
                            class="flex flex-col items-center justify-center w-12 h-12 rounded-xl border border-border/30 bg-card/5 hover:bg-primary/5 transition-colors group">
                            <span class="text-lg font-as group-hover:text-primary leading-none">{{ n.as }}</span>
                            <span class="text-[8px] font-mono opacity-30 mt-0.5">{{ n.a }}</span>
                        </div>
                    </div>
                </section>

                <!-- Input Rules Section -->
                <section>
                    <div class="flex items-center gap-2 mb-5 shrink-0">
                        <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40">Typing Rules</h3>
                        <div class="h-px flex-1 bg-linear-to-r from-primary/10 to-transparent"></div>
                    </div>
                    <div class="flex flex-col gap-2 p-1">
                        <div v-for="rule in rules" :key="rule.key"
                            class="flex flex-col gap-1 p-3 rounded-2xl border border-primary/5 bg-primary/1 hover:bg-background/50 transition-all group">
                            <code
                                class="font-mono text-[10px] text-primary bg-primary/5 px-2 py-1 rounded-lg w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                {{ rule.key }}
                            </code>
                            <span class="text-muted-foreground text-[11px] font-medium pl-1 leading-relaxed">{{
                                rule.desc }}</span>
                        </div>
                    </div>

                    <!-- Important Notes -->
                    <div class="mt-8 space-y-3">
                        <div v-for="note in footerNotes" :key="note"
                            class="flex gap-3 text-[11px] text-muted-foreground/70 leading-relaxed bg-muted/20 p-4 rounded-2xl border border-border/20">
                            <Icon icon="lucide:info" class="w-4 h-4 text-primary/30 shrink-0 mt-0.5" />
                            <span>{{ note }}</span>
                        </div>
                    </div>
                </section>
            </div>

            <div class="p-4 border-t border-border/50 bg-muted/10 flex justify-between items-center px-6 shrink-0">
                <div class="flex items-center gap-3">
                    <span class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Assamese Mode</span>
                    <Switch :model-value="assameseMode" @update:model-value="setAssameseMode" />
                </div>
                <Button variant="secondary" @click="isOpen = false"
                    class="rounded-xl px-10 h-11 text-xs font-bold transition-all hover:bg-muted-foreground/10">
                    Dismiss Guide
                </Button>
            </div>
        </DialogContent>
    </Dialog>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
    display: block;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: var(--primary);
    opacity: 0.5;
}
</style>
