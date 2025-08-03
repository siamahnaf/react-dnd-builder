"use client";
import React, { useRef, useEffect, useState } from "react";
import { IconBold, IconItalic, IconUnderline, IconStrikethrough, IconList, IconListNumbers, IconIndentIncrease, IconIndentDecrease, IconLink, IconCode, IconTrash } from "../../icons";
import { useEditor } from "../../context/editor.context";
import { TRichText } from "../../types/elements";


interface RichEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    item: TRichText;
    isReadOnly: boolean;
}

const RichEditor = ({ value = "", onChange, item, isReadOnly }: RichEditorProps) => {
    //State
    const editorRef = useRef<HTMLDivElement>(null);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState("");
    const [isEmpty, setIsEmpty] = useState(true);

    //Editor
    const { settings, form } = useEditor();
    const { theme } = settings;
    const { name, general, layout } = item;

    // Sync outside value to DOM
    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
            setIsEmpty(!value || value === "<br>");
        }
    }, [value]);

    const updateContent = () => {
        const html = editorRef.current?.innerHTML || "";
        const text = editorRef.current?.innerText.trim() || "";
        setIsEmpty(!text);
        onChange?.(html);
    };

    const exec = (cmd: string, val?: string) => {
        editorRef.current?.focus();
        document.execCommand(cmd, false, val);
        updateContent();
    };

    const applyFormat = (tag: string, url?: string) => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        if (!selectedText) return;

        const el = document.createElement(tag);
        if (tag === "a" && url) {
            const anchor = el as HTMLAnchorElement;
            anchor.href = url;
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";
        }

        el.innerHTML = selectedText;
        range.deleteContents();
        range.insertNode(el);
        selection.removeAllRanges();
        selection.addRange(range);
        updateContent();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && ["b", "i", "u"].includes(e.key)) {
            e.preventDefault();
            const cmd = e.key === "b" ? "bold" : e.key === "i" ? "italic" : "underline";
            exec(cmd);
        }
    };

    const formatButtons = [
        { icon: IconBold, command: "bold", title: "Bold (Ctrl+B)" },
        { icon: IconItalic, command: "italic", title: "Italic (Ctrl+I)" },
        { icon: IconUnderline, command: "underline", title: "Underline (Ctrl+U)" },
        { icon: IconStrikethrough, command: "strikeThrough", title: "Strikethrough" },
    ];

    //Theme
    const getTheme = () => {
        switch (theme?.theme) {
            case "border":
                return "border border-solid rounded-lg outline-2 outline-transparent";
            case "border-less":
                return "rounded-lg";
            case "underline":
                return "border-b border-solid"
        }
    }

    return (
        <div
            className={`${getTheme()} RichText  ${theme?.theme === "underline" && "RichTextUnderline"}`}
        >
            <style jsx>{`
                .RichText {
                    background: ${theme?.fieldBgColor};
                    border-color: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.fieldBorderColor};
                    width: ${layout?.fieldWidth?.value || 100}${layout?.fieldWidth?.unit || "%"};
                }
                .MainRichEditor {
                    color: ${theme?.fieldTextColor};
                }
                .SeparatorBorder {
                    border-color: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.fieldBorderColor};
                }
                .SeparatorLine {
                    background: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.fieldBorderColor};
                }
                .RichText:focus-within {
                    outline-color: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.accentBgColor};
                }
                .RichTextUnderline:focus-within {
                    box-shadow: ${theme?.accentBgColor} 0px 2px;
                    border-color: transparent;
                }
            `}</style>

            <div className="flex items-center outline-red-50 gap-1 px-3 py-2 border-b flex-wrap SeparatorBorder">
                {formatButtons.map((btn, i) => (
                    <button key={i} onClick={() => exec(btn.command)} title={btn.title}
                        className="p-2 text-heading hover:bg-gray-100 rounded transition-colors">
                        <btn.icon className="w-4 h-4" />
                    </button>
                ))}

                <div className="w-px h-6 SeparatorLine mx-1" />

                <button onClick={() => exec("insertUnorderedList")} className="p-2 hover:bg-gray-100 rounded" title="Bullet List">
                    <IconList className="w-4 h-4" />
                </button>
                <button onClick={() => exec("insertOrderedList")} className="p-2 hover:bg-gray-100 rounded" title="Numbered List">
                    <IconListNumbers className="w-4 h-4" />
                </button>

                <div className="w-px h-6 SeparatorLine mx-1" />

                <button onClick={() => exec("indent")} className="p-2 hover:bg-gray-100 rounded" title="Indent">
                    <IconIndentIncrease className="w-4 h-4" />
                </button>
                <button onClick={() => exec("outdent")} className="p-2 hover:bg-gray-100 rounded" title="Outdent">
                    <IconIndentDecrease className="w-4 h-4" />
                </button>

                <button onClick={() => setIsLinkModalOpen(true)} className="p-2 hover:bg-gray-100 rounded" title="Insert Link">
                    <IconLink className="w-4 h-4" />
                </button>

                <button onClick={() => applyFormat("pre")} className="p-2 hover:bg-gray-100 rounded" title="Code Block">
                    <IconCode className="w-4 h-4" />
                </button>

                <button onClick={() => { exec("selectAll"); exec("delete"); }} className="p-2 hover:bg-gray-100 rounded" title="Clear All">
                    <IconTrash className="w-4 h-4" />
                </button>
            </div>

            {/* Link Modal */}
            {isLinkModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
                    <div className="bg-white p-4 rounded-lg border w-80 shadow-lg">
                        <h3 className="text-heading font-medium mb-3">Insert Link</h3>
                        <input
                            type="url"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="Enter URL"
                            className="w-full p-2 border border-gray-300 rounded outline-none focus:border-builder"
                            autoFocus
                        />
                        <div className="flex gap-2 mt-3">
                            <button onClick={() => { applyFormat("a", linkUrl); setIsLinkModalOpen(false); setLinkUrl(""); }}
                                className="px-3 py-1 bg-builder text-white rounded hover:bg-builder-dark">Insert</button>
                            <button onClick={() => { setIsLinkModalOpen(false); setLinkUrl(""); }}
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Editor */}
            <div className="relative">
                <div
                    ref={editorRef}
                    contentEditable={!isReadOnly}
                    suppressContentEditableWarning
                    className="w-full p-4 text-heading bg-transparent outline-none prose [&_ul]:list-disc [&_ol]:list-decimal [&_ul_li]:ml-5 [&_ol_li]:ml-5 cursor-text MainRichEditor"
                    onInput={updateContent}
                    onKeyDown={handleKeyDown}
                    style={{
                        minHeight: `${general?.minHeight?.value}${general?.minHeight?.unit}`
                    }}
                />
                {isEmpty && (
                    <div className="absolute top-4 left-4 text-gray-500 pointer-events-none">{item.general?.placeholder || "Type / for menu"}</div>
                )}
            </div>
        </div>
    );
};

export default RichEditor;
