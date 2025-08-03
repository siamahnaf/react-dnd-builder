import Stylus from "../common/Stylus";
import { InputBox, TextareaBox, Checkbox, OptionBox } from "../common/control";
import { useEditor } from "../../context/editor.context";
import { produce } from "immer";

//Essentials
import { DeepPartial, merge, panelResp } from "../../types/context/elements/init.element";
import { TDesignPage, TDesignElement, TPanel } from "@siamahnaf/react-form-renderer";

const PanelStylus = () => {
    //Editor
    const { design, selected } = useEditor();

    //Handler_Helpers
    const findElement = (pages: TDesignPage[]): TPanel | undefined => pages
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

    return (
        <Stylus.r>
            <InputBox
                label="Panel Title"
                value={element?.name}
                onChange={(e) => updateElement(panelResp({ name: e }))}
                placeholder="value"
            />
            <TextareaBox
                label="Panel Description"
                placeholder="Description"
                value={element?.description}
                onChange={(e) => updateElement(panelResp({ description: e }))}
                className="mt-5"
                rows={5}
            />
            <InputBox
                label="Spacing (PX)"
                value={element?.spacing}
                onChange={(e) => updateElement(panelResp({ spacing: e }))}
                placeholder="Ex. 5"
                className="mt-5"
                inputType="int"
            />
            <OptionBox
                label="Appearance"
                value={element?.appearance}
                onChange={(e) => updateElement(panelResp({ appearance: e }))}
                options={[
                    { label: "Plain", value: "plain" },
                    { label: "Box", value: "box" }
                ]}
                className="mt-5"
            />
            <Checkbox
                id="showName"
                label="Show Name"
                value={element?.showName}
                onChange={(e) => updateElement(panelResp({ showName: e }))}
                className="mt-4"
            />
            <Checkbox
                id="showDescription"
                label="Show Description"
                value={element?.showDescription}
                onChange={(e) => updateElement(panelResp({ showDescription: e }))}
                className="mt-4"
            />
        </Stylus.r>
    );
};

export default PanelStylus;