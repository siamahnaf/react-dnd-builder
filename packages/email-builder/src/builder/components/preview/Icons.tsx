"use client"

//Store
import { useEditor } from "../../context/editor.context";

//Essentials
import WidgetDropper from "./_helpers/WidgetDropper";
import { IconBlockTypes } from "../../types/context/design.types";

//Interface
interface Props {
    item: IconBlockTypes;
}

const Icons = ({ item }: Props) => {
    //Store
    const { selected, device } = useEditor();

    //Border Radius
    const radius = item.content.shape === "circle" ? "calc(infinity * 1px)" : `${item.style.border_radius[device.value].top}${item.style.border_radius[device.value].unit} ${item.style.border_radius[device.value].right}${item.style.border_radius[device.value].unit} ${item.style.border_radius[device.value].bottom}${item.style.border_radius[device.value].unit} ${item.style.border_radius[device.value].left}${item.style.border_radius[device.value].unit}`

    return (
        <WidgetDropper id={item.id}>
            <div
                className={`border border-solid hover:border-builder ${item.display ? "block" : "hidden"} ${selected.value?.id === item.id ? "shadow-[0_0_0_1px_rgba(0,0,0,0.1)] border-builder" : "border-transparent"}`}
                onClick={() => selected.setValue({ id: item.id, name: item.name, type: item.type })}
            >
                <style jsx>{`
                    .background-image {
                        background: url("${item.advance.background.image.url}");
                        background-position: ${item.advance.background.image.position};
                        background-repeat: ${item.advance.background.image.repeat};
                        background-size: ${item.advance.background.image.size};
                    }
                    .icon-itself {
                        overflow: hidden;
                        margin: ${item.content.alignment[device.value]};
                        transform: rotate(${item.style.rotate[device.value].value}${item.style.rotate[device.value].unit});
                        width: ${item.style.size[device.value].value}${item.style.size[device.value].unit};
                        height: ${item.style.size[device.value].value}${item.style.size[device.value].unit};
                        border-radius: ${radius};
                    }
                    .icon-container {
                        background: ${item.advance.background.color};
                        margin-top: ${item.advance.layout.margin[device.value].top}${item.advance.layout.margin[device.value].unit};
                        margin-right: ${item.advance.layout.margin[device.value].right}${item.advance.layout.margin[device.value].unit};
                        margin-bottom: ${item.advance.layout.margin[device.value].bottom}${item.advance.layout.margin[device.value].unit};
                        margin-left: ${item.advance.layout.margin[device.value].left}${item.advance.layout.margin[device.value].unit};
                        padding-top: ${item.advance.layout.padding[device.value].top}${item.advance.layout.padding[device.value].unit};
                        padding-right: ${item.advance.layout.padding[device.value].right}${item.advance.layout.padding[device.value].unit};
                        padding-bottom: ${item.advance.layout.padding[device.value].bottom}${item.advance.layout.padding[device.value].unit};
                        padding-left: ${item.advance.layout.padding[device.value].left}${item.advance.layout.padding[device.value].unit};
                        border-style: ${item.advance.border.border_type};
                        border-top-width: ${item.advance.border.border_width[device.value].top}${item.advance.border.border_width[device.value].unit};
                        border-right-width: ${item.advance.border.border_width[device.value].right}${item.advance.border.border_width[device.value].unit};
                        border-bottom-width: ${item.advance.border.border_width[device.value].bottom}${item.advance.border.border_width[device.value].unit};
                        border-left-width: ${item.advance.border.border_width[device.value].left}${item.advance.border.border_width[device.value].unit};
                        border-color: ${item.advance.border.border_color};
                        border-radius: ${item.advance.border.border_radius[device.value].top}${item.advance.border.border_radius[device.value].unit} ${item.advance.border.border_radius[device.value].right}${item.advance.border.border_radius[device.value].unit} ${item.advance.border.border_radius[device.value].bottom}${item.advance.border.border_radius[device.value].unit} ${item.advance.border.border_radius[device.value].left}${item.advance.border.border_radius[device.value].unit};
                        opacity: ${item.advance.responsive[device.value] ? 0.2 : 1};
                        pointer-events: ${item.advance.responsive[device.value] ? "none" : "unset"};
                    }
                `}</style>
                {item.advance.custom_css && (
                    <style
                        dangerouslySetInnerHTML={{ __html: item.advance.custom_css }}
                    />
                )}
                <div
                    className={`icon-container relative ${item.advance.layout.css_class}`}
                    id={item.advance.layout.css_id}
                >
                    {item.advance.background.image.url &&
                        <div className="background-image absolute top-0 left-0 right-0 bottom-0" />
                    }
                    <div className="icon-itself">
                        <img
                            src={item.content.content ? item.content.content : "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/social/facebook.png"}
                            width={200}
                            height={200}
                            alt="Social Icon"
                            className={`w-full h-full ${!item.content.content ? "grayscale opacity-30" : ""}`}
                        />
                    </div>
                </div>
            </div>
        </WidgetDropper>
    );
};

export default Icons;