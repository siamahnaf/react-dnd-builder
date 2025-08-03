"use client"
//Store
import { useEditor } from "../../context/editor.context";

//Essentials
import { ContainerBlockTypes } from "../../types/context/design.types";
import { containerData } from "../../data/default/container.data";

//Interface
interface Props {
    onClose: () => void;
}

const GridBox = ({ onClose }: Props) => {
    //Store
    const { design, selected } = useEditor();

    const onGridHandler = (tml: string, columnCount: number) => {
        const rootContainer: ContainerBlockTypes = {
            ...containerData,
            id: crypto.randomUUID(),
            nodes: [],
            layout: {
                ...containerData.layout,
                container: {
                    ...containerData.layout.container,
                    display_type: { mobile: "grid", tablet: "grid", desktop: "grid" },
                    grid_type: { mobile: tml, tablet: tml, desktop: tml },
                    gaps: {
                        mobile: { column: "10", row: "10", unit: "px" },
                        tablet: { column: "10", row: "10", unit: "px" },
                        desktop: { column: "10", row: "10", unit: "px" }
                    }
                }
            }
        }
        const columns = Math.max(1, columnCount);
        for (let i = 0; i < columns; i++) {
            rootContainer.nodes.push({
                ...containerData,
                id: crypto.randomUUID(),
                nodes: []
            });
        }

        design.setValue(prev => ({ ...prev, rows: [...prev.rows, rootContainer] }));
        selected.setValue({ id: rootContainer.id, type: rootContainer.type, name: rootContainer.name });
        onClose();
    }


    return (
        <div className="grid grid-cols-4 gap-4 mt-5 w-[45%] mx-auto [&_div]:grid [&_div]:gap-[1px] [&_div]:cursor-pointer [&_div_div]:h-[44px] [&_div_div]:bg-[#d5d8dc] [&_div_div]:group-hover:bg-[#515962]">
            <div className="grid-cols-2 group" onClick={() => onGridHandler("repeat(1, 1fr)", 1)}>
                <div className="col-span-2" />
            </div>
            <div className="grid-cols-2 group" onClick={() => onGridHandler("repeat(2, 1fr)", 2)}>
                <div />
                <div />
            </div>
            <div className="grid-cols-3 group" onClick={() => onGridHandler("repeat(3, 1fr)", 3)}>
                <div />
                <div />
                <div />
            </div>
            <div className="grid-cols-4 group" onClick={() => onGridHandler("repeat(4, 1fr)", 4)}>
                <div />
                <div />
                <div />
                <div />
            </div>
            <div className="grid-cols-3 group" onClick={() => onGridHandler("1fr 2fr", 2)}>
                <div />
                <div className="col-span-2" />
            </div>
            <div className="grid-cols-3 group" onClick={() => onGridHandler("2fr 1fr", 2)}>
                <div className="col-span-2" />
                <div />
            </div>
            <div className="grid-cols-6 group" onClick={() => onGridHandler("1fr 2fr 1fr 2fr", 4)}>
                <div />
                <div className="col-span-2" />
                <div />
                <div className="col-span-2" />
            </div>
            <div className="grid-cols-6 group" onClick={() => onGridHandler("2fr 1fr 2fr 1fr", 4)}>
                <div className="col-span-2" />
                <div />
                <div className="col-span-2" />
                <div />
            </div>
        </div>
    );
};

export default GridBox;