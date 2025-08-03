import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import { produce } from "immer";
import { useEditor } from "../../context/editor.context";
import { InputBox, Checkbox, TextareaBox, SelectBox, OptionBox, BasicShowAnimate } from "../common/control";
import { ScrollWrapper } from "../common/Scrollbar";

//Essentials
import { DeepPartial, merge, setResp } from "../../types/context/elements/init.element";
import { TSettings } from "@siamahnaf/react-form-renderer";

const EditorSubmission = () => {
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
    const element = settings.value.submission;

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
                    <h4 className="text-3xl font-medium text-gray-700">&quot;Thank you&quot; Page Settings</h4>
                    <p className="text-base text-gray-600 mt-1">You can enable submission/thank you page settings</p>
                    <OptionBox
                        label="Form Type"
                        value={element?.formType}
                        onChange={(e) => updateElement(setResp("submission", { formType: e }))}
                        className="mt-10"
                        options={[
                            { label: "Normal", value: "normal" },
                            { label: "Survey", value: "survey" }
                        ]}
                    />
                    <InputBox
                        label="Redirect to an external link after submission"
                        value={element?.redirectUrl}
                        onChange={(e) => updateElement(setResp("submission", { redirectUrl: e }))}
                        placeholder="https://your-link.com"
                        className="mt-6"
                    />
                    <Checkbox
                        id="showThankYouPage"
                        label="Show thank you page"
                        value={element?.showThankYouPage}
                        onChange={(e) => updateElement(setResp("submission", { showThankYouPage: e }))}
                        className="mt-6"
                    />
                    <TextareaBox
                        label='"Tank you" page markup'
                        placeholder="Thank you for completing the survey"
                        value={element?.pageMarkup}
                        onChange={(e) => updateElement(setResp("submission", { pageMarkup: e }))}
                        className="mt-6"
                        rows={8}
                    />
                    <Checkbox
                        id="showButton"
                        label='Include a Button on "Thank you" page'
                        value={element?.showButton}
                        onChange={(e) => updateElement(setResp("submission", { showButton: e }))}
                        className="mt-6"
                    />
                    <InputBox
                        label="Button Text"
                        value={element?.btnText}
                        onChange={(e) => updateElement(setResp("submission", { btnText: e }))}
                        placeholder="Close Now"
                        className="mt-6"
                    />
                    <SelectBox
                        label="Button Action"
                        options={[
                            { label: "Fill form again", value: "fill" },
                            { label: "Go to Link", value: "link" }
                        ]}
                        value={element?.btnAction}
                        onChange={(e) => updateElement(setResp("submission", { btnAction: e }))}
                        className="mt-6"
                    />
                    <BasicShowAnimate
                        id="buttonLinkAppear"
                        show={element?.btnAction === "link"}
                    >
                        <InputBox
                            label="Button URL"
                            value={element?.btnURL}
                            onChange={(e) => updateElement(setResp("submission", { btnURL: e }))}
                            className="mt-5"
                        />
                    </BasicShowAnimate>
                </ScrollWrapper>
            </motion.div>
        </AnimatePresence>
    );
};

export default EditorSubmission;