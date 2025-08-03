"use client"
//Store
import { useEditor } from "../../context/editor.context";

//Essentials
import WidgetDropper from "./_helpers/WidgetDropper";
import { DividerBlockTypes } from "../../types/context/design.types";

//Interface
interface Props {
    item: DividerBlockTypes;
}

const Divider = ({ item }: Props) => {
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
                    .divider-itself {
                        padding: ${item.style.divider.gap[device.value]}px 0;
                    }
                    .divider-line {
                        width: ${item.content.width[device.value].value}${item.content.width[device.value].unit};
                        margin: ${item.content.alignment[device.value]};
                    }
                    .general-border {
                        border-top: ${item.style.divider.weight}px ${item.content.style} ${item.style.divider.color};
                    }
                    .divider-text {
                        color: ${item.style.text.color};
                        font-family: ${item.style.text.typography.family};
                        font-size: ${item.style.text.typography.size[device.value].value}${item.style.text.typography.size[device.value].unit};
                        font-weight: ${item.style.text.typography.weight} !important;
                        text-transform: ${item.style.text.typography.transform};
                        font-style: ${item.style.text.typography.style};
                        text-decoration: ${item.style.text.typography.decoration};
                        line-height: ${item.style.text.typography.line_height[device.value].value}${item.style.text.typography.line_height[device.value].unit};
                        letter-spacing: ${item.style.text.typography.letter_spacing[device.value].value}${item.style.text.typography.letter_spacing[device.value].unit};
                        word-spacing: ${item.style.text.typography.word_spacing[device.value].value}${item.style.text.typography.word_spacing[device.value].unit};
                    }
                    .divider-line-with-text {
                        gap: ${item.style.text.spacing[device.value]}px !important;
                    }
                    .divider-container {
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
                    className={`relative divider-container ${item.advance.layout.css_class}`}
                    id={item.advance.layout.css_id}
                >
                    <div className="divider-itself">
                        {item.content.element_type === "none" ?
                            <span className="flex divider-line general-border"></span>
                            :
                            <span className={`flex items-center gap-3 divider-line ${item.content.element_type === "text" && "divider-line-with-text"}`}>
                                {item.content.element_type === "text" &&
                                    <>
                                        {item.style.text.position === "left" &&
                                            <>
                                                <span className="divider-text">{item.content.text}</span>
                                                <span className="block w-full general-border"></span>
                                            </>
                                        }
                                        {item.style.text.position === "center" &&
                                            <>
                                                <span className="block w-full general-border"></span>
                                                <span className="divider-text">{item.content.text}</span>
                                                <span className="block w-full general-border"></span>
                                            </>
                                        }
                                        {item.style.text.position === "right" &&
                                            <>
                                                <span className="block w-full general-border"></span>
                                                <span className="divider-text">{item.content.text}</span>
                                            </>
                                        }
                                    </>
                                }
                            </span>
                        }
                    </div>
                </div>
            </div>
        </WidgetDropper>
    );
};

export default Divider;