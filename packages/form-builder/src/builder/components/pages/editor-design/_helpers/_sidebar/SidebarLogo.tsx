import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import Stylus from "../../../../common/Stylus";
import { ImageBox, InputBox, OptionBox } from "../../../../common/control";
import { produce } from "immer";
import { useEditor } from "../../../../../context/editor.context";

//Essentials
import { DeepPartial, merge, setResp } from "../../../../../types/context/elements/init.element";
import { TSettings } from "@siamahnaf/react-form-renderer";


const SidebarLogo = () => {
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
    const element = settings.value.logo;

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
                    <ImageBox
                        label="Upload Image"
                        value={element?.logo}
                        onChange={(e) => updateElement(setResp("logo", {
                            logo: e,
                            logoWidth: { value: "100", unit: "%" },
                            logoHeight: { value: "300", unit: "px" },
                        }))}
                    />
                    <InputBox
                        label="Image Width"
                        value={element?.logoWidth?.value}
                        unit={element?.logoWidth?.unit}
                        onChange={(e) => updateElement(setResp("logo", "logoWidth", {
                            value: e
                        }))}
                        onUnitChange={(e) => updateElement(setResp("logo", "logoWidth", {
                            unit: e
                        }))}
                        placeholder="Ex. 100px"
                        className="mt-5"
                        suffix="unit"
                        inputType="int"
                    />
                    <InputBox
                        label="Image Height"
                        value={element?.logoHeight?.value}
                        unit={element?.logoHeight?.unit}
                        onChange={(e) => updateElement(setResp("logo", "logoHeight", {
                            value: e
                        }))}
                        onUnitChange={(e) => updateElement(setResp("logo", "logoHeight", {
                            unit: e
                        }))}
                        placeholder="Ex. 100px"
                        className="mt-5"
                        suffix="unit"
                        inputType="int"
                    />
                    <InputBox
                        label="Image Border Radius"
                        value={element?.borderRadius?.value}
                        unit={element?.borderRadius?.unit}
                        onChange={(e) => updateElement(setResp("logo", "borderRadius", {
                            value: e
                        }))}
                        onUnitChange={(e) => updateElement(setResp("logo", "borderRadius", {
                            unit: e
                        }))}
                        placeholder="Ex. 5px"
                        className="mt-5"
                        suffix="unit"
                        inputType="int"
                    />
                    <OptionBox
                        label="Logo Fit"
                        options={[
                            { label: "Contain", value: "contain" },
                            { label: "Cover", value: "cover" },
                            { label: "Fill", value: "fill" }
                        ]}
                        value={element?.fit}
                        onChange={(e) => updateElement(setResp("logo", { fit: e }))}
                        className="mt-5"
                    />
                    <OptionBox
                        label="Logo Position"
                        options={[
                            { label: "Top", value: "top" },
                            { label: "Bottom", value: "bottom" }
                        ]}
                        value={element?.position}
                        onChange={(e) => updateElement(setResp("logo", { position: e }))}
                        className="mt-5"
                    />
                </Stylus.r>
            </motion.div>
        </AnimatePresence>
    );
};

export default SidebarLogo;