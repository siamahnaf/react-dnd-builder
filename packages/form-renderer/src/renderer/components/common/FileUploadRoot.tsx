"use client";
import { ChangeEvent, useRef, useCallback, useState, DragEvent } from "react";
import { IconPhotoFilled, IconFolderFilled, IconCamera, IconTrash } from "../../icons";
import { useEditor } from "../../context/editor.context";
import { TFileUpload } from "../../types/elements";
import { openFileDialog } from "./file-upload/utils";

type ImageErrorTypes = {
    maxFileSize: boolean;
    acceptType: boolean;
    resolution: boolean;
}

interface FileProps {
    name: string;
    ext: string;
    url: string;
    type: "img" | "file"
}

interface Props {
    value?: FileProps[];
    onChange?: (value: FileProps[]) => void;
    item: TFileUpload;
    isReadOnly: boolean;
}

const FileUploadRoot = ({ item, value, onChange, isReadOnly }: Props) => {
    //Editor
    const { settings, onUpload, onCloudDelete } = useEditor();
    const { general } = item;
    const { theme } = settings;
    //State
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [errors, setErrors] = useState<ImageErrorTypes>({ acceptType: false, maxFileSize: false, resolution: false });
    const [loading, setLoading] = useState<boolean>(false);
    //Ref
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Helper function to determine file accept types
    const getFileAcceptTypes = () => {
        if (general?.type === "img") {
            // For image type
            if (!general.fileAcceptType) {
                // If no fileAcceptType provided, accept all image types
                return "image/*";
            }

            // Check if the provided fileAcceptType contains valid image types
            const imageTypes = ["image/jpeg", "image/png", "image/gif", "image/bmp", "image/webp", "image/svg+xml"];
            const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".svg"];

            const acceptTypes = general.fileAcceptType.split(",").map(type => type.trim().toLowerCase());
            const hasValidImageType = acceptTypes.some(type =>
                imageTypes.includes(type) ||
                imageExtensions.some(ext => type === ext || type.endsWith(ext))
            );

            return hasValidImageType ? general.fileAcceptType : "image/*";
        } else {
            // For file type
            return general?.fileAcceptType || "/*";
        }
    };

    // Get the appropriate file accept type
    const fileAcceptType = getFileAcceptTypes();

    // Helper function to parse file size string to bytes
    const parseFileSize = (size: string | undefined): number => {
        return (Number(size) || 5) * 1024 * 1024;
    };

    // Helper function to get image dimensions
    const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                URL.revokeObjectURL(img.src);
                resolve({ width: img.width, height: img.height });
            };
            img.onerror = () => {
                URL.revokeObjectURL(img.src);
                reject(new Error("Failed to load image"));
            };
        });
    };

    //Central File Processing
    const handleChange = async (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) return;
        setLoading(true);
        setErrors({ acceptType: false, maxFileSize: false, resolution: false });
        // Convert FileList to array
        const files = Array.from(fileList);
        // Check if we exceed multiple limit
        if (!general?.multiple && files.length > 1) {
            files.splice(1);
        }
        // Process each file
        const processedFiles: FileProps[] = [];
        let hasError = false;
        for (const file of files) {
            // Check file type
            const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
            const acceptedTypes = fileAcceptType.split(",").map(type => type.trim().toLowerCase());
            const isAcceptedType = acceptedTypes?.some(type => {
                if (type.startsWith(".")) {
                    return `.${fileExtension}` === type;
                }
                if (type.includes("/*")) {
                    const category = type.split("/*")[0];
                    return file.type.startsWith(category);
                }
                return file.type === type;
            });
            if (!isAcceptedType) {
                setErrors(prev => ({ ...prev, acceptType: true }));
                hasError = true;
                continue;
            }
            // Check file size
            const maxSizeInBytes = parseFileSize(general?.maxFileSize);
            if (file.size > maxSizeInBytes) {
                setErrors(prev => ({ ...prev, maxFileSize: true }));
                hasError = true;
                continue;
            }
            // For images, check resolution
            if (general?.type === "img") {
                try {
                    if (general.imageWidth && general.imageHeight) {
                        const dimensions = await getImageDimensions(file);
                        const requiredWidth = parseInt(general.imageWidth);
                        const requiredHeight = parseInt(general.imageHeight);
                        if (dimensions.width !== requiredWidth || dimensions.height !== requiredHeight) {
                            setErrors(prev => ({ ...prev, resolution: true }));
                            hasError = true;
                            continue;
                        }
                    }
                } catch {
                    setErrors(prev => ({ ...prev, resolution: true }));
                    hasError = true;
                    continue;
                }
            }
            // If all checks pass, create a URL for preview
            if (onUpload) {
                const url = await onUpload(file);
                processedFiles.push({
                    name: file.name,
                    ext: fileExtension,
                    url,
                    type: (general?.type as "img") || "img"
                });
            }
        }
        setLoading(false);
        // If no errors, update the files
        if (!hasError && processedFiles.length > 0) {
            // If we"re replacing existing files (not multiple), clear the old ones
            const newFiles = general?.multiple ? [...(value || []), ...processedFiles] : processedFiles;
            onChange?.(newFiles);
        }
    }

    //Handler
    const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        await handleChange(e.target.files);
        if (inputRef.current) inputRef.current.value = "";
    }

    //Handler Helpers
    const handleClickInput = useCallback(() => openFileDialog(inputRef), [
        inputRef,
    ]);
    const onFileUpload = useCallback((): void => {
        handleClickInput();
    }, [handleClickInput]);
    const handleDrag = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDragIn = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    };
    const handleDragOut = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleChange(e.dataTransfer.files);
        }
    };
    const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.clearData();
    };
    const handleCameraUpload = useCallback(() => {
        if (inputRef.current) {
            // Set the accept attribute to only capture from camera
            inputRef.current.accept = "image/*;capture=camera";
            openFileDialog(inputRef);
            // Reset accept attribute back to original value
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.accept = fileAcceptType;
                }
            }, 1000);
        }
    }, [fileAcceptType]);
    const handleRemoveFile = useCallback((index: number) => {
        if (!value) return;
        const newFiles = [...value];
        const removedFile = newFiles[index];
        newFiles.splice(index, 1);
        onChange?.(newFiles);
        // If there"s a cloud delete function, call it
        if (onCloudDelete) {
            onCloudDelete(removedFile.url);
        }
    }, [value, onChange, onCloudDelete]);

    return (
        <div>
            <style jsx>{`
                .BorderColor {
                    border-color: ${theme?.fieldBorderColor};
                }
                .TextColor {
                    color: ${theme?.fieldTextColor};
                }
                .ThemeColor {
                    color: ${theme?.accentBgColor};
                }
            `}</style>
            <input
                type="file"
                className="hidden"
                accept={fileAcceptType}
                multiple={general?.multiple}
                onChange={onInputChange}
                ref={inputRef}
            />
            <div
                onDrop={handleDrop}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDragStart={handleDragStart}
                className={`border border-dashed px-4 py-12 text-center rounded-lg BorderColor TextColor ${isReadOnly ? "pointer-events-none" : ""} ${isDragging ? "bg-gray-100" : ""}`}
            >
                <p className="opacity-90">
                    {general?.placeholderText || "Drag and drop or select file here"}
                </p>
                {general?.type === "img" &&
                    <div className="flex gap-x-1 justify-center mt-3">
                        {general.sourceType !== "camera" &&
                            <button className="ThemeColor flex items-center gap-x-1 hover:bg-gray-100 py-1 px-2.5 rounded-lg" onClick={onFileUpload}>
                                <IconPhotoFilled size={20} />
                                <span>Select Image</span>
                            </button>
                        }
                        {(general.sourceType === "camera" || general.sourceType === "local-camera") &&
                            <button className="ThemeColor flex items-center gap-x-1 hover:bg-gray-100 py-1 px-2.5 rounded-lg" onClick={handleCameraUpload}>
                                <IconCamera size={21} />
                                <span>Take Photo</span>
                            </button>
                        }
                    </div>
                }
                {general?.type === "file" &&
                    <button className="ThemeColor flex items-center gap-x-1 hover:bg-gray-100 py-1 px-2.5 rounded-lg justify-center mt-3 mx-auto" onClick={onFileUpload}>
                        <IconFolderFilled />
                        <span>Select File</span>
                    </button>
                }
                {loading && <p className="mt-2 text-sm">Uploading files...</p>}
            </div>
            <div className="mt-2">
                {errors.acceptType && (
                    <div className="text-red-500 text-sm">
                        Invalid file type. Please select a {fileAcceptType} file.
                    </div>
                )}
                {errors.maxFileSize && (
                    <div className="text-red-500 text-sm">
                        File size exceeds the maximum limit of {general?.maxFileSize}.
                    </div>
                )}
                {errors.resolution && (
                    <div className="text-red-500 text-sm">
                        Image resolution must be {general?.imageWidth}x{general?.imageHeight} pixels.
                    </div>
                )}
            </div>
            <div className="mt-4">
                {value && value.length > 0 && (
                    <div>
                        <h3 className="text-sm font-medium mb-2 TextColor">
                            {general?.type === "img" ? "Uploaded Images" : "Uploaded Files"}
                        </h3>
                        <div className="space-y-2">
                            {value.map((file, index) => (
                                <div className="flex items-center p-2 border rounded-lg BorderColor" key={index}>
                                    <div className="flex-shrink-0">
                                        {file.type === "img" ? (
                                            <img
                                                src={file.url}
                                                alt={file.name}
                                                className="w-10 h-10 object-cover rounded mr-3"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded mr-3">
                                                <IconFolderFilled size={20} className="TextColor" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 mr-4">
                                        <p className="text-sm truncate font-medium TextColor">{file.name}</p>
                                        <p className="text-xs opacity-75 TextColor">{file.ext.toUpperCase()}</p>
                                    </div>
                                    {!isReadOnly && (
                                        <button
                                            className="text-red-500 hover:text-red-700 flex-shrink-0"
                                            onClick={() => handleRemoveFile(index)}
                                        >
                                            <IconTrash />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUploadRoot;