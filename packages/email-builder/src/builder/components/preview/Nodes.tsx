"use client"
import { Fragment } from "react";

//Types
import { NodesBlockTypes, ContainerBlockTypes, HeadingBlockTypes, TextBlockTypes, ButtonBlockTypes, ImageBlockTypes, DividerBlockTypes, SpacerBlockTypes, IconBlockTypes, HtmlBlockTypes } from "../../types/context/design.types";

//Components
import InnerContainer from "./InnerContainer";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Button from "./Button";
import Image from "./Image";
import Divider from "./Divider";
import Spacer from "./Spacer";
import Icons from "./Icons";
import Html from "./Html";


//Interface
interface Props {
    nodes: NodesBlockTypes[];
}

const Nodes = ({ nodes }: Props) => {

    return nodes.map((node) => (
        <Fragment key={node.id}>
            {node.type === "container" && (
                <InnerContainer item={node as ContainerBlockTypes}>
                    {(node as ContainerBlockTypes).nodes &&
                        <Nodes nodes={(node as ContainerBlockTypes).nodes} />
                    }
                </InnerContainer>
            )}
            {node.type === "heading" && <Heading item={node as HeadingBlockTypes} />}
            {node.type === "text" && <Paragraph item={node as TextBlockTypes} />}
            {node.type === "button" && <Button item={node as ButtonBlockTypes} />}
            {node.type === "image" && <Image item={node as ImageBlockTypes} />}
            {node.type === "divider" && <Divider item={node as DividerBlockTypes} />}
            {node.type === "spacer" && <Spacer item={node as SpacerBlockTypes} />}
            {node.type === "icon" && <Icons item={node as IconBlockTypes} />}
            {node.type === "html" && <Html item={node as HtmlBlockTypes} />}
        </Fragment>
    ));
};

export default Nodes;