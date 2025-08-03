import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import Stylus from "../../../../common/Stylus";
import { ColorPick, InputBox, OptionBox, SelectBox, Checkbox } from "../../../../common/control";
import { produce } from "immer";
import { useEditor } from "../../../../../context/editor.context";

//Essentials
import { DeepPartial, merge, setResp } from "../../../../../types/context/elements/init.element";
import { TSettings } from "@siamahnaf/react-form-renderer";


const SidebarThemes = () => {
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
    const element = settings.value.theme;

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
                    <SelectBox
                        label="Select Theme"
                        options={[
                            { label: "Border", value: "border" },
                            { label: "Borderless", value: "border-less" },
                            { label: "Underline", value: "underline" }
                        ]}
                        value={element?.theme}
                        onChange={(e) => updateElement(setResp("theme", { theme: e }))}
                    />
                    <OptionBox
                        label="Appearance Style"
                        options={[
                            { label: "Box", value: "box" },
                            { label: "Plain", value: "plain" }
                        ]}
                        value={element?.appearance}
                        onChange={(e) => updateElement(setResp("theme", { appearance: e }))}
                        className="mt-5"
                    />
                    <ColorPick
                        label="Background Color"
                        value={element?.bodyBackgroundColor}
                        onChange={(e) => updateElement(setResp("theme", { bodyBackgroundColor: e }))}
                        className="mt-5"
                    />
                    <ColorPick
                        label="Body Text Color"
                        value={element?.bodyColor}
                        onChange={(e) => updateElement(setResp("theme", { bodyColor: e }))}
                        className="mt-5"
                    />
                    <ColorPick
                        label="Accent BG Color"
                        value={element?.accentBgColor}
                        onChange={(e) => updateElement(setResp("theme", { accentBgColor: e }))}
                        className="mt-3.5"
                    />
                    <ColorPick
                        label="Accent Text Color"
                        value={element?.accentTextColor}
                        onChange={(e) => updateElement(setResp("theme", { accentTextColor: e }))}
                        className="mt-3.5"
                    />
                    <InputBox
                        label="Box Opacity"
                        placeholder="Ex. 100"
                        inputType="int"
                        value={element?.boxOpacity}
                        onChange={(e) => updateElement(setResp("theme", { boxOpacity: e }))}
                        className="mt-5"
                    />
                    <ColorPick
                        label="Box Color"
                        value={element?.boxColor}
                        onChange={(e) => updateElement(setResp("theme", { boxColor: e }))}
                        className="mt-5"
                    />
                    <Checkbox
                        id="enableBoxBorder"
                        label="Enable Box Border"
                        value={element?.enableBoxBorder}
                        onChange={(e) => updateElement(setResp("theme", { enableBoxBorder: e }))}
                        className="mt-4"
                    />
                    <ColorPick
                        label="Box Border Color"
                        value={element?.boxBorderColor}
                        onChange={(e) => updateElement(setResp("theme", { boxBorderColor: e }))}
                        className="mt-5"
                    />
                    <ColorPick
                        label="Element Border Color"
                        value={element?.fieldBorderColor}
                        onChange={(e) => updateElement(setResp("theme", { fieldBorderColor: e }))}
                        className="mt-3.5"
                    />
                    <ColorPick
                        label="Element BG Color"
                        value={element?.fieldBgColor}
                        onChange={(e) => updateElement(setResp("theme", { fieldBgColor: e }))}
                        className="mt-3.5"
                    />
                    <ColorPick
                        label="Element Text Color"
                        value={element?.fieldTextColor}
                        onChange={(e) => updateElement(setResp("theme", { fieldTextColor: e }))}
                        className="mt-3.5"
                    />
                    <ColorPick
                        label="Error Message Color"
                        value={element?.errorMessageColor}
                        onChange={(e) => updateElement(setResp("theme", { errorMessageColor: e }))}
                        className="mt-3.5"
                    />
                    <ColorPick
                        label="Line Color"
                        value={element?.lineColor}
                        onChange={(e) => updateElement(setResp("theme", { lineColor: e }))}
                        className="mt-3.5"
                    />
                </Stylus.r>
            </motion.div>
        </AnimatePresence>
    );
};

export default SidebarThemes;