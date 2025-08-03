import { useEffect, Fragment } from "react";
import { useEditor } from "../../context/editor.context";

//Components
import FormPages from "../form-root/FormPages";

//Interface
interface Props {
    onMode: (e: "onSubmit" | "onBlur" | "onChange" | "onTouched" | "all" | undefined) => void;
}

const FormStep = ({ onMode }: Props) => {
    //Editor
    const { pages, settings, indexId, loading, form, index } = useEditor();

    //Effect
    useEffect(() => {
        if (indexId) {
            const pageIndex = pages.findIndex(p => p.id === indexId || p.elements.some(e => e.id === indexId || ("elements" in e && e.elements?.some(i => i.id === indexId))));

            if (pageIndex !== -1) index.setValue(pageIndex);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [indexId]);

    //Settings
    const { theme, global } = settings;

    //Handler
    const onNext = async () => {
        const allElements = pages[index.value].elements?.flatMap(el => "elements" in el && el.elements ? [el, ...el.elements] : [el]).filter(el => !["Panel", "Expression", "Video", "Image", "HTML"].includes(el.type)).map((a) => a.name) || [];
        const isValid = await form?.trigger?.(allElements, { shouldFocus: true });
        if (isValid) {
            if (index.value >= pages.length - 1) return;
            index.setValue(prev => prev + 1);
            onMode("onSubmit")
        } else {
            onMode("onChange")
        }
    }
    const onPrev = () => {
        if (index.value <= 0) return;
        index.setValue(prev => prev - 1);
        onMode("onSubmit")
    }

    return (
        <Fragment>
            {pages.map((item, i) => (
                <div className={`${i === index.value ? "block" : "hidden"}`} key={i}>
                    <FormPages item={item} index={i} />
                </div>
            ))}
            <div className="flex items-center gap-2 mt-8 justify-end">
                {loading &&
                    <p className="opacity-80 animate-pulse">Uploading Files...</p>
                }
                {index.value !== 0 && global?.showPreviousButton &&
                    <button className="px-4 py-1 rounded-md border border-solid font-medium" style={{ color: theme?.accentBgColor, borderColor: theme?.accentBgColor }} onClick={onPrev} type="button">
                        Back
                    </button>
                }
                {pages.length - 1 !== index.value &&
                    <button className="px-4 py-1 rounded-md border border-solid" style={{ background: theme?.accentBgColor, color: theme?.accentTextColor, borderColor: theme?.accentBgColor }} onClick={onNext} type="button">
                        Next
                    </button>
                }
                {pages.length - 1 === index.value &&
                    <button className="px-4 py-1 rounded-md border border-solid" style={{ background: theme?.accentBgColor, color: theme?.accentTextColor, borderColor: theme?.accentBgColor }} type="submit">
                        {global?.completeBtnText || "Submit"}
                    </button>
                }
            </div>
        </Fragment>
    );
};

export default FormStep;