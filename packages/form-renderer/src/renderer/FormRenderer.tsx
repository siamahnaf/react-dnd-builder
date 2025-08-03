"use client"
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TDesignJSON } from "./types/design.types";

//Components
import FormProgress from "./components/form-view/FormProgress";
import FormHeader from "./components/form-view/FormHeader";
import FormStep from "./components/form-view/FormStep";
import FormView from "./components/form-view/FormView";
import FormSubmit from "./components/form-view/FormSubmit";
import FormTimer from "./components/form-view/FormTimer";

//Context
import { EditorProvider } from "./context/editor.context";

//Inputs
import { FormInput } from "./types/formInput";

//Interface
interface Props {
    design: TDesignJSON;
    onUpload?: (file: File) => Promise<string>;
    onCloudDelete?: (url: string | null) => void;
    captchaSiteKey?: string;
    onSubmit?: (e: FormInput) => void;
    onQuizTimeFinish?: () => void;
    previewMode?: boolean;
    indexId?: string;
}

const FormRenderer = ({ design, previewMode = false, indexId, onUpload, onCloudDelete, captchaSiteKey, onSubmit, onQuizTimeFinish }: Props) => {
    //State
    const [loading, setLoading] = useState<boolean>(false);
    const [mode, setMode] = useState<"onSubmit" | "onBlur" | "onChange" | "onTouched" | "all" | undefined>("onSubmit");
    const [index, setIndex] = useState<number>(0);
    const [success, setSuccess] = useState<boolean>(false);
    const [isFinished, setFinished] = useState<boolean>(false);

    //Form
    const {
        register,
        control,
        handleSubmit,
        getValues,
        formState: { errors },
        watch,
        setValue,
        trigger
    } = useForm<FormInput>({
        mode: mode
    });

    //Handler
    const onFormSubmit: SubmitHandler<FormInput> = async (value) => {
        const finalData: Record<string, string> = {};
        const uploads: Promise<[string, string | null]>[] = [];

        for (const [key, val] of Object.entries(value)) {
            if (typeof val === "function") {
                const file = val();
                if (file && onUpload) uploads.push(onUpload(file).then(url => [key, url || ""]));
                else finalData[key] = "";
            } else {
                finalData[key] = val;
            }
        }
        if (uploads.length > 0) {
            setLoading(true);
            (await Promise.all(uploads)).forEach(([k, v]) => finalData[k] = v || "");
            setLoading(false);
        }

        const { formType, showThankYouPage, redirectUrl } = design.settings.submission ?? {};
        const shouldSetSuccess = previewMode || (!previewMode && formType !== "normal" && showThankYouPage);
        if (shouldSetSuccess) setSuccess(true);
        onSubmit?.(finalData);
        if (redirectUrl) window.open(redirectUrl, "_blank");
    }

    return (
        <EditorProvider value={{
            onUpload: onUpload || null,
            onCloudDelete: onCloudDelete || null,
            pages: design.pages,
            settings: design.settings,
            indexId: indexId,
            form: {
                register,
                errors,
                getValues,
                setValue,
                watch,
                control,
                trigger
            },
            loading,
            captchaSiteKey: captchaSiteKey || null,
            index: { value: index, setValue: setIndex },
            onQuizTimeFinish: onQuizTimeFinish || null,
            quiz: { value: isFinished, setValue: setFinished }
        }}>
            <FormProgress />
            {(!success && !indexId && design.settings.quiz?.useTimer) && <FormTimer />}
            {!success && !isFinished &&
                <div className="px-4 py-3" style={{ background: design.settings.theme?.bodyBackgroundColor, color: design.settings.theme?.bodyColor }}>
                    <FormHeader />
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        {design.settings.global?.allPageOneView ? (
                            <FormView />
                        ) : (
                            <FormStep onMode={(e) => setMode(e)} />
                        )}
                    </form>
                </div>
            }
            {success &&
                <FormSubmit />
            }
        </EditorProvider>
    );
};

export default FormRenderer;