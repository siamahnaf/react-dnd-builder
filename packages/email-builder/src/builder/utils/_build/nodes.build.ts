import { RenderFragmentTypes } from "./_helpers/renderer.types";
import { ContainerBlockTypes, NodesBlockTypes, HeadingBlockTypes, TextBlockTypes, ButtonBlockTypes, ImageBlockTypes, DividerBlockTypes, SpacerBlockTypes, IconBlockTypes, HtmlBlockTypes } from "../../types/context/design.types";

//Builder Functions
import { renderContainer } from "./container.build";
import { renderHeading } from "./heading.build";
import { renderText } from "./text.build";
import { renderButton } from "./button.build";
import { renderImage } from "./image.build";
import { renderDivider } from "./divider.build";
import { renderSpacer } from "./spacer.build";
import { renderIcon } from "./icon.build";
import { renderHtml } from "./html.build";

export const renderNodes = (nodes: NodesBlockTypes[]): RenderFragmentTypes[] => {
    return nodes.map((node) => {
        if (node.type === "container") {
            return renderContainer(node as ContainerBlockTypes)
        }
        if (node.type === "heading") {
            return renderHeading(node as HeadingBlockTypes)
        }
        if (node.type === "text") {
            return renderText(node as TextBlockTypes)
        }
        if (node.type === "button") {
            return renderButton(node as ButtonBlockTypes)
        }
        if (node.type === "image") {
            return renderImage(node as ImageBlockTypes)
        }
        if (node.type === "divider") {
            return renderDivider(node as DividerBlockTypes)
        }
        if (node.type === "spacer") {
            return renderSpacer(node as SpacerBlockTypes)
        }
        if (node.type === "icon") {
            return renderIcon(node as IconBlockTypes)
        }
        if (node.type === "html") {
            return renderHtml(node as HtmlBlockTypes)
        }
        return {
            html: "",
            formateTabletStyles: "",
            formateMobileStyles: "",
            customStyles: ""
        }
    })
}