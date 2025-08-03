"use client"
import { FormBuilder } from "@siamahnaf/react-form-builder";
import "@siamahnaf/react-form-builder/dist/index.css";
import { upload } from "@vercel/blob/client";

const FormBuilderPreview = () => {
    return (
        <FormBuilder
            onUpload={async (file) => {
                const lastDotIndex = file.name.lastIndexOf(".");
                const hasExtension = lastDotIndex !== -1 && lastDotIndex !== 0;
                const ext = hasExtension ? file.name.slice(lastDotIndex + 1) : "";

                const blob = await upload(`${crypto.randomUUID()}.${ext}`, file, {
                    access: "public",
                    handleUploadUrl: "/api/vercel-blob"
                });

                return blob.url
            }}
            onSave={(e) => {
                console.log(e);
            }}
            autoSaveMode
        />
    );
};

export default FormBuilderPreview;