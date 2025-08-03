import { Dialog } from "./Dialog";
import { IconTrash } from "../../icons";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message?: string;
}

const Confirmation = ({ open, onClose, onConfirm, message = "Are you want to remove?" }: Props) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            className="w-[390px] p-5 text-center"
        >
            <IconTrash size={85} stroke={1.7} className="text-red-600 mx-auto" />
            <h4 className="text-2xl font-semibold text-gray-800 mt-6">{message}</h4>
            <p className="text-base font-light mt-1.5 text-gray-700">This action can&apos;t be undone, please be careful to this action</p>
            <div className="flex gap-x-4 mt-6">
                <button className="flex-1 text-builder  border border-solid border-builder rounded-lg font-semibold" onClick={onClose}>
                    Cancel
                </button>
                <button className="flex-1 bg-builder text-white py-2.5 rounded-lg px-4" onClick={onConfirm}>
                    Confirm
                </button>
            </div>
        </Dialog>
    );
};

export default Confirmation;