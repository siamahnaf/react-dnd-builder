import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import Stylus from "../../../../common/Stylus";
import { Checkbox } from "../../../../common/control";
import { produce } from "immer";
import { useEditor } from "../../../../../context/editor.context";

//Essentials
import { DeepPartial, merge, setResp } from "../../../../../types/context/elements/init.element";
import { TSettings } from "@siamahnaf/react-form-renderer";

const SidebarPages = () => {
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
    const element = settings.value.pages;

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
                        id="showPageTitle"
                        label="Show page title"
                        value={element?.showPageTitle}
                        onChange={(e) => updateElement(setResp("pages", { showPageTitle: e }))}
                    />
                    <Checkbox
                        id="showPageDesc"
                        label="Show page description"
                        value={element?.showPageDesc}
                        onChange={(e) => updateElement(setResp("pages", { showPageDesc: e }))}
                        className="mt-3"
                    />
                    <Checkbox
                        id="showPageNumber"
                        label="Show page number"
                        value={element?.showPageNumber}
                        onChange={(e) => updateElement(setResp("pages", { showPageNumber: e }))}
                        className="mt-3"
                    />
                    <Checkbox
                        id="showPageImg"
                        label="Show page image"
                        value={element?.showPageImg}
                        onChange={(e) => updateElement(setResp("pages", { showPageImg: e }))}
                        className="mt-3"
                    />
                </Stylus.r>
            </motion.div>
        </AnimatePresence>
    );
};

export default SidebarPages;