"use client"
import { useState } from "react";
import { Dialog } from "../common/Dialog";
import { Loading } from "../common/Loading";
import { toBlob } from "html-to-image";

//Essentials
import { render } from "../../utils/_build/root.build";
import { useEditor } from "../../context/editor.context";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
}

const LoadingDialog = ({ open, onClose }: Props) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [name, setName] = useState<string>("Untitled Template Name");

    //Store
    const { onSave, design, onUpload, showBtnLoading, enableImgOnSave } = useEditor();

    //Handler
    const blobToFile = (blob: Blob, name = `preview-${Date.now()}.png`) =>
        new File([blob], name, { type: blob.type || "image/png" });

    const onSaveData = async () => {
        setStatus("Starting to build HTML and Design File")
        if (design.value.rows.length === 0) {
            setError("Please add some designs");
            return;
        }
        const data = {
            html: render(design.value),
            json: design.value,
            image: "",
            name: name
        }

        if (onUpload !== null && enableImgOnSave) {
            try {
                setLoading(true);
                setStatus("Building screenshot & uploading to Cloud");
                const el = document.getElementById("email-builder-main-preview-wrap");
                if (!el) {
                    setError("Preview element not found")
                    return;
                };
                const blob = await toBlob(el, {
                    backgroundColor: "#FFFFFF",
                    filter: node => node.tagName !== "LINK",
                    includeQueryParams: true
                });
                if (!blob) {
                    setError("Failed to generate blob");
                    return;
                };
                const file = blobToFile(blob);
                const url = await onUpload(file);
                data.image = url || "";
                setError("");
            } catch {
                setError("Something went wrong when trying to build image");
            } finally {
                setLoading(false)
            }
        }
        onSave?.(data);
    }

    return (
        <Dialog
            open={open}
            onClose={(isLoading || showBtnLoading) ? () => { } : onClose}
            className="w-[400px] px-7 py-7"
        >
            <div className="text-center">
                <h4 className="text-3xl font-semibold mb-4">Save Template</h4>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-solid border-gray-200 py-2 px-3 w-full rounded-md focus:outline-builder"
                />
                <p className="text-left text-sm italic font-light mt-2">Note: Change the name if need!</p>
                {status && !error &&
                    <p className="text-left font-light text-green-600 mt-4">{status}</p>
                }
                {error &&
                    <p className="text-left font-light text-red-600 mt-4">{error}</p>
                }
                <div className="flex justify-center gap-4 mt-8">
                    <button className="flex-1 text-builder border border-builder rounded-md py-2" onClick={onClose} disabled={isLoading || showBtnLoading}>
                        Cancel
                    </button>
                    <button className="flex-1 bg-builder text-white py-2 rounded-md relative" disabled={isLoading || showBtnLoading} onClick={onSaveData}>
                        <span className={`${(isLoading || showBtnLoading) && "opacity-20"}`}>Save Now</span>
                        {(isLoading || showBtnLoading) &&
                            <div className="absolute top-1/2 left-1/2 -translate-1/2">
                                <Loading className="stroke-white" />
                            </div>
                        }
                    </button>
                </div>
            </div>
        </Dialog>
    );
};

export default LoadingDialog;