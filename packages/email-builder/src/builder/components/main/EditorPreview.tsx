"use client"
import { render } from "../../utils/_build/root.build";
import { useEditor } from "../../context/editor.context";

const EditorPreview = () => {
    //Editor
    const { design } = useEditor();

    const html = render(design.value)

    return (
        <div style={{ background: design.value.background }} className="h-[calc(100vh-55px)] overflow-auto">
            <div dangerouslySetInnerHTML={{ __html: html || "" }} />
        </div>
    );
};

export default EditorPreview;