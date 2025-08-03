import { IconX } from "../../../../../icons";

//Interface
interface Props {
    onClose: () => void;
}

const PreviewHeader = ({ onClose }: Props) => {
    return (
        <div className="bg-gray-50 py-3 px-4">
            <div className="flex items-center gap-x-6">
                <p className="flex-1 text-base">22:32</p>
                <button className="hover:bg-builder p-1.5 rounded-full hover:text-white transition-all duration-150" onClick={onClose}>
                    <IconX size={18} />
                </button>
            </div>
            <h4 className="bg-gray-200 mt-3 text-center rounded-md py-1.5 w-[80%] mx-auto text-sm text-builder-secondary font-medium">Preview</h4>
        </div>
    );
};

export default PreviewHeader;