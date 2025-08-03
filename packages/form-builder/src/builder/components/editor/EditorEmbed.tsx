import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import { useEditor } from "../../context/editor.context";
import { ScrollWrapper } from "../common/Scrollbar";

//Components
import PrettyJson from "../pages/editor-embed/PrettyJson";
import PrettyJSX from "../pages/editor-embed/PrettyJsx";

const EditorEmbed = () => {
    //Editor
    const { design, settings } = useEditor();

    return (
        <AnimatePresence>
            <motion.div
                key="page-logic"
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.3, ease: cubicBezier(0.33, 1, 0.68, 1) }}
                className=""
            >
                <ScrollWrapper className="h-[calc(100vh-50px)] px-[350px] py-10" showAlways>
                    <h4 className="text-xl font-semibold text-gray-700 mb-2">Installation</h4>
                    <div className="border border-solid border-gray-200 p-2 rounded-xl">
                        <PrettyJSX
                            code={`npm install react-form-renderer`}
                        />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-700 mb-2 mt-8">MyComponent.tsx</h4>
                    <div className="border border-solid border-gray-200 p-2 rounded-xl">
                        <PrettyJSX
                            code={`import { ReactForm } from "react-form-renderer";
import "react-form-renderer/dist/style.css";
import { json } from "./json";

const MyComponent = () => {
    return (
        <ReactForm
            design={json}
            onUpload={onUpload}
            captchaSiteKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        />
    )
}`}
                        />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-700 mb-2 mt-8">json.ts</h4>
                    <div className="border border-solid border-gray-200 p-2 rounded-xl">
                        <PrettyJson
                            data={{
                                pages: design.value.pages,
                                settings: settings.value
                            }}
                        />
                    </div>
                </ScrollWrapper>
            </motion.div>
        </AnimatePresence>
    );
};

export default EditorEmbed;