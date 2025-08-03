import { IconCheck } from "../../icons";
import { useEditor } from "../../context/editor.context";

const FormSubmit = () => {
    //Editor
    const { settings } = useEditor();
    const { theme, submission } = settings;

    return (
        <div className="py-14 text-center">
            <style jsx>{`
                .BorderColor {
                    border-color: ${theme?.accentBgColor};
                }
                .ColorText {
                    color: ${theme?.accentBgColor};
                }
                .BgColor {
                    background: ${theme?.accentBgColor};
                    color: ${theme?.accentTextColor};
                }
            `}</style>
            <div className="w-[120px] h-[120px] rounded-full border-[6px] border-solid BorderColor ColorText flex items-center justify-center mx-auto">
                <IconCheck size={100} />
            </div>
            <h4 className="mt-5 text-5xl font-semibold opacity-90">Thank You </h4>
            <div dangerouslySetInnerHTML={{ __html: submission?.pageMarkup || "" }} className="mt-3" />
            {submission?.showButton &&
                <a href={submission.btnAction === "link" ? submission.btnURL : "/"} className="BgColor px-4 py-1.5 block w-max mx-auto mt-4 rounded-lg">
                    {submission.btnText || "Fill Again"}
                </a>
            }
        </div>
    );
};

export default FormSubmit;