import { cloneElement, useState, useEffect, Fragment } from "react";
import { IconAlignBoxLeftMiddle, IconColumns2, IconAdjustmentsPlus } from "../../icons";
import { ScrollWrapper } from "../common/Scrollbar";

//Editor
import { useEditor } from "../../context/editor.context";

//Components
import TextStylus from "./TextStylus";
import PageStylus from "./PageStylus";
import PanelStylus from "./PanelStylus";
import TextareaStylus from "./TextareaStylus";
import RichTextStylus from "./RichTextStylus";
import SelectStylus from "./SelectStylus";
import AutoStylus from "./AutoStylus";
import CheckStylus from "./CheckStylus";
import RadioStylus from "./RadioStylus";
import SwitchStylus from "./SwitchStylus";
import RangeStylus from "./RangeStylus";
import RatingStylus from "./RatingStylus";
import DateStylus from "./DateStylus";
import ColorStylus from "./ColorStylus";
import FileStylus from "./FileStylus";
import MatrixStylus from "./MatrixStylus";
import SigStylus from "./SigStylus";
import CaptchaStylus from "./CaptchaStylus";
import ExpressionStylus from "./ExpressionStylus";
import VideoStylus from "./VideoStylus";
import ImageStylus from "./ImageStylus";
import HtmlStylus from "./HtmlStylus";

const StylusRoot = () => {
    //State
    const [step, setStep] = useState<number>(0);

    //Editor
    const { selected } = useEditor();

    //Effect
    useEffect(() => {
        setStep(0);
    }, [selected.value]);

    return (
        <Fragment>
            {(selected.value?.type !== "page" && selected.value?.type !== "Panel" && selected.value?.type !== "Expression" && selected.value?.type !== "Video" && selected.value?.type !== "Image" && selected.value?.type !== "HTML") &&
                <div className="flex border-b border-solid border-gray-100">
                    {list.map((item, i) => (
                        <button className={`flex-1 py-2 ${i === step ? "bg-builder text-white" : "text-gray-800 hover:bg-gray-100"}`} onClick={() => setStep(i)} key={i}>
                            {cloneElement(item.icon, {
                                size: 19,
                                className: "mx-auto"
                            })}
                            <span className="text-base">{item.name}</span>
                        </button>
                    ))}
                </div>
            }
            <ScrollWrapper className="flex-1 space-y-7 mt-1">
                {selected.value?.type === "SingleLineText" && <TextStylus step={step} />}
                {selected.value?.type === "page" && <PageStylus />}
                {selected.value?.type === "Panel" && <PanelStylus />}
                {selected.value?.type === "LongText" && <TextareaStylus step={step} />}
                {selected.value?.type === "RichText" && <RichTextStylus step={step} />}
                {selected.value?.type === "Select" && <SelectStylus step={step} />}
                {selected.value?.type === "AutoComplete" && <AutoStylus step={step} />}
                {selected.value?.type === "Checkbox" && <CheckStylus step={step} />}
                {selected.value?.type === "Radio" && <RadioStylus step={step} />}
                {selected.value?.type === "Switch" && <SwitchStylus step={step} />}
                {selected.value?.type === "Range" && <RangeStylus step={step} />}
                {selected.value?.type === "Rating" && <RatingStylus step={step} />}
                {selected.value?.type === "Datetime" && <DateStylus step={step} />}
                {selected.value?.type === "Color" && <ColorStylus step={step} />}
                {selected.value?.type === "FileUpload" && <FileStylus step={step} />}
                {selected.value?.type === "Matrix" && <MatrixStylus step={step} />}
                {selected.value?.type === "E-Signature" && <SigStylus step={step} />}
                {selected.value?.type === "Captcha" && <CaptchaStylus step={step} />}
                {selected.value?.type === "Expression" && <ExpressionStylus />}
                {selected.value?.type === "Video" && <VideoStylus />}
                {selected.value?.type === "Image" && <ImageStylus />}
                {selected.value?.type === "HTML" && <HtmlStylus />}
            </ScrollWrapper>
        </Fragment>
    );
};

export default StylusRoot;


const list = [
    {
        icon: <IconAlignBoxLeftMiddle />,
        name: "General"
    },
    {
        icon: <IconColumns2 />,
        name: "Layout"
    },
    {
        icon: <IconAdjustmentsPlus />,
        name: "Advance"
    }
]