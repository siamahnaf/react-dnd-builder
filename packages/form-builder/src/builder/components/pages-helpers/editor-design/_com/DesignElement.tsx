import { IconAlertSquareRoundedFilled, IconSquareRoundedCheck } from "../../../../icons";
import { useEditor } from "../../../../context/editor.context";

//Types
import { TInputElement } from "@siamahnaf/react-form-renderer";

//Components
import ElementSettings from "../_helpers/ElementSettings";
import ElementDropper from "../_helpers/ElementDropper";

//Interface
interface Props {
    item: TInputElement;
}

const DesignElement = ({ item }: Props) => {
    //Editor
    const { selected } = useEditor();

    return (
        <ElementDropper id={item.id}>
            <div className={`border rounded-xl select-none cursor-pointer transition-all duration-300 ${item.id === selected.value?.id ? "bg-gray-50 border-builder border-solid p-5 outline-1 outline-builder" : "border-dashed border-gray-400 bg-white p-3 hover:bg-gray-50 hover:border-gray-200 hover:border-solid"}`} onClick={() => selected.setValue({ id: item.id, type: item.type })}>
                <h4 className="text-sm text-gray-700">{`<${item.type}/>`}</h4>
                <div className="flex items-center mt-1.5 gap-1">
                    {!item.name ?
                        <IconAlertSquareRoundedFilled className="text-red-500" size={20} />
                        :
                        <IconSquareRoundedCheck className="text-green-600" size={20} />
                    }
                    <p className="text-base font-medium text-gray-700">{item.general?.label}</p>
                </div>
                {item.general?.tooltip &&
                    <p className="text-sm font-light text-gray-500 mt-0.5">{item.general.tooltip}</p>
                }
                <div className="border border-solid border-gray-200/70 mt-2 h-[40px] rounded-md bg-gray-50/80 flex items-center px-3">
                    <span className="text-base text-gray-400 font-light">{item.type}</span>
                </div>
            </div>
            <ElementSettings id={item.id} type={item.type} />
        </ElementDropper>

    );
};

export default DesignElement;