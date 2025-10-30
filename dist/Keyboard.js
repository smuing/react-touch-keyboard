import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useState } from "react";
import KeyboardReact from "react-simple-keyboard";
import * as hangul from "hangul-js";
import { getCustomKeyboardLayout, LayoutDisplay, NumpadButtonTheme } from "./keyboardLayout";
import "./_Keyboard.scss";
export var Keyboard = function (_a) {
    var key = _a.key, onChange = _a.onChange, type = _a.type, _b = _a.disableLanguageSwitch, disableLanguageSwitch = _b === void 0 ? false : _b, onEnter = _a.onEnter, _c = _a.initCaps, initCaps = _c === void 0 ? false : _c, keyboardRef = _a.keyboardRef;
    var _d = useState(type), language = _d[0], setLanguage = _d[1];
    var layout = useMemo(function () { return getCustomKeyboardLayout(language, !disableLanguageSwitch); }, [language, disableLanguageSwitch]);
    var _e = useState("default"), layoutName = _e[0], setLayoutName = _e[1];
    var _f = useState(initCaps), isCaps = _f[0], setIsCaps = _f[1];
    var handleKeyPress = useCallback(function (key) {
        if (key === "")
            return;
        // 엔터
        if (key === "{enter}") {
            return;
        }
        // 쉬프트
        if (key === "{shift}") {
            setLayoutName("shift");
            return;
        }
        if (key === "{shifted}") {
            if (isCaps)
                return;
            setLayoutName("default");
            return;
        }
        // 캡스
        if (key === "{caps}") {
            setLayoutName(isCaps ? "default" : "shift");
            setIsCaps(!isCaps);
            return;
        }
        // 한 / 영
        if (key === "{lang}") {
            if (disableLanguageSwitch)
                return;
            setLanguage(function (prev) { return (prev === "ko" ? "en" : "ko"); });
            return;
        }
    }, [disableLanguageSwitch, isCaps, onChange]);
    var handleKeyReleased = useCallback(function (key) {
        // 입력 후 쉬프트 해제
        if (!["{shift}", "{shifted}", "{caps}", "{lang}", "{bksp}", "{space}"].includes(key) && !isCaps) {
            setLayoutName("default");
        }
        // 엔터
        if (key === "{enter}") {
            onEnter();
            return;
        }
    }, [isCaps]);
    var handleOnChange = useCallback(function (input) {
        // 한글 자음, 모음 조합 (화면에 보이는 값만)
        var result = hangul.assemble(hangul.disassemble(input));
        onChange(result);
    }, [onChange]);
    useEffect(function () {
        setLayoutName(!initCaps ? "default" : "shift");
    }, [initCaps]);
    return (_jsx(KeyboardReact, { keyboardRef: function (r) {
            if (keyboardRef)
                keyboardRef.current = r;
        }, theme: "custom-keyboard custom-keyboard--".concat(type), layoutName: layoutName, layout: layout, display: LayoutDisplay, onKeyPress: handleKeyPress, onChange: handleOnChange, onKeyReleased: handleKeyReleased, buttonTheme: type === "numpad" ? NumpadButtonTheme : undefined }, key));
};
