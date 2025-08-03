"use client"
import { Fragment } from "react";
import { useEditor } from "../../../context/editor.context";

//Components
import DesignItems from "./DesignItems";
import ElementSettings from "./_helpers/ElementSettings";

const DesignPages = () => {
    //Editor
    const { design, selected } = useEditor();

    return (
        <Fragment>
            {design.value.pages.map((item, i) => (
                <div key={item.id} id={item.id} className="cursor-pointer select-none relative">
                    <div className={`${item.id === selected.value?.id ? "bg-builder py-2 px-4 rounded-md text-white" : "p-0"} transition-all duration-200 group`}>
                        <div onClick={() => selected.setValue({ id: item.id, type: "page" })}>
                            <h4 className={`text-2xl font-semibold ${item.id === selected.value?.id ? "text-white" : "text-gray-600"}`}>{item.name}</h4>
                            <p className={`text-base font-light ${item.id === selected.value?.id ? "text-white/80" : "text-gray-500"}`}>{item.description || "Description"}</p>
                            {item.image?.url &&
                                <img
                                    src={item.image.url}
                                    alt={item.image.alt}
                                    style={{
                                        width: `${item.imageWidth?.value}${item.imageWidth?.unit || "px"}`,
                                        height: `${item.imageHeight?.value}${item.imageHeight?.unit || "px"}`,
                                        borderRadius: `${item.imageRadius?.value}${item.imageRadius?.unit || "px"}`
                                    }}
                                    className="object-cover object-center mt-2"
                                />
                            }
                        </div>
                        <div className={`bg-builder w-max rounded-md absolute top-1 right-1 ${selected.value?.id === item.id ? "" : "invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-300"}`}>
                            <ElementSettings id={item.id} type={item.type} />
                        </div>
                    </div>
                    <DesignItems page={item} index={i} />
                </div>
            ))}
            {design.value.pages.length === 0 &&
                <p className="text-center text-gray-400 font-light py-4">
                    Drag and Drop Element Here
                </p>
            }
        </Fragment >
    );
};

export default DesignPages;