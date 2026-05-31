import { geetToUni, uniToGeet, sanitise } from '@notewordy/convert_as';

type ConvertDirection = 'geet-to-uni' | 'uni-to-geet';

export function useConverter() {
    const input = ref('');
    const output = ref('');
    const direction = ref<ConvertDirection>('geet-to-uni');
    const applySanitise = ref(false);

    const convert = () => {
        let text = input.value;
        if (applySanitise.value) {
            text = sanitise(text);
        }
        output.value = direction.value === 'geet-to-uni'
            ? geetToUni(text)
            : uniToGeet(text);
    };

    const swap = () => {
        direction.value = direction.value === 'geet-to-uni' ? 'uni-to-geet' : 'geet-to-uni';
        input.value = output.value;
        output.value = '';
    };

    return {
        input,
        output,
        direction,
        applySanitise,
        convert,
        swap,
    };
}
