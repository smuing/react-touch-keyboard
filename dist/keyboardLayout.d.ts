export type KeyboardType = "numpad" | "ko" | "en" | "enNum";
export declare function getCustomKeyboardLayout(type: KeyboardType, showLangBtn: boolean): {
    default: string[];
    shift: string[];
} | undefined;
export declare const LayoutDisplay: {
    "{bksp}": string;
    "{enter}": string;
    "{caps}": string;
    "{shift}": string;
    "{shifted}": string;
    "{space}": string;
    "{lang}": string;
};
export declare const NumpadButtonTheme: {
    class: string;
    buttons: string;
}[];
