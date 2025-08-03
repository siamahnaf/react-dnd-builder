"use client";
import { useState } from "react";
import { IconCopy, IconCheck } from "../../../icons";

interface PrettyJSXProps {
    code: string;
}

const syntaxRules: { regex: RegExp; className: string }[] = [
    { regex: /(\/\/.*?$)/gm, className: "text-gray-500 italic" },
    { regex: /("[^"]*"|'[^']*'|`[^`]*`)/g, className: "text-rose-600" },
    {
        regex: /\b(import|from|const|return|if|else|function|let|var|new)\b/g,
        className: "text-blue-600 font-medium",
    },
    { regex: /(<\/?[A-Za-z0-9]+(?:\s[^>]*)?>?)/g, className: "text-purple-600" },
    { regex: /([{}()[\]])/g, className: "text-gray-800" },
    { regex: /\b([A-Z][a-zA-Z0-9]*)\b/g, className: "text-green-600" },
    { regex: /(=|;|:|,)/g, className: "text-gray-700" },
];

let globalKeyCounter = 0;

function applyHighlighting(code: string): React.ReactNode[] {
    let nodes: React.ReactNode[] = [code];
    syntaxRules.forEach(({ regex, className }) => {
        const newNodes: React.ReactNode[] = [];
        nodes.forEach((node) => {
            if (typeof node !== "string") {
                newNodes.push(node);
                return;
            }
            let lastIndex = 0;
            const matches = [...node.matchAll(regex)];
            if (matches.length === 0) {
                newNodes.push(node);
                return;
            }
            matches.forEach((match) => {
                const index = match.index!;
                const matchText = match[0];
                if (lastIndex < index) {
                    newNodes.push(node.slice(lastIndex, index));
                }
                newNodes.push(
                    <span key={`match-${globalKeyCounter++}`} className={className}>
                        {matchText}
                    </span>
                );
                lastIndex = index + matchText.length;
            });
            if (lastIndex < node.length) {
                newNodes.push(node.slice(lastIndex));
            }
        });
        nodes = newNodes;
    });

    return nodes;
}

const PrettyJSX = ({ code }: PrettyJSXProps) => {
    //State
    const [copied, setCopied] = useState(false);

    //Handler
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="relative">
            <pre className="bg-[#f8f8f8] text-sm p-4 rounded-xl overflow-x-auto">
                <code className="font-mono whitespace-pre">{applyHighlighting(code)}</code>
            </pre>
            <button className={`absolute top-3 right-3 p-2 rounded-md transition-all duration-300 ${copied ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`} onClick={handleCopy}>
                {copied ? <IconCheck size={20} /> : <IconCopy size={20} />}
            </button>
        </div>
    );
};

export default PrettyJSX;