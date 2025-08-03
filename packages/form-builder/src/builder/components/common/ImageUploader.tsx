"use client"
import { useState, useEffect } from "react";
import { ImageUpload, ImageType } from "@siamf/upload";
import { IconPhoto, IconTrash } from "../../icons";

//Components
import { Loading } from "./Loading";

//Storing
import { useEditor } from "../../context/editor.context";

//Interface
type ValueTypes = { url: string, alt: string }
interface Props {
    onChange?: (e: ValueTypes) => void;
    value?: ValueTypes;
}

export const ImageUploader = ({ value, onChange }: Props) => {
    //State
    const [image, setImage] = useState<ImageType>(null);
    const [url, setUrl] = useState<string | null>(value?.url || null);
    const [isPending, setPending] = useState<boolean>(false);
    const [errorMessage, setError] = useState<string>("");
    const [alt, setAlt] = useState<string>(value?.alt || "");
    const { onUpload, onCloudDelete } = useEditor();

    //Handler
    const onImageChange = async (image: ImageType) => {
        setError("");
        if (!onUpload) {
            setError("Please initialize onUpload Function to upload image on self hosted cloud");
            return;
        }
        setImage(image)
        if (image?.file) {
            try {
                setPending(true);
                const url = await onUpload(image.file);
                setUrl(url);
                setImage({ dataURL: url || undefined });
            } catch {
                setError("Something went wrong");
                setPending(false)
            } finally {
                setPending(false)
            }
        }
    }

    //Handler
    const onImageDelete = async () => {
        setImage(null);
        setUrl(null);
        if (value?.url) {
            onCloudDelete?.(value.url);
        }
    }

    //Effect
    useEffect(() => {
        setUrl(value?.url || null);
        setImage({ dataURL: url || undefined });
        setAlt(value?.alt || "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <div>
            <ImageUpload
                onChange={onImageChange}
                value={image}
            >
                {({
                    isDragging,
                    dragProps,
                    onImageUpload
                }) => (
                    <div>
                        <div className={`border overflow-hidden border-dashed w-full h-[240px] rounded-xl relative ${isDragging ? "border-success" : "border-stroke"}`} {...dragProps}>
                            {!image?.dataURL &&
                                <div className="cursor-pointer select-none text-center px-12 sm:px-12 xxs:px-2 flex items-center justify-center w-full h-full" onClick={onImageUpload}>
                                    <div className="pointer-events-none">
                                        <IconPhoto className="text-builder mx-auto" size={50} stroke={1.5} />
                                        <p className="mt-4 text-base">Drag &apos;n&apos; drop image here, or <span className={`${isDragging ? "text-success" : "text-builder"} underline`}>click</span> to select image</p>
                                    </div>
                                </div>
                            }
                            {image?.dataURL &&
                                <div className="relative w-full h-full">
                                    <img src={image.dataURL} width={1000} height={1000} alt="Selected Image" className="object-contain w-full h-full" />
                                    {!isPending &&
                                        <Buttons
                                            onDeleteClick={onImageDelete}
                                            onChangeClick={onImageUpload}
                                        />
                                    }
                                </div>
                            }
                            {isPending &&
                                <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center">
                                    <Loading className="stroke-white" size={35} />
                                </div>
                            }
                        </div>
                    </div>
                )}
            </ImageUpload>
            {errorMessage &&
                <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            }
            {url &&
                <div className="mt-4">
                    <input
                        placeholder="Alt Text"
                        className="focus:outline-none border border-solid border-gray-300 px-3 py-2 rounded-lg w-full"
                        value={alt}
                        onChange={(e) => setAlt(e.target.value)}
                    />
                    <button className="bg-builder w-full mt-2.5 py-2 rounded-lg text-white" onClick={() => onChange?.({ url, alt })}>
                        Insert Image
                    </button>
                </div>
            }
        </div>
    );
};


//Interface
interface ButtonProps {
    onDeleteClick?: () => void;
    onChangeClick?: () => void;
}

const Buttons = ({ onChangeClick, onDeleteClick }: ButtonProps) => {
    return (
        <div className="flex gap-2 absolute bottom-4 right-4">
            <button className="bg-builder text-white py-2 px-4 rounded-md" onClick={onChangeClick} type="button">
                Change Image
            </button>
            <button className="border border-solid border-secondary-text/50 bg-white px-2 rounded-md text-error" onClick={onDeleteClick} type="button">
                <IconTrash />
            </button>
        </div>
    )
}