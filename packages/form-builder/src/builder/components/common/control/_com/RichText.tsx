"use client"
import type React from "react"
import { useRef, useEffect, useState } from "react"
import { IconBold, IconItalic, IconUnderline, IconStrikethrough, IconList, IconListNumbers, IconIndentIncrease, IconIndentDecrease, IconLink, IconCode, IconTrash } from "../../../../icons";

interface RichEditorProps {
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
}

const RichEditor = ({ value = "", onChange, placeholder = "Type / for menu" }: RichEditorProps) => {
    const editorRef = useRef<HTMLDivElement>(null)
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
    const [linkUrl, setLinkUrl] = useState("")

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value
        }
    }, [value])

    // Add CSS for lists to the document head
    useEffect(() => {
        const styleElement = document.createElement("style")
        styleElement.textContent = `
      [contenteditable] ul {
        list-style-type: disc;
        margin-left: 20px;
        padding-left: 10px;
      }
      
      [contenteditable] ol {
        list-style-type: decimal;
        margin-left: 20px;
        padding-left: 10px;
      }
      
      [contenteditable] li {
        margin: 4px 0;
      }
      
      [contenteditable] ul ul {
        list-style-type: circle;
      }
      
      [contenteditable] ul ul ul {
        list-style-type: square;
      }
    `
        document.head.appendChild(styleElement)

        return () => {
            document.head.removeChild(styleElement)
        }
    }, [])

    const handleInput = () => {
        if (editorRef.current) {
            onChange?.(editorRef.current.innerHTML)
        }
    }

    const execCommand = (command: string, value?: string) => {
        // Ensure the editor is focused before executing command
        if (editorRef.current) {
            editorRef.current.focus()

            // For list commands, we need to handle them specially
            if (command === "insertUnorderedList" || command === "insertOrderedList") {
                // Save the current selection
                const selection = window.getSelection()
                if (selection && selection.rangeCount > 0) {
                    // Execute the command
                    document.execCommand(command, false, value)

                    // Trigger input event to update state
                    setTimeout(() => {
                        handleInput()
                    }, 10)
                } else {
                    // If no selection, create one at the end
                    const range = document.createRange()
                    range.selectNodeContents(editorRef.current)
                    range.collapse(false)
                    selection?.removeAllRanges()
                    selection?.addRange(range)

                    document.execCommand(command, false, value)
                    setTimeout(() => {
                        handleInput()
                    }, 10)
                }
            } else {
                document.execCommand(command, false, value)
                handleInput()
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Handle keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case "b":
                    e.preventDefault()
                    execCommand("bold")
                    break
                case "i":
                    e.preventDefault()
                    execCommand("italic")
                    break
                case "u":
                    e.preventDefault()
                    execCommand("underline")
                    break
            }
        }
    }

    const insertLink = () => {
        if (linkUrl) {
            execCommand("createLink", linkUrl)
            setIsLinkModalOpen(false)
            setLinkUrl("")
        }
    }

    const clearContent = () => {
        if (editorRef.current) {
            editorRef.current.innerHTML = ""
            onChange?.("")
            editorRef.current.focus()
        }
    }

    const formatButtons = [
        { icon: IconBold, command: "bold", title: "Bold (Ctrl+B)" },
        { icon: IconItalic, command: "italic", title: "Italic (Ctrl+I)" },
        { icon: IconUnderline, command: "underline", title: "Underline (Ctrl+U)" },
        { icon: IconStrikethrough, command: "strikeThrough", title: "Strikethrough" },
    ]

    const listButtons = [
        { icon: IconList, command: "insertUnorderedList", title: "Bullet List" },
        { icon: IconListNumbers, command: "insertOrderedList", title: "Numbered List" },
    ]

    const indentButtons = [
        { icon: IconIndentIncrease, command: "indent", title: "Indent" },
        { icon: IconIndentDecrease, command: "outdent", title: "Outdent" },
    ]

    return (
        <div className="w-full rounded-xl border border-solid border-gray-200">
            {/* Toolbar */}
            <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-200 flex-wrap">
                {/* Text formatting */}
                {formatButtons.map((button, index) => (
                    <button
                        key={index}
                        onClick={() => execCommand(button.command)}
                        className="p-2 text-heading hover:bg-gray-100 rounded transition-colors"
                        title={button.title}
                    >
                        <button.icon className="w-4 h-4" />
                    </button>
                ))}

                <div className="w-px h-6 bg-gray-200 mx-1" />

                {/* Lists */}
                {listButtons.map((button, index) => (
                    <button
                        key={index}
                        onClick={() => execCommand(button.command)}
                        className="p-2 text-heading hover:bg-gray-100 rounded transition-colors"
                        title={button.title}
                    >
                        <button.icon className="w-4 h-4" />
                    </button>
                ))}

                <div className="w-px h-6 bg-gray-200 mx-1" />

                {/* Indent */}
                {indentButtons.map((button, index) => (
                    <button
                        key={index}
                        onClick={() => execCommand(button.command)}
                        className="p-2 text-heading hover:bg-gray-100 rounded transition-colors"
                        title={button.title}
                    >
                        <button.icon className="w-4 h-4" />
                    </button>
                ))}

                {/* Link */}
                <button
                    onClick={() => setIsLinkModalOpen(true)}
                    className="p-2 text-heading hover:bg-gray-100 rounded transition-colors"
                    title="Insert Link"
                >
                    <IconLink className="w-4 h-4" />
                </button>

                {/* Code */}
                <button
                    onClick={() => execCommand("formatBlock", "pre")}
                    className="p-2 text-heading hover:bg-gray-100 rounded transition-colors"
                    title="Code Block"
                >
                    <IconCode className="w-4 h-4" />
                </button>

                {/* Clear */}
                <button
                    onClick={clearContent}
                    className="p-2 text-heading hover:bg-gray-100 rounded transition-colors"
                    title="Clear All Content"
                >
                    <IconTrash className="w-4 h-4" />
                </button>
            </div>

            {/* Link Modal */}
            {isLinkModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 w-80 shadow-lg">
                        <h3 className="text-heading font-medium mb-3">Insert Link</h3>
                        <input
                            type="url"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="Enter URL"
                            className="w-full p-2 bg-white text-heading rounded border border-gray-200 outline-none focus:border-builder"
                            autoFocus
                        />
                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={insertLink}
                                className="px-3 py-1 bg-builder text-white rounded hover:bg-builder transition-colors"
                            >
                                Insert
                            </button>
                            <button
                                onClick={() => {
                                    setIsLinkModalOpen(false)
                                    setLinkUrl("")
                                }}
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Editor */}
            <div className="relative flex-1">
                <div
                    ref={editorRef}
                    contentEditable
                    className="w-full p-4 text-heading bg-transparent outline-none resize-none min-h-[200px]"
                    style={{
                        wordWrap: "break-word",
                        whiteSpace: "pre-wrap",
                    }}
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                    data-placeholder={placeholder}
                    suppressContentEditableWarning={true}
                />
                {/* Placeholder */}
                {!value && <div className="absolute top-4 left-4 text-gray-500 pointer-events-none">{placeholder}</div>}
            </div>
        </div>
    )
}

export default RichEditor;
