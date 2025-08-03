import { Fragment } from "react";
import Stylus from "../common/Stylus";
import { Checkbox, ConditionBox, InputBox, OptionBox, SelectBox, TextareaBox } from "../common/control";
import { produce } from "immer";
import { useEditor } from "../../context/editor.context";

//Essentials
import { DeepPartial, merge, capResp } from "../../types/context/elements/init.element";
import { TDesignPage, TDesignElement, TCaptcha } from "@siamahnaf/react-form-renderer";

const CaptchaStylus = ({ step }: { step: number }) => {
    //Editor
    const { design, selected } = useEditor();

    //Handler_Helpers
    const findElement = (pages: TDesignPage[]): TCaptcha | undefined => pages
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
        <Fragment>
            <Stylus render={step === 0}>
                <Stylus.r>
                    <InputBox
                        label="Label"
                        value={element?.general?.label}
                        onChange={(e) => updateElement(capResp("general", { label: e }))}
                        placeholder="Type element label"
                    />
                    <InputBox
                        label="Name"
                        value={element.name}
                        onChange={(e) => updateElement(capResp({ name: e }))}
                        placeholder="Type element name"
                        className="mt-5"
                        isError={!element.name}
                    />
                    <TextareaBox
                        label="Tooltip"
                        placeholder="Type element tooltip"
                        className="mt-5"
                        value={element.general?.tooltip}
                        onChange={(e) => updateElement(capResp("general", { tooltip: e }))}
                    />
                    <OptionBox
                        label="Appearance Style"
                        options={[
                            { label: "Box", value: "box" },
                            { label: "Plain", value: "plain" }
                        ]}
                        value={element?.general?.appearance}
                        onChange={(e) => updateElement(capResp("general", { appearance: e }))}
                        className="mt-5"
                    />
                    <Checkbox
                        id="visible"
                        label="Is visible"
                        value={element.general?.isVisible}
                        onChange={(e) => updateElement(capResp("general", { isVisible: e }))}
                        className="mt-4"
                    />
                    <Checkbox
                        id="showTitle"
                        label="Show title"
                        value={element.general?.showTitle}
                        onChange={(e) => updateElement(capResp("general", { showTitle: e }))}
                        className="mt-2.5"
                    />
                    <Checkbox
                        id="showDescription"
                        label="Show Description"
                        value={element.general?.showDescription}
                        onChange={(e) => updateElement(capResp("general", { showDescription: e }))}
                        className="mt-2.5"
                    />
                </Stylus.r>
            </Stylus>
            <Stylus render={step === 1}>
                <Stylus.r>
                    <OptionBox
                        label="Question box collapse state"
                        value={element.layout?.collapseState}
                        onChange={(e) => updateElement(capResp("layout", {
                            collapseState: e
                        }))}
                        options={[
                            { label: "Locked", value: "locked" },
                            { label: "Collapsed", value: "collapsed" },
                            { label: "Expanded", value: "expanded" },
                        ]}
                    />
                    <SelectBox
                        label="Question title alignment"
                        value={element.layout?.titleAlignment}
                        onChange={(e) => updateElement(capResp("layout", {
                            titleAlignment: e
                        }))}
                        options={[
                            { label: "Top", value: "top" },
                            { label: "Bottom", value: "bottom" }
                        ]}
                        className="mt-5"
                    />
                    <SelectBox
                        label="Question description alignment"
                        value={element.layout?.descriptionAlignment}
                        onChange={(e) => updateElement(capResp("layout", {
                            descriptionAlignment: e
                        }))}
                        options={[
                            { label: "Under the input field", value: "u_i" },
                            { label: "Under the question title", value: "u_t" }
                        ]}
                        className="mt-5"
                    />
                    <OptionBox
                        label="Increase the inner indent"
                        value={element.layout?.innerIndent}
                        onChange={(e) => updateElement(capResp("layout", {
                            innerIndent: e
                        }))}
                        options={[
                            { label: "0", value: "0px" },
                            { label: "1", value: "8px" },
                            { label: "2", value: "16px" },
                            { label: "3", value: "24px" },
                            { label: "4", value: "32px" }
                        ]}
                        className="mt-5"
                    />
                </Stylus.r>
            </Stylus>
            <Stylus render={step === 2}>
                <Stylus.r>
                    <ConditionBox
                        label="Make the question visible if"
                        value={element.advance?.visibleIf}
                        onChange={(e) => updateElement(capResp("advance", {
                            visibleIf: e
                        }))}
                    />
                </Stylus.r>
            </Stylus>
        </Fragment>
    );
};

export default CaptchaStylus;