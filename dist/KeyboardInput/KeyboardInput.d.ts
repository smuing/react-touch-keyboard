import "./_KeyboardInput.scss";
import type { KeyboardType } from "../keyboardLayout";
export interface KeyboardInputProps {
    className?: string;
    value: string;
    onChange: (value: string) => void;
    onEnter?: () => void;
    type: KeyboardType;
    enabled: boolean;
    disableLanguageSwitch?: boolean;
}
export declare const KeyboardInput: ({ className, value, onChange, onEnter, type, enabled, disableLanguageSwitch, }: KeyboardInputProps) => import("react/jsx-runtime").JSX.Element;
