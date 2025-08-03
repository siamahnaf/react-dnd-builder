import { Fragment } from "react";
import Stylus from "../common/Stylus";
import { InputBox, TextareaBox, ImageBox } from "../common/control";
import { useEditor } from "../../context/editor.context";
import { produce } from "immer";

//Essentials
import { DeepPartial, merge } from "../../types/context/elements/init.element";
import { TDesignPage } from "@siamahnaf/react-form-renderer";

const PageStylus = () => {
    //Editor
    const { design, selected } = useEditor();

    //Handler_helpers
    const findPage = (pages: TDesignPage[]): TDesignPage | undefined => pages.find(p => p.id === selected.value?.id);
    const updatePage = (patch: DeepPartial<TDesignPage>) => design.setValue(prev =>
        produce(prev, draft => {
            const page = findPage(draft.pages);
            if (page) merge(page, patch);
        })
    );
    const page = findPage(design.value.pages);

    return (
        <Stylus.r>
            <InputBox
                label="Page title"
                placeholder="Value"
                value={page?.name}
                onChange={(e) => updatePage({ name: e })}
            />
            <TextareaBox
                label="Page description"
                placeholder="Description"
                value={page?.description}
                onChange={(e) => updatePage({ description: e })}
                className="mt-5"
                rows={3}
            />
            <ImageBox
                label="Upload Image"
                className="mt-5"
                value={page?.image}
                onChange={(e) => updatePage({ image: e })}
            />
            {page?.image &&
                <Fragment>
                    <InputBox
                        label="Image Width"
                        value={page.imageWidth?.value}
                        unit={page.imageWidth?.unit}
                        onChange={(e) => updatePage({
                            imageWidth: {
                                value: e,
                                unit: page.imageWidth?.unit || "px"
                            }
                        })}
                        onUnitChange={(e) => updatePage({
                            imageWidth: {
                                unit: e,
                                value: page.imageWidth?.value || "0"
                            }
                        })}
                        placeholder="Ex. 100px"
                        className="mt-5"
                        suffix="unit"
                        inputType="int"
                    />
                    <InputBox
                        label="Image Height"
                        value={page.imageHeight?.value}
                        unit={page.imageHeight?.unit}
                        onChange={(e) => updatePage({
                            imageHeight: {
                                value: e,
                                unit: page.imageHeight?.unit || "px"
                            }
                        })}
                        onUnitChange={(e) => updatePage({
                            imageHeight: {
                                unit: e,
                                value: page.imageHeight?.value || "0"
                            }
                        })}
                        placeholder="Ex. 100px"
                        className="mt-5"
                        suffix="unit"
                        inputType="int"
                    />
                    <InputBox
                        label="Image Border Radius"
                        value={page.imageRadius?.value}
                        unit={page.imageRadius?.unit}
                        onChange={(e) => updatePage({
                            imageRadius: {
                                value: e,
                                unit: page.imageRadius?.unit || "px"
                            }
                        })}
                        onUnitChange={(e) => updatePage({
                            imageRadius: {
                                unit: e,
                                value: page.imageRadius?.value || "0"
                            }
                        })}
                        placeholder="Ex. 5px"
                        className="mt-5"
                        suffix="unit"
                        inputType="int"
                    />
                </Fragment>
            }
        </Stylus.r>
    );
};

export default PageStylus;