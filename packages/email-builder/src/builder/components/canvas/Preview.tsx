"use client"
//Store
import { useEditor } from "../../context/editor.context";

//Preview Component
import Container from "../preview/Container";
import Nodes from "../preview/Nodes";

const Preview = () => {
    //Store
    const { design } = useEditor();

    return (
        <div className="relative select-none" id="email-builder-main-preview-wrap">
            {design.value.rows.map((item, i) => (
                <Container item={item} key={item.id} index={i}>
                    {item.nodes && (
                        <Nodes nodes={item.nodes} />
                    )}
                </Container>
            ))}
        </div>
    );
};

export default Preview;