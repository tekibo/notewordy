export function useGlobalState() {
    const shortcutsOpen = useState("shortcuts-modal", () => false);
    const keyboardLayoutOpen = useState("keyboard-layout-modal", () => false);
    return {
        shortcutsOpen,
        keyboardLayoutOpen,
    }
}
