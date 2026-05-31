<script setup lang="ts">
import { Icon } from '@iconify/vue';

const { input, output, direction, applySanitise, convert, swap } = useConverter();

const copyOutput = async () => {
    if (output.value) {
        await navigator.clipboard.writeText(output.value);
    }
};
</script>

<template>
    <div class="flex flex-1 flex-col h-full overflow-hidden p-4 md:p-8">
        <div class="max-w-3xl w-full mx-auto flex flex-col gap-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-xl font-bold">Assamese Font Converter</h1>
                    <p class="text-sm text-muted-foreground mt-1">
                        Convert between Geetanjali (legacy) and Unicode Assamese
                    </p>
                </div>
            </div>

            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                    <span class="text-sm font-medium">
                        {{ direction === 'geet-to-uni' ? 'Geetanjali → Unicode' : 'Unicode → Geetanjali' }}
                    </span>
                </div>
                <div class="flex items-center gap-2">
                    <Switch id="sanitise" v-model:checked="applySanitise" />
                    <Label for="sanitise" class="text-xs">Sanitise</Label>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-start">
                <div class="space-y-2">
                    <Label class="text-xs text-muted-foreground">
                        {{ direction === 'geet-to-uni' ? 'Geetanjali Input' : 'Unicode Input' }}
                    </Label>
                    <Textarea
                        v-model="input"
                        placeholder="Paste text here..."
                        class="min-h-[200px] font-mono text-sm"
                    />
                </div>

                <div class="flex md:flex-col gap-2 justify-center self-center pt-6">
                    <Button variant="outline" size="icon" @click="convert" title="Convert">
                        <Icon icon="lucide:arrow-right" class="w-4 h-4 md:hidden" />
                        <Icon icon="lucide:arrow-down" class="w-4 h-4 hidden md:block" />
                    </Button>
                    <Button variant="ghost" size="icon" @click="swap" title="Swap direction">
                        <Icon icon="lucide:arrow-left-right" class="w-4 h-4" />
                    </Button>
                </div>

                <div class="space-y-2">
                    <Label class="text-xs text-muted-foreground">
                        {{ direction === 'geet-to-uni' ? 'Unicode Output' : 'Geetanjali Output' }}
                    </Label>
                    <Textarea
                        :model-value="output"
                        placeholder="Converted text will appear here..."
                        class="min-h-[200px] font-mono text-sm"
                        readonly
                    />
                </div>
            </div>

            <div class="flex gap-2">
                <Button @click="convert">
                    <Icon icon="lucide:refresh-cw" class="w-4 h-4 mr-2" />
                    Convert
                </Button>
                <Button variant="outline" @click="input = ''; output = ''">
                    <Icon icon="lucide:trash-2" class="w-4 h-4 mr-2" />
                    Clear
                </Button>
                <Button v-if="output" variant="outline" @click="copyOutput">
                    <Icon icon="lucide:copy" class="w-4 h-4 mr-2" />
                    Copy
                </Button>
            </div>
        </div>
    </div>
</template>
