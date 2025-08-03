"use client"
import { Dialog } from "../../Dialog";

//Components
import { ImageUploader } from "../../ImageUploader";

//Interface
type ValueTypes = { url: string, alt: string, caption: string }
interface Props {
    open: boolean;
    onClose: () => void;
    onChange?: (e: ValueTypes) => void;
    value?: ValueTypes;
}

const UploaderDialog = ({ open, onClose, onChange, value }: Props) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            className="w-[500px] p-5"
        >
            <h5 className="text-gray-700 font-semibold text-xl mb-3 text-center">Upload Image</h5>
            <ImageUploader
                onChange={(e) => {
                    onChange?.(e);
                    onClose()
                }}
                value={value}
            />
        </Dialog>
    );
};

export default UploaderDialog;