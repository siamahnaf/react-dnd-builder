import { FormRenderer } from "@siamahnaf/react-form-renderer";
import { useEditor } from "../../../../../context/editor.context";

const PreviewBody = () => {
    //Editor
    const { design, settings, selected, onUpload, onCloudDelete } = useEditor();

    return (
        <div>
            <FormRenderer
                design={{
                    pages: design.value.pages,
                    settings: settings.value
                }}
                indexId={selected.value?.id}
                previewMode={true}
                onCloudDelete={onCloudDelete}
                onUpload={onUpload}
                captchaSiteKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            />
        </div>
    );
};

export default PreviewBody;