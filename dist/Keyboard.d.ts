import { MutableRefObject } from "react";
import { type KeyboardType } from "./keyboardLayout";
import "./_Keyboard.scss";
export interface KeyboardInstance {
    setInput(input: string): void;
}
export interface KeyboardProps {
    onChange: (value: string) => void;
    type: KeyboardType;
    disableLanguageSwitch?: boolean;
    onEnter: () => void;
    key?: string;
    initCaps?: boolean;
    keyboardRef?: MutableRefObject<KeyboardInstance | null>;
}
export declare const Keyboard: ({ key, onChange, type, disableLanguageSwitch, onEnter, initCaps, keyboardRef, }: KeyboardProps) => import("react/jsx-runtime").JSX.Element;
