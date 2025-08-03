import { Fragment } from "react";
import { useEditor } from "../../../../context/editor.context";

//Types
import { TLayoutElement, TExpression, TVideo, TImage, THtml } from "@siamahnaf/react-form-renderer";

//Components
import ElementSettings from "../_helpers/ElementSettings";

//Interface
interface Props {
    item: TLayoutElement;
}

const LayoutElements = ({ item }: Props) => {
    //Editor
    const { selected } = useEditor();

    return (
        <div className="relative" id={item.id}>
            <div className={`border rounded-xl select-none cursor-pointer transition-all duration-300 ${item.id === selected.value?.id ? "bg-gray-50 border-builder border-solid p-5 outline-1 outline-builder" : "border-dashed border-gray-400 bg-white p-3 hover:bg-gray-50 hover:border-gray-200 hover:border-solid"}`} onClick={() => selected.setValue({ id: item.id, type: item.type })}>
                <h4 className="text-sm text-gray-700">{`<${item.type}/>`}</h4>
                <div className="border border-solid border-gray-200/70 mt-3 rounded-md bg-gray-50/80 flex items-center px-3 py-2.5 text-gray-600">
                    {item.type === "Expression" && (() => {
                        const exItem = item as TExpression;
                        return (
                            <Fragment>
                                {(exItem.text && exItem.text.length > 0) ?
                                    <div dangerouslySetInnerHTML={{ __html: exItem.text }} className="break-all" />
                                    :
                                    <div>{"<p>Type here content</p>"}</div>
                                }
                            </Fragment>
                        )
                    })()}
                    {item.type === "Video" && (() => {
                        const vidItem = item as TVideo;
                        return (
                            <iframe
                                width={`${vidItem.width?.value || "100"}${vidItem.width?.unit || "%"}`}
                                height={`${vidItem.height?.value || "200"}${vidItem.height?.unit || "px"}`}
                                src={`https://www.youtube.com/embed/${vidItem.videoUrl}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                className="rounded-lg"
                            />
                        )
                    })()}
                    {item.type === "Image" && (() => {
                        const imgItem = item as TImage;
                        return (
                            <div className="w-full">
                                <img
                                    src={imgItem.image?.url || "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/placeholder.png"}
                                    alt={imgItem.image?.alt}
                                    className="rounded-lg"
                                    style={{
                                        width: `${imgItem.width?.value || "100"}${imgItem.width?.unit || "%"}`,
                                        height: `${imgItem.height?.value || "200"}${imgItem.height?.unit || "px"}`,
                                        objectFit: (imgItem.fit as "cover") || "cover"
                                    }}
                                />
                            </div>
                        )
                    })()}
                    {item.type === "HTML" && (() => {
                        const htmlItem = item as THtml;
                        return (
                            <Fragment>
                                {htmlItem.html ?
                                    <div dangerouslySetInnerHTML={{ __html: htmlItem.html }} className="break-all" />
                                    :
                                    <div>{"<p>Type here content</p>"}</div>
                                }
                            </Fragment>
                        )
                    })()}
                </div>
            </div>
            <ElementSettings id={item.id} type={item.type} />
        </div>
    );
};

export default LayoutElements;