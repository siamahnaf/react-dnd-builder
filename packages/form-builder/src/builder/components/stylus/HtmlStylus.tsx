import Stylus from "../common/Stylus";
import { TextareaBox, InputBox } from "../common/control";
import { produce } from "immer";
import { useEditor } from "../../context/editor.context";

//Essentials
import { DeepPartial, merge, htmlResp } from "../../types/context/elements/init.element";
import { TDesignPage, TDesignElement, THtml } from "@siamahnaf/react-form-renderer";

const HtmlStylus = () => {
    //Editor
    const { design, selected } = useEditor();

    //Handler_Helpers
    const findElement = (pages: TDesignPage[]): THtml | undefined => pages
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
            <TextareaBox
                label="Your HTML Content"
                placeholder="<p>Type here</p>"
                value={element.html}
                onChange={(e) => updateElement(htmlResp({ html: e }))}
                rows={7}
            />
            <InputBox
                label="Top Space"
                placeholder="Ex. 5"
                value={element.spaceTop?.value}
                unit={element.spaceTop?.unit}
                onChange={(e) => updateElement(htmlResp({
                    spaceTop: {
                        value: e,
                        unit: element.spaceTop?.unit ?? "px"
                    }
                }))}
                onUnitChange={(e) => updateElement(htmlResp("spaceTop", {
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
                onChange={(e) => updateElement(htmlResp({
                    spaceBottom: {
                        value: e,
                        unit: element.spaceBottom?.unit ?? "px"
                    }
                }))}
                onUnitChange={(e) => updateElement(htmlResp("spaceBottom", {
                    unit: e
                }))}
                inputType="int"
                className="mt-5"
                suffix="unit"
            />
        </Stylus.r>
    );
};

export default HtmlStylus;