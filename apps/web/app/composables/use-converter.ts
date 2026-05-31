import { geetToUni, uniToGeet, sanitise } from '@notewordy/convert_as';

type ConvertDirection = 'geet-to-uni' | 'uni-to-geet';

export function useConverter() {
    const input = ref('');
    const output = ref('');
    const direction = ref<ConvertDirection>('geet-to-uni');

    const convert = () => {
        const text = sanitise(input.value);
        output.value = direction.value === 'geet-to-uni'
            ? geetToUni(text)
            : uniToGeet(text);
    };

    watch(input, convert);

    const swap = () => {
        direction.value = direction.value === 'geet-to-uni' ? 'uni-to-geet' : 'geet-to-uni';
        input.value = output.value;
        output.value = '';
    };

    const clear = () => {
        input.value = '';
        output.value = '';
    };

    const dirLabel = computed(() =>
        direction.value === 'geet-to-uni'
            ? { from: 'Geetanjali', to: 'Unicode' }
            : { from: 'Unicode', to: 'Geetanjali' }
    );

    return {
        input,
        output,
        direction,
        convert,
        swap,
        clear,
        dirLabel,
    };
}
