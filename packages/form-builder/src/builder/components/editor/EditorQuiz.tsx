import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import { useEditor } from "../../context/editor.context";
import { produce } from "immer";
import { InputBox, Checkbox, OptionBox, ColorPick, BasicShowAnimate } from "../common/control";
import { ScrollWrapper } from "../common/Scrollbar";

//Essentials
import { DeepPartial, merge, setResp } from "../../types/context/elements/init.element";
import { TSettings } from "@siamahnaf/react-form-renderer";

const EditorQuiz = () => {
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
    const element = settings.value.quiz;

    return (
        <AnimatePresence>
            <motion.div
                key="page-logic"
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.3, ease: cubicBezier(0.33, 1, 0.68, 1) }}
            >
                <ScrollWrapper className="h-[calc(100vh-50px)] px-[350px] py-10" showAlways>
                    <h4 className="text-3xl font-medium text-gray-700">Quiz Mode Settings</h4>
                    <p className="text-base text-gray-600 mt-1">You can manage or enable quiz mode settings from this page </p>
                    <Checkbox
                        id="useTimer"
                        label="Show a timer"
                        value={element?.useTimer}
                        onChange={(e) => updateElement(setResp("quiz", { useTimer: e }))}
                        className="mt-6"
                    />
                    <div className={` transition duration-300 ${element?.useTimer ? "opacity-100" : "opacity-60 pointer-events-none"}`}>
                        <OptionBox
                            label="Timer Alignment"
                            options={[
                                { label: "Left", value: "left" },
                                { label: "Right", value: "right" }
                            ]}
                            value={element?.timerAlignment}
                            onChange={(e) => updateElement(setResp("quiz", { timerAlignment: e }))}
                            className="mt-6"
                        />
                        <InputBox
                            label="Time limit to complete the survey"
                            placeholder="Ex. 0 seconds"
                            value={element?.timeLimit}
                            onChange={(e) => updateElement(setResp("quiz", { timeLimit: e }))}
                            className="mt-6"
                            inputType="int"
                        />
                        <ColorPick
                            label="Background Color"
                            value={element?.bgColor}
                            onChange={(e) => updateElement(setResp("quiz", { bgColor: e }))}
                            className="mt-5"
                        />
                        <ColorPick
                            label="Background Color"
                            value={element?.textColor}
                            onChange={(e) => updateElement(setResp("quiz", { textColor: e }))}
                            className="mt-5"
                        />
                        <OptionBox
                            label="Timer Unit Type"
                            value={element?.unitForm}
                            onChange={(e) => updateElement(setResp("quiz", { unitForm: e }))}
                            className="mt-5"
                            options={[
                                { label: "Auto Generated", value: "auto" },
                                { label: "Manual", value: "manual" }
                            ]}
                        />
                        <BasicShowAnimate
                            id="timerUnitAppear"
                            show={element?.unitForm === "manual"}

                        >
                            <InputBox
                                label="Unit for Second"
                                value={element?.unitForSecond}
                                onChange={(e) => updateElement(setResp("quiz", { unitForSecond: e }))}
                                className="mt-5"
                            />
                            <InputBox
                                label="Unit for Minute"
                                value={element?.unitForMinute}
                                onChange={(e) => updateElement(setResp("quiz", { unitForMinute: e }))}
                                className="mt-5"
                            />
                            <InputBox
                                label="Unit for Hour"
                                value={element?.unitForHour}
                                onChange={(e) => updateElement(setResp("quiz", { unitForHour: e }))}
                                className="mt-5"
                            />
                            <InputBox
                                label="Unit for Day"
                                value={element?.unitForDay}
                                onChange={(e) => updateElement(setResp("quiz", { unitForDay: e }))}
                                className="mt-5"
                            />
                        </BasicShowAnimate>
                        <OptionBox
                            label="Timer Appearance"
                            value={element?.appearance}
                            onChange={(e) => updateElement(setResp("quiz", { appearance: e }))}
                            className="mt-5"
                            options={[
                                { label: "Box", value: "box" },
                                { label: "Plain", value: "plain" }
                            ]}
                        />
                        <InputBox
                            label="Font Size"
                            value={element?.fontSize}
                            onChange={(e) => updateElement(setResp("quiz", { fontSize: e }))}
                            className="mt-5"
                        />
                    </div>
                </ScrollWrapper>
            </motion.div>
        </AnimatePresence>
    );
};

export default EditorQuiz;