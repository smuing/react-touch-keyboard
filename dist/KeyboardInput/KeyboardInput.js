var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Keyboard } from "../Keyboard";
import "./_KeyboardInput.scss";
import * as hangul from "hangul-js";
export var KeyboardInput = function (_a) {
    var _b = _a.className, className = _b === void 0 ? "" : _b, value = _a.value, onChange = _a.onChange, onEnter = _a.onEnter, type = _a.type, enabled = _a.enabled, _c = _a.disableLanguageSwitch, disableLanguageSwitch = _c === void 0 ? false : _c;
    var _d = useState(true), isOpen = _d[0], setIsOpen = _d[1];
    // 키보드 위치 style 객체
    var _e = useState({}), position = _e[0], setPosition = _e[1];
    var keyboardContainerRef = useRef(null);
    var triggerRef = useRef(null);
    var inputRef = useRef(null);
    var keyboardRef = useRef(null);
    var handleOpen = function () {
        if (!enabled)
            return;
        setIsOpen(true);
        // 키보드 value 한글 자음, 모음 조합
        if (keyboardRef.current) {
            keyboardRef.current.setInput(hangul.assemble(hangul.disassemble(value)));
        }
    };
    var handleClose = function () {
        onEnter === null || onEnter === void 0 ? void 0 : onEnter();
        setIsOpen(false);
    };
    var handleOnChange = function (value) {
        onChange(value);
    };
    var handleOnChangeInput = function (event) {
        var input = event.target.value;
        onChange(input);
        // 키보드 value
        if (keyboardRef.current) {
            keyboardRef.current.setInput(input);
        }
    };
    useEffect(function () {
        if (isOpen && keyboardContainerRef.current && triggerRef.current) {
            var tooltipEl = keyboardContainerRef.current;
            var triggerEl = triggerRef.current;
            var tooltipRect = tooltipEl.getBoundingClientRect();
            var triggerRect = triggerEl.getBoundingClientRect();
            var padding = 8;
            // 기본 위치: 아래
            var top_1 = triggerRect.bottom + padding;
            var left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
            // 화면 넘침 방지 (좌우)
            if (left < padding) {
                left = padding;
            }
            else if (left + tooltipRect.width > window.innerWidth - padding) {
                left = window.innerWidth - tooltipRect.width - padding;
            }
            // 아래 공간이 부족한 경우 위로 표시
            if (top_1 + tooltipRect.height > window.innerHeight - padding) {
                top_1 = triggerRect.top - tooltipRect.height - padding;
            }
            setPosition({
                top: "".concat(top_1, "px"),
                left: "".concat(left, "px"),
            });
        }
        // 키보드 value 초기값 세팅
        if (isOpen && keyboardRef.current) {
            keyboardRef.current.setInput(value);
        }
    }, [isOpen]);
    useEffect(function () {
        return function () {
            setIsOpen(false);
        };
    }, []);
    return (_jsxs("div", __assign({ className: "inline-keyboard__trigger-wrap", ref: triggerRef }, { children: [_jsx("input", { className: className, ref: inputRef, value: value, onChange: handleOnChangeInput, disabled: !enabled, inputMode: "none", onFocus: handleOpen }), isOpen && (_jsx("div", __assign({ className: "inline-keyboard__container", ref: keyboardContainerRef, style: position }, { children: _jsx(Keyboard, { keyboardRef: keyboardRef, onChange: handleOnChange, type: type, disableLanguageSwitch: disableLanguageSwitch, onEnter: handleClose }) })))] })));
};
