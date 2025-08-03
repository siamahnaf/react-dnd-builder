"use client"
import { Fragment } from "react";

//Editor
import { useEditor } from "../../context/editor.context";

//Components
import EditorDesign from "./EditorDesign";
import EditorLogic from "./EditorLogic";
import EditorPreview from "./EditorPreview";
import EditorSubmission from "./EditorSubmission";
import EditorQuiz from "./EditorQuiz";
import EditorEmbed from "./EditorEmbed";

const EditorMain = () => {
    //Editor
    const { header } = useEditor();

    return (
        <Fragment>
            {header.value === "design" && <EditorDesign />}
            {header.value === "logic" && <EditorLogic />}
            {header.value === "preview" && <EditorPreview />}
            {header.value === "submission" && <EditorSubmission />}
            {header.value === "quiz_mode" && <EditorQuiz />}
            {header.value === "embed" && <EditorEmbed />}
        </Fragment>
    );
};

export default EditorMain;