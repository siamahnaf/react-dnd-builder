import { useEditor } from "../../context/editor.context";

const FormHeader = () => {
    //Editor
    const { settings } = useEditor();
    const { general, logo } = settings;

    if (!general?.showFormDetails) return null;

    return (
        <div
            style={{
                marginTop: `${general.marginTop?.value || 0}${general.marginTop?.unit || "px"}`,
                marginBottom: `${general.marginBottom?.value || 20}${general.marginBottom?.unit || "px"}`
            }}
        >

            {logo?.logo?.url && logo.position === "top" &&
                <img
                    src={logo?.logo?.url}
                    alt={logo?.logo?.alt}
                    style={{
                        width: `${logo.logoWidth?.value}${logo.logoWidth?.unit || "px"}`,
                        height: `${logo.logoHeight?.value}${logo.logoHeight?.unit || "px"}`,
                        borderRadius: `${logo.borderRadius?.value}${logo.borderRadius?.unit || "px"}`,
                        objectFit: `${(logo.fit as "cover") || "cover"}`
                    }}
                    className="object-cover object-center mt-2"
                />
            }
            {general.title &&
                <h4
                    className="font-semibold"
                    style={{
                        fontSize: `${general.titleFontSize || 24}px`,
                        color: `${general.titleColor || "#000000"}`
                    }}
                >
                    {general.title}
                </h4>
            }
            {general.description &&
                <p
                    style={{
                        fontSize: `${general.descriptionFontSize || 16}px`,
                        color: `${general.descriptionColor || "#4a5565"}`
                    }}
                >
                    {general.description}
                </p>
            }
            {logo?.logo?.url && logo.position === "bottom" &&
                <img
                    src={logo?.logo?.url}
                    alt={logo?.logo?.alt}
                    style={{
                        width: `${logo.logoWidth?.value}${logo.logoWidth?.unit || "px"}`,
                        height: `${logo.logoHeight?.value}${logo.logoHeight?.unit || "px"}`,
                        borderRadius: `${logo.borderRadius?.value}${logo.borderRadius?.unit || "px"}`,
                        objectFit: `${(logo.fit as "cover") || "cover"}`
                    }}
                    className="object-cover object-center mt-2"
                />
            }
        </div>
    );
};

export default FormHeader;