import { useState } from "react";
import { TDesignPage, TSettings } from "@siamahnaf/react-form-renderer";
import { IconCopy, IconCheck } from "../../../icons";

//Interface
interface Props {
    data: {
        pages: TDesignPage[];
        settings: TSettings;
    }
}

const PrettyJson = ({ data }: Props) => {
    //State
    const [copied, setCopied] = useState(false);

    //Highlighting
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const syntaxHighlight = (json: any) => {
        if (typeof json !== "string") json = JSON.stringify(json, null, 2);
        json = json
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        return json.replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(?:\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            (match: string) => {
                let className = "text-blue-400";
                if (/^"/.test(match)) {
                    className = /:$/.test(match) ? "text-pink-400" : "text-green-600";
                } else if (/true|false/.test(match)) {
                    className = "text-purple-400";
                } else if (/null/.test(match)) {
                    className = "text-yellow-600";
                }
                return `<span class="${className}">${match}</span>`;
            }
        );
    };

    //Handler
    const handleCopy = () => {
        navigator.clipboard.writeText(
            `export const json = ${JSON.stringify(data, null, 2)}`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="relative">
            <pre className="bg-[#f8f8f8] text-sm p-4 rounded-xl overflow-x-auto whitespace-pre-wrap">
                <code>export const json ={" "}</code>
                <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(data) }} />
            </pre>
            <button className={`absolute top-3 right-3 p-2 rounded-md transition-all duration-300 ${copied ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`} onClick={handleCopy}>
                {copied ? <IconCheck size={20} /> : <IconCopy size={20} />}
            </button>
        </div>
    );
};

export default PrettyJson;
