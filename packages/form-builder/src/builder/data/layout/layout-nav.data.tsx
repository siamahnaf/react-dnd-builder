import { IconClipboardTextFilled, IconFileNeutralFilled, IconPhoto, IconPaletteFilled, IconFileDotsFilled, IconSettingsFilled } from "../../icons"

export const layoutNavList = [
    {
        icon: <IconClipboardTextFilled />,
        id: "form",
        name: "Form"
    },
    {
        icon: <IconFileNeutralFilled />,
        id: "general",
        name: "General"
    },
    {
        icon: <IconPhoto />,
        id: "logo",
        name: "Logo"
    },
    {
        icon: <IconPaletteFilled />,
        id: "theme",
        name: "Themes"
    },
    {
        icon: <IconFileDotsFilled />,
        id: "page",
        name: "Pages"
    },
    {
        icon: <IconSettingsFilled />,
        id: "setting",
        name: "Settings"
    }
] as const