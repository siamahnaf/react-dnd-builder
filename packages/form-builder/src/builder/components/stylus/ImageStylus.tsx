import Stylus from "../common/Stylus";
import { ImageBox, Checkbox, InputBox, OptionBox } from "../common/control";
import { produce } from "immer";
import { useEditor } from "../../context/editor.context";

//Essentials
import { DeepPartial, merge, imgResp } from "../../types/context/elements/init.element";
import { TDesignPage, TDesignElement, TImage } from "@siamahnaf/react-form-renderer";

const ImageStylus = () => {
    //Editor
    const { design, selected } = useEditor();

    //Handler_Helpers
    const findElement = (pages: TDesignPage[]): TImage | undefined => pages
        .flatMap(p => p.elements.flatMap(e => "elements" in e && e.elements ? [e, ...e.elements] : [e]))
        .find(e => e.id === selected.value?.id);
    const updateElement = (patch: DeepPartial<TDesignElement>) =>
        design.setValue(prev =>
            produce(prev, draft => {
                const el = findElement(draft.pages);
                if (el) merge(el, patch);
            })
        );
    const element = findElement(design.value.pages);

    if (!element) return null;

    return (
        <Stylus.r>
            <ImageBox
                label="Upload Image"
                value={element.image}
                onChange={(e) => updateElement(imgResp({ image: e }))}
            />
            <InputBox
                label="Image Width"
                placeholder="Ex. 5"
                value={element?.width?.value}
                unit={element.width?.unit}
                onChange={(e) => updateElement(imgResp({
                    width: {
                        value: e,
                        unit: element.width?.unit ?? "px"
                    }
                }))}
                onUnitChange={(e) => updateElement(imgResp("width", { unit: e }))}
                inputType="int"
                suffix="unit"
                className="mt-5"
            />
            <InputBox
                label="Image Height"
                placeholder="Ex. 5"
                value={element.height?.value}
                unit={element.height?.unit}
                onChange={(e) => updateElement(imgResp({
                    height: {
                        value: e,
                        unit: element.height?.unit ?? "px"
                    }
                }))}
                onUnitChange={(e) => updateElement(imgResp("height", {
                    unit: e
                }))}
                inputType="int"
                suffix="unit"
                className="mt-5"
            />
            <OptionBox
                label="Image Fit"
                options={[
                    { label: "Contain", value: "contain" },
                    { label: "Cover", value: "cover" },
                    { label: "Fill", value: "fill" }
                ]}
                value={element.fit}
                onChange={(e) => updateElement(imgResp({ fit: e }))}
                className="mt-5"
            />
            <InputBox
                label="Image Radius"
                placeholder="Ex. 5"
                value={element.imageRadius?.value}
                unit={element.imageRadius?.unit}
                onChange={(e) => updateElement(imgResp({
                    imageRadius: {
                        value: e,
                        unit: element.imageRadius?.unit ?? "px"
                    }
                }))}
                onUnitChange={(e) => updateElement(imgResp("imageRadius", {
                    unit: e
                }))}
                inputType="int"
                className="mt-5"
                suffix="unit"
            />
            <InputBox
                label="Top Space"
                placeholder="Ex. 5"
                value={element.spaceTop?.value}
                unit={element.spaceTop?.unit}
                onChange={(e) => updateElement(imgResp({
                    spaceTop: {
                        value: e,
                        unit: element.spaceTop?.unit ?? "px"
                    }
                }))}
                onUnitChange={(e) => updateElement(imgResp("spaceTop", {
                    unit: e
                }))}
                inputType="int"
                className="mt-5"
                suffix="unit"
            />
            <InputBox
                label="Bottom Space"
                placeholder="Ex. 5"
                value={element.spaceBottom?.value}
                unit={element.spaceBottom?.unit}
                onChange={(e) => updateElement(imgResp({
                    spaceBottom: {
                        value: e,
                        unit: element.spaceBottom?.unit ?? "px"
                    }
                }))}
                onUnitChange={(e) => updateElement(imgResp("spaceBottom", {
                    unit: e
                }))}
                inputType="int"
                className="mt-5"
                suffix="unit"
            />
            <Checkbox
                id="isVisible"
                label="Is visible"
                value={element.isVisible}
                onChange={(e) => updateElement(imgResp({ isVisible: e }))}
                className="mt-4"
            />
        </Stylus.r>
    );
};

export default ImageStylus;