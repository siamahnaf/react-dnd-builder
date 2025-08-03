import { useEditor } from "../../../context/editor.context";

const DesignHeader = () => {
    //Editor
    const { settings } = useEditor();

    if (!settings.value.general?.showFormDetails) return null;

    return (
        <div
            style={{
                marginTop: `${settings.value.general.marginTop?.value || 0}${settings.value.general.marginTop?.unit || "px"}`,
                marginBottom: `${settings.value.general.marginBottom?.value || 0}${settings.value.general.marginBottom?.unit || "px"}`
            }}
        >

            {settings.value.logo?.logo?.url && settings.value.logo.position === "top" &&
                <img
                    src={settings.value.logo?.logo?.url}
                    alt={settings.value.logo?.logo?.alt}
                    style={{
                        width: `${settings.value.logo.logoWidth?.value}${settings.value.logo.logoWidth?.unit || "px"}`,
                        height: `${settings.value.logo.logoHeight?.value}${settings.value.logo.logoHeight?.unit || "px"}`,
                        borderRadius: `${settings.value.logo.borderRadius?.value}${settings.value.logo.borderRadius?.unit || "px"}`,
                        objectFit: `${(settings.value.logo.fit as "cover") || "cover"}`
                    }}
                    className="object-cover object-center mt-2"
                />
            }
            {settings.value.general.title &&
                <h4
                    className="font-semibold"
                    style={{
                        fontSize: `${settings.value.general.titleFontSize || 24}px`,
                        color: `${settings.value.general.titleColor || "#000000"}`
                    }}
                >
                    {settings.value.general.title}
                </h4>
            }
            {settings.value.general.description &&
                <p
                    style={{
                        fontSize: `${settings.value.general.descriptionFontSize || 16}px`,
                        color: `${settings.value.general.descriptionColor || "#4a5565"}`
                    }}
                >
                    {settings.value.general.description}
                </p>
            }
            {settings.value.logo?.logo?.url && settings.value.logo.position === "bottom" &&
                <img
                    src={settings.value.logo?.logo?.url}
                    alt={settings.value.logo?.logo?.alt}
                    style={{
                        width: `${settings.value.logo.logoWidth?.value}${settings.value.logo.logoWidth?.unit || "px"}`,
                        height: `${settings.value.logo.logoHeight?.value}${settings.value.logo.logoHeight?.unit || "px"}`,
                        borderRadius: `${settings.value.logo.borderRadius?.value}${settings.value.logo.borderRadius?.unit || "px"}`,
                        objectFit: `${(settings.value.logo.fit as "cover") || "cover"}`
                    }}
                    className="object-cover object-center mt-2"
                />
            }
        </div>
    );
};

export default DesignHeader;