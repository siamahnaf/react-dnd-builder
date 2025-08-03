"use client"
import { EmailBuilder, DesignData } from "@siamahnaf/react-email-builder";
import "@siamahnaf/react-email-builder/dist/styles.css";
import toast from "react-hot-toast";
import { upload } from "@vercel/blob/client";

const EmailBuilderPreview = () => {
    //Handler
    const onSave = (data: DesignData) => {
        console.log(data);
        toast.success("Exported data has been consoled successfully");
    }

    return (
        <EmailBuilder
            logo={{
                url: "/logo.svg",
                width: "138px",
                backURl: "/"
            }}
            onSave={onSave}
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
        />
    );
};

export default EmailBuilderPreview;