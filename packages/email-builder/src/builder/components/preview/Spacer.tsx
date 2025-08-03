"use client"

//Store
import { useEditor } from "../../context/editor.context";

//Essentials
import WidgetDropper from "./_helpers/WidgetDropper";
import { SpacerBlockTypes } from "../../types/context/design.types";

//Interface
interface Props {
    item: SpacerBlockTypes;
}

const Spacer = ({ item }: Props) => {
    //Store
    const { selected, device } = useEditor();

    return (
        <WidgetDropper id={item.id}>
            <div
                className={`border border-solid hover:border-builder ${item.display ? "block" : "hidden"} ${selected.value?.id === item.id ? "shadow-[0_0_0_1px_rgba(0,0,0,0.1)] border-builder" : "border-transparent"}`}
                onClick={() => selected.setValue({ id: item.id, name: item.name, type: item.type })}
            >
                {item.advance.background.image.url &&
                    <div className="background-image absolute top-0 left-0 right-0 bottom-0" />
                }
                <style jsx>{`
                    .background-image {
                        background: url("${item.advance.background.image.url}");
                        background-position: ${item.advance.background.image.position};
                        background-repeat: ${item.advance.background.image.repeat};
                        background-size: ${item.advance.background.image.size};
                    }
                    .spacer-itself {
                        height: ${item.content.space[device.value].value}${item.content.space[device.value].unit};
                    }
                    .spacer-container {
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
                `}
                </style>
                <div
                    className={`relative spacer-container ${item.advance.layout.css_class}`}
                    id={item.advance.layout.css_id}
                >
                    {item.advance.background.image.url &&
                        <div className="background-image absolute top-0 left-0 right-0 bottom-0" />
                    }
                    <div className="spacer-itself"></div>
                </div>
            </div>
        </WidgetDropper>
    );
};

export default Spacer;