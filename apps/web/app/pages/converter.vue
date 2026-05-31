<script setup lang="ts">
import { Icon } from '@iconify/vue';

const { input, output, direction, convert, swap, clear, dirLabel } = useConverter();

const copyOutput = async () => {
    if (output.value) {
        await navigator.clipboard.writeText(output.value);
    }
};
</script>

<template>
    <div class="p-4 space-y-4">
        <div class="flex items-center gap-2">
            <Button
                :variant="direction === 'geet-to-uni' ? 'default' : 'outline'"
                size="sm"
                @click="direction = 'geet-to-uni'"
            >
                Geetanjali → Unicode
            </Button>
            <Button
                :variant="direction === 'uni-to-geet' ? 'default' : 'outline'"
                size="sm"
                @click="direction = 'uni-to-geet'"
            >
                Unicode → Geetanjali
            </Button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
                <Label class="text-xs font-medium">{{ dirLabel.from }}</Label>
                <Textarea
                    v-model="input"
                    placeholder="Paste or type text here..."
                    class="h-48 font-mono text-sm resize-none"
                />
            </div>
            <div class="space-y-2">
                <Label class="text-xs font-medium">{{ dirLabel.to }}</Label>
                <Textarea
                    :model-value="output"
                    placeholder="Converted text will appear here..."
                    class="h-48 font-mono text-sm resize-none"
                    readonly
                />
            </div>
        </div>

        <div class="flex items-center gap-3">
            <Button @click="convert">
                <Icon icon="lucide:refresh-cw" class="w-4 h-4 mr-2" />
                Convert
            </Button>
            <Button variant="outline" @click="swap" title="Swap input/output">
                <Icon icon="lucide:arrow-left-right" class="w-4 h-4 mr-2" />
                Swap
            </Button>
            <Button variant="outline" @click="clear">
                <Icon icon="lucide:trash-2" class="w-4 h-4 mr-2" />
                Clear
            </Button>
            <div class="flex-1" />
            <Button v-if="output" variant="outline" @click="copyOutput">
                <Icon icon="lucide:copy" class="w-4 h-4 mr-2" />
                Copy
            </Button>
        </div>
    </div>
</template>
