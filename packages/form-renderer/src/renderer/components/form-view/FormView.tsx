import { useEditor } from "../../context/editor.context";

//Components
import FormPages from "../form-root/FormPages";

const FormView = () => {
    //Editor
    const { pages, settings, loading } = useEditor();

    //Settings
    const { theme, global } = settings;

    return (
        <div className="space-y-5">
            {pages.map((item, i) => (
                <FormPages item={item} key={item.id} index={i} />
            ))}
            <div className="text-right flex items-center justify-end gap-x-3">
                {loading &&
                    <p className="opacity-80 animate-pulse">Uploading Files...</p>
                }
                <button className="px-4 py-1 rounded-md border border-solid" style={{ background: theme?.accentBgColor, color: theme?.accentTextColor, borderColor: theme?.accentBgColor }} type="submit">
                    {global?.completeBtnText || "Submit"}
                </button>
            </div>
        </div>
    );
};

export default FormView;