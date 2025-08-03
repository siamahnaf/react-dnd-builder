import { Dispatch, SetStateAction } from "react";

//Default types
import { containerData } from "../../data/default/container.data";
import { headingData } from "../../data/default/heading.data";
import { textData } from "../../data/default/text.data";
import { buttonData } from "../../data/default/button.data";
import { imageData } from "../../data/default/image.data";
import { dividerData } from "../../data/default/divider.data";
import { spacerData } from "../../data/default/spacer.data";
import { iconData } from "../../data/default/icon.data";
import { htmlData } from "../../data/default/html.data";

//Separate Types
export type ContainerBlockTypes = Omit<typeof containerData, "nodes"> & {
    nodes: NodesBlockTypes[];
};;
export type HeadingBlockTypes = typeof headingData;
export type ButtonBlockTypes = typeof buttonData;
export type TextBlockTypes = typeof textData;
export type ImageBlockTypes = typeof imageData;
export type DividerBlockTypes = typeof dividerData;
export type SpacerBlockTypes = typeof spacerData;
export type IconBlockTypes = typeof iconData;
export type HtmlBlockTypes = typeof htmlData;

export type NodesBlockTypes = ContainerBlockTypes | HeadingBlockTypes | ButtonBlockTypes | TextBlockTypes | ImageBlockTypes | DividerBlockTypes |
    SpacerBlockTypes | IconBlockTypes | HtmlBlockTypes;

export type DesignRowsTypes = ContainerBlockTypes;

export type DesignValueTypes = {
    background: string;
    rows: DesignRowsTypes[]
}

export type DesignTypes = {
    value: DesignValueTypes;
    setValue: Dispatch<SetStateAction<DesignValueTypes>>;
}