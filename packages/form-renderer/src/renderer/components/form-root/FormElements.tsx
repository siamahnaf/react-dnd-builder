import { Fragment } from "react";
import { TDesignElement, TPanel } from "../../types/design.types";
import { useEditor } from "../../context/editor.context";

//Components
import { SingleLineText, LongText, RichText, Select, AutoComplete, Checkbox, Radio, Switch, Range, Rating, Datetime, Color, FileUpload, Matrix, Signature, Captcha, Panel, Expression, Video, Images, Html } from "../form-component";

//Interface
interface Props {
    elements: TDesignElement[] | TPanel[];
}

const FormElements = ({ elements }: Props) => {
    //Editor
    const { settings } = useEditor();
    const { theme } = settings;

    return (
        <div className="grid grid-cols-12 gap-5">
            {elements.map((item) => (
                <Fragment key={item.id}>
                    {item.type === "Panel" &&
                        <div
                            className={`col-span-12 ${(item as TPanel).appearance === "box" ? "border border-solid px-5 py-4 rounded-lg" : ""}`}
                            style={{
                                borderColor: theme?.enableBoxBorder ? theme.boxBorderColor : "transparent",
                            }}
                        >
                            <Panel item={item} />
                            <FormElements elements={(item as TPanel).elements || []} />
                        </div>
                    }
                    {item.type === "SingleLineText" && <SingleLineText item={item} />}
                    {item.type === "LongText" && <LongText item={item} />}
                    {item.type === "RichText" && <RichText item={item} />}
                    {item.type === "Select" && <Select item={item} />}
                    {item.type === "AutoComplete" && <AutoComplete item={item} />}
                    {item.type === "Checkbox" && <Checkbox item={item} />}
                    {item.type === "Radio" && <Radio item={item} />}
                    {item.type === "Switch" && <Switch item={item} />}
                    {item.type === "Range" && <Range item={item} />}
                    {item.type === "Rating" && <Rating item={item} />}
                    {item.type === "Datetime" && <Datetime item={item} />}
                    {item.type === "Color" && <Color item={item} />}
                    {item.type === "FileUpload" && <FileUpload item={item} />}
                    {item.type === "Matrix" && <Matrix item={item} />}
                    {item.type === "E-Signature" && <Signature item={item} />}
                    {item.type === "Captcha" && <Captcha item={item} />}
                    {item.type === "Expression" && <Expression item={item} />}
                    {item.type === "Video" && <Video item={item} />}
                    {item.type === "Image" && <Images item={item} />}
                    {item.type === "HTML" && <Html item={item} />}
                </Fragment>
            ))}
        </div>
    );
};

export default FormElements;