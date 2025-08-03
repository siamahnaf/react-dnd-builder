import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import Stylus from "../../../../common/Stylus";
import { BasicShowAnimate, InputBox, TextareaBox, Checkbox, ColorPick } from "../../../../common/control";
import { produce } from "immer";
import { useEditor } from "../../../../../context/editor.context";

//Essentials
import { DeepPartial, merge, setResp } from "../../../../../types/context/elements/init.element";
import { TSettings } from "@siamahnaf/react-form-renderer";

const SidebarGeneral = () => {
    //Editor
    const { settings } = useEditor();

    //Handler
    const updateElement = (patch: DeepPartial<TSettings>) => {
        settings.setValue(prev =>
            produce(prev, draft => {
                merge(draft, patch);
            })
        );
    };
    const element = settings.value.general;

    return (
        <AnimatePresence>
            <motion.div
                key="sidebar-general"
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.3, ease: cubicBezier(0.33, 1, 0.68, 1) }}
            >
                <Stylus.r>
                    <Checkbox
                        id="showFormDetails"
                        label="Show form details"
                        value={element?.showFormDetails}
                        onChange={(e) => updateElement(setResp("general", { showFormDetails: e }))}
                        className="mt-4"
                    />
                    <BasicShowAnimate
                        id="detailAppear"
                        show={element?.showFormDetails}
                    >
                        <InputBox
                            label="Title"
                            placeholder="Value"
                            value={element?.title}
                            onChange={(e) => updateElement(setResp("general", { title: e }))}
                            className="mt-5"
                        />
                        <TextareaBox
                            label="Description"
                            placeholder="Value"
                            value={element?.description}
                            onChange={(e) => updateElement(setResp("general", { description: e }))}
                            rows={3}
                            className="mt-5"
                        />
                        <InputBox
                            label="Title Font Size (px)"
                            placeholder="Ex. 10"
                            value={element?.titleFontSize}
                            onChange={(e) => updateElement(setResp("general", { titleFontSize: e }))}
                            className="mt-5"
                            inputType="int"
                        />
                        <InputBox
                            label="Description Font Size (px)"
                            placeholder="Ex. 10"
                            value={element?.descriptionFontSize}
                            onChange={(e) => updateElement(setResp("general", { descriptionFontSize: e }))}
                            className="mt-5"
                            inputType="int"
                        />
                        <InputBox
                            label="Top Space"
                            placeholder="Ex. 5"
                            value={element?.marginTop?.value}
                            unit={element?.marginTop?.unit}
                            onChange={(e) => updateElement(setResp("general", "marginTop", {
                                value: e,
                                unit: element?.marginTop?.unit ?? "px"
                            }))}
                            onUnitChange={(e) => updateElement(setResp("general", "marginTop", {
                                unit: e
                            }))}
                            inputType="int"
                            className="mt-5"
                            suffix="unit"
                        />
                        <InputBox
                            label="Bottom Space"
                            placeholder="Ex. 5"
                            value={element?.marginBottom?.value}
                            unit={element?.marginBottom?.unit}
                            onChange={(e) => updateElement(setResp("general", "marginBottom", {
                                value: e,
                                unit: element?.marginBottom?.unit ?? "px"
                            }))}
                            onUnitChange={(e) => updateElement(setResp("general", "marginBottom", {
                                unit: e
                            }))}
                            inputType="int"
                            className="mt-5"
                            suffix="unit"
                        />
                        <ColorPick
                            label="Title Text Color"
                            value={element?.titleColor}
                            onChange={(e) => updateElement(setResp("general", { titleColor: e }))}
                            className="mt-5"
                        />
                        <ColorPick
                            label="Title Text Color"
                            value={element?.descriptionColor}
                            onChange={(e) => updateElement(setResp("general", { descriptionColor: e }))}
                            className="mt-5"
                        />
                    </BasicShowAnimate>
                </Stylus.r>
            </motion.div>
        </AnimatePresence>
    );
};

export default SidebarGeneral;