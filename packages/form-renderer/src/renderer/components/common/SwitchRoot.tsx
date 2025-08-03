import { useEditor } from "../../context/editor.context";
import { TSwitch } from "../../types/elements";

interface Props {
    value?: boolean;
    onChange?: (value: boolean) => void;
    item: TSwitch;
    isReadOnly: boolean;
}

const SwitchRoot = ({ value = false, onChange, item, isReadOnly }: Props) => {
    //Reading Options
    const { settings } = useEditor();
    const { theme } = settings;
    const { general } = item;

    return (
        <div>
            <label className={`inline-flex items-center ${general?.enableLabel ? "gap-x-2" : ""}`}>
                {general?.enableLabel &&
                    <div className="text-base opacity-95">
                        {general.swap ? (general.labelForTrue || "Yes") : (general.labelForFalse || "No")}
                    </div>
                }
                <div className={`relative w-11 h-6 bg-gray-200 cursor-pointer Switch rounded-full ${isReadOnly ? "pointer-events-none" : ""} ${value ? "after:translate-x-full after:border-white SwitchOn" : ""} after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`} onClick={() => onChange?.(!value)} />
                {general?.enableLabel &&
                    <div className="text-base opacity-95">
                        {general.swap ? (general.labelForFalse || "No") : (general.labelForTrue || "Yes")}
                    </div>
                }
            </label>
            <style jsx>{`
                .SwitchOn {
                    background: ${theme?.accentBgColor};
                }
            `}</style>
        </div>
    );
};

export default SwitchRoot;