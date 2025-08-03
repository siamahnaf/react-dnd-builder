import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import Stylus from "../../../../common/Stylus";
import { Checkbox, InputBox } from "../../../../common/control";
import { produce } from "immer";
import { useEditor } from "../../../../../context/editor.context";

//Essentials
import { DeepPartial, merge, setResp } from "../../../../../types/context/elements/init.element";
import { TSettings } from "@siamahnaf/react-form-renderer";

const SidebarSettings = () => {
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
    const element = settings.value.global;

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
                    <InputBox
                        label="Required Element Symbol"
                        placeholder="*"
                        value={element?.requiredQuestionSymbol}
                        onChange={(e) => updateElement(setResp("global", { requiredQuestionSymbol: e }))}
                    />
                    <Checkbox
                        id="allPageInOneView"
                        label="All page in one view"
                        value={element?.allPageOneView}
                        onChange={(e) => updateElement(setResp("global", { allPageOneView: e }))}
                        className="mt-3"
                    />
                    <Checkbox
                        id="showPreviousBtn"
                        label="Show previous button"
                        value={element?.showPreviousButton}
                        onChange={(e) => updateElement(setResp("global", { showPreviousButton: e }))}
                        className="mt-3"
                    />
                    <Checkbox
                        id="showProgressBar"
                        label="Show Progress Bar"
                        value={element?.showProgressBar}
                        onChange={(e) => updateElement(setResp("global", { showProgressBar: e }))}
                        className="mt-3"
                    />
                    <InputBox
                        label="Previous Button Text"
                        placeholder="Ex. Back"
                        value={element?.previousBtnText}
                        onChange={(e) => updateElement(setResp("global", { previousBtnText: e }))}
                        className="mt-5"
                    />
                    <InputBox
                        label="Next Button Text"
                        placeholder="Ex. Next"
                        value={element?.nextBtnText}
                        onChange={(e) => updateElement(setResp("global", { nextBtnText: e }))}
                        className="mt-5"
                    />
                    <InputBox
                        label="Complete Button Text"
                        placeholder="Ex. Submit"
                        value={element?.completeBtnText}
                        onChange={(e) => updateElement(setResp("global", { completeBtnText: e }))}
                        className="mt-5"
                    />
                </Stylus.r>
            </motion.div>
        </AnimatePresence>
    );
};

export default SidebarSettings;