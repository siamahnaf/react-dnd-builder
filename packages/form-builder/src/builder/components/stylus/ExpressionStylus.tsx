import Stylus from "../common/Stylus";
import { RichText, InputBox } from "../common/control";
import { produce } from "immer";
import { useEditor } from "../../context/editor.context";

//Essentials
import { DeepPartial, merge, exResp } from "../../types/context/elements/init.element";
import { TDesignPage, TDesignElement, TExpression } from "@siamahnaf/react-form-renderer";

const ExpressionStylus = () => {
    //Editor
    const { design, selected } = useEditor();

    //Handler_Helpers
    const findElement = (pages: TDesignPage[]): TExpression | undefined => pages
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
            <RichText
                placeholder="Write here"
                value={element.text}
                onChange={(e) => updateElement(exResp({ text: e }))}
            />
            <InputBox
                label="Top Space"
                placeholder="Ex. 5"
                value={element.spaceTop?.value}
                unit={element.spaceTop?.unit}
                onChange={(e) => updateElement(exResp({
                    spaceTop: {
                        value: e,
                        unit: element.spaceTop?.unit ?? "px"
                    }
                }))}
                onUnitChange={(e) => updateElement(exResp("spaceTop", {
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
                onChange={(e) => updateElement(exResp({
                    spaceBottom: {
                        value: e,
                        unit: element.spaceBottom?.unit ?? "px"
                    }
                }))}
                onUnitChange={(e) => updateElement(exResp("spaceBottom", {
                    unit: e
                }))}
                inputType="int"
                className="mt-5"
                suffix="unit"
            />
        </Stylus.r>
    );
};

export default ExpressionStylus;