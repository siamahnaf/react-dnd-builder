"use client"
import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import { useEditor } from "../../context/editor.context";
import { ScrollWrapper } from "../common/Scrollbar";
import { FormRenderer } from "@siamahnaf/react-form-renderer";
import "@siamahnaf/react-form-renderer/dist/style.css";

const EditorPreview = () => {
    //Editor
    const { design, sidebar, header, settings, onCloudDelete, onUpload } = useEditor();

    return (
        <AnimatePresence>
            <motion.div
                key="page-logic"
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.3, ease: cubicBezier(0.33, 1, 0.68, 1) }}
            >
                <ScrollWrapper className={`px-[200px] h-[calc(100vh-50px)] ${design.value.pages.length === 0 ? "flex items-center justify-center" : ""} py-6`}>
                    {design.value.pages.length > 0 &&
                        <FormRenderer
                            design={{
                                pages: design.value.pages,
                                settings: settings.value
                            }}
                            onCloudDelete={onCloudDelete}
                            onUpload={onUpload}
                            captchaSiteKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                            previewMode={true}
                        />
                    }
                    {design.value.pages.length === 0 &&
                        <div className="text-center">
                            <h4 className="text-3xl font-medium mb-2">No Form Elements</h4>
                            <p className="font-light text-gray-700">Please add some form elements into canvas!</p>
                            <button className="mt-4 bg-builder text-white px-4 py-2 rounded-lg" onClick={() => (sidebar.setValue("form"), header.setValue("design"))}>
                                Add Element
                            </button>
                        </div>
                    }
                </ScrollWrapper>
            </motion.div>
        </AnimatePresence>
    );
};

export default EditorPreview;