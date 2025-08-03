import { useState, Fragment } from "react";
import { Dialog } from "../../Dialog";

//Interface
interface Props {
    value?: Record<string, Record<string, string>>;
    onChange?: (e: Record<string, Record<string, string>>) => void;
    rows?: string[];
    columns?: string[];
    className?: string;
}

const CellsBox = ({ value, onChange, rows = [], columns = [], className = "" }: Props) => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    //Handler
    const handleChange = (rowIndex: number, colIndex: number, newVal: string) => {
        const rowKey = `row-${rowIndex}`;
        const colKey = `column-${colIndex}`;

        const updated = {
            ...value,
            [rowKey]: {
                ...(value?.[rowKey] || {}),
                [colKey]: newVal,
            },
        };
        onChange?.(updated);
    };

    return (
        <Fragment>
            <div className={`flex gap-x-8 items-center mt-2 ${className}`}>
                <button className="text-builder font-semibold" onClick={() => setOpen(true)}>Add Cell Texts</button>
                <button className="text-red-600 font-semibold">Clear</button>
            </div>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                className="p-5 min-w-[500px] w-max max-w-[calc(80vw)]"
            >
                <h4 className="text-2xl font-medium text-gray-700">Cell Texts</h4>
                {rows.length === 0 && columns.length === 0 &&
                    <p className="mt-4 font-light text-gray-600">Please add some columns and rows</p>
                }
                <div className="overflow-auto mt-6">
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="text-left px-2 py-1 whitespace-nowrap"></th>
                                {columns.map((colLabel, colIndex) => (
                                    <th key={colIndex} className="text-left px-2 py-1 whitespace-nowrap">{colLabel}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((rowLabel, rowIndex) => {
                                const rowKey = `row-${rowIndex}`;
                                return (
                                    <tr key={rowIndex}>
                                        <td className="px-4 py-1 font-medium whitespace-nowrap">{rowLabel}</td>
                                        {columns.map((_, colIndex) => {
                                            const colKey = `column-${colIndex}`;
                                            return (
                                                <td key={colIndex} className="px-2 py-1">
                                                    <textarea
                                                        className="focus:outline-none border border-solid border-gray-200 text-base py-2 px-2 rounded-lg appearance-none w-full mt-[4px] resize-none placeholder:text-gray-400 placeholder:font-light block hover:border-gray-400/80 focus:border-gray-400/80 transition-all duration-200 text-gray-800"
                                                        value={value?.[rowKey]?.[colKey] ?? ""}
                                                        onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                                                        rows={4}
                                                    />
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="text-right mt-5">
                    <button className="text-base bg-builder text-white px-4 py-2 rounded-lg" onClick={() => setOpen(false)}>
                        Save
                    </button>
                </div>
            </Dialog>
        </Fragment>
    );
};

export default CellsBox;