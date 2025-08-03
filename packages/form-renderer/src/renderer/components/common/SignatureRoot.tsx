import { useRef } from "react";
import SignaturePad, { SignatureCanvasRef } from "./SigPad";
import { TSignature } from "../../types/elements";
import { IconEraser } from "../../icons";
import { useEditor } from "../../context/editor.context";

//Interface
interface Props {
    onChange: (e: () => File | undefined) => void;
    item: TSignature;
    isReadOnly: boolean;
}

const SignatureRoot = ({ item, onChange }: Props) => {
    //Editor
    const { settings } = useEditor();
    const { theme } = settings;
    const { general } = item;

    //Ref
    const ref = useRef<SignatureCanvasRef>(null);

    //Handler
    const onClear = () => {
        ref.current?.clear();
    }
    const onCanvasChange = () => {
        if (ref.current) {
            const getFile = () => {
                return ref.current?.toFile((general?.storeFormat as "image/png") || "image/png");
            };
            onChange(getFile);
        }
    }

    return (
        <div className={`relative border border-solid SigBorder rounded-lg overflow-hidden ${general?.autoScaleArea ? "w-full" : "w-max"}`}>
            <style jsx>{`
                .SigBorder {
                    border-color: ${theme?.fieldBorderColor};
                }
                .SigSizeAuto {
                    width: 100%;
                    height: 180px;
                }
                .SigSizeScale {
                    width: ${general?.areaWidth}px;
                    height: ${general?.areaHeight}px;
                }
            `}</style>
            <div className={`${general?.autoScaleArea ? "SigSizeAuto" : "SigSizeScale"}`}>
                <SignaturePad
                    canvasProps={{
                        className: "w-full h-full"
                    }}
                    ref={ref}
                    onChange={onCanvasChange}
                    background={general?.backgroundColor || "#FFFFFF"}
                    penColor={general?.strokeColor || "#000000"}
                    maxWidth={Number(general?.strokeWidth) || 2}
                    clearOnResize
                />
            </div>
            {general?.showClearButton &&
                <button className="border border-solid SigBorder px-2 py-1 rounded-md absolute top-3 right-3" onClick={onClear}>
                    <IconEraser />
                </button>
            }
        </div>
    );
};

export default SignatureRoot;