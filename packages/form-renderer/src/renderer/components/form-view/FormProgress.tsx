import { useEditor } from "../../context/editor.context";

const FormProgress = () => {
    //Editor
    const { settings, index, pages } = useEditor();
    const { theme, global } = settings;

    if (!global?.showProgressBar || global?.allPageOneView) return null;

    const width = (index.value / pages.length) * 100;

    return (
        <div className="h-[8px] bg-gray-100 relative">
            <div className="absolute top-0 left-0 h-full transition-all rounded-3xl" style={{ background: theme?.accentBgColor, width: `${width}%` }} />
        </div>
    );
};

export default FormProgress;