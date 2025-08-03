import { IconContainer, IconHeading, IconAlignJustified, IconPhoto, IconRowInsertBottom, IconSeparatorHorizontal, IconSeparator, IconUserSquareRounded, IconCode } from "../icons"


export const widgetList = [
    {
        category: "Layout",
        categoryId: "layout",
        widgets: [
            {
                type: "container",
                name: "Container",
                icon: <IconContainer />
            }
        ]
    },
    {
        category: "Basic",
        categoryId: "basic",
        widgets: [
            {
                type: "heading",
                name: "Heading",
                icon: <IconHeading />
            },
            {
                type: "text",
                name: "Text Editor",
                icon: <IconAlignJustified />
            },
            {
                type: "button",
                name: "Button",
                icon: <IconRowInsertBottom />
            },
            {
                type: "image",
                name: "Image",
                icon: <IconPhoto />
            },
            {
                type: "divider",
                name: "Divider",
                icon: <IconSeparator />
            },
            {
                type: "spacer",
                name: "Spacer",
                icon: <IconSeparatorHorizontal />
            },
            {
                type: "icon",
                name: "Social Icon",
                icon: <IconUserSquareRounded />
            },
            {
                type: "html",
                name: "HTML",
                icon: <IconCode />
            }
        ]
    }
]