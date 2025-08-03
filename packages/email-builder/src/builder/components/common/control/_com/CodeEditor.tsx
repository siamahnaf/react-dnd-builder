"use client";
import Editor from "@monaco-editor/react";

//Interface
interface Props {
    label?: string;
    lang?: string;
    value?: string;
    onChange?: (e: string) => void;
}

const CodeEditor = ({ label = "Add your custom css", lang = "css", value, onChange }: Props) => {
    return (
        <div>
            <h4 className="text-sm text-gray-500 mb-3">
                {label}
            </h4>
            <div className="overflow-hidden rounded-md">
                <Editor
                    height="200px"
                    defaultLanguage={lang}
                    value={value}
                    onChange={(val) => onChange?.(val || "")}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        lineNumbers: "off",
                        glyphMargin: false,
                        folding: false,
                        padding: { bottom: 4, top: 4 },
                        scrollbar: {
                            vertical: "hidden",
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default CodeEditor;