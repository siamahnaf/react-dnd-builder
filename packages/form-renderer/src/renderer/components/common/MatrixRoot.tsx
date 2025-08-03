import { TMatrix } from "../../types/elements";
import { useEditor } from "../../context/editor.context";

interface Props {
    value?: Record<string, string>;
    onChange?: (value: Record<string, string>) => void;
    item: TMatrix;
    isReadOnly: boolean;
}

const MatrixRoot = ({ value, onChange, item, isReadOnly }: Props) => {
    //Editor
    const { settings } = useEditor();
    const { general } = item;
    const { theme } = settings;

    //Handler
    const handleSelect = (rowIndex: number, colIndex: number) => {
        if (isReadOnly) return;

        const rowText = general?.rowsData?.[rowIndex] || "";
        const columnText = general?.columnData?.[colIndex] || "";
        const cellText = general?.cells?.[`row-${rowIndex}`]?.[`column-${colIndex}`];
        const displayText = cellText || columnText;

        const newSelections = { ...value };

        if (newSelections[rowText] === displayText) {
            delete newSelections[rowText];
        } else {
            newSelections[rowText] = displayText;
        }

        onChange?.(newSelections);
    };

    return (
        <div className="overflow-auto mt-6">
            <style jsx>{`
                .checkbox-item {
                    border-color: ${theme?.fieldBorderColor};
                }
                .checkbox-item:checked {
                    border-color: ${theme?.accentBgColor};
                    background: ${theme?.accentBgColor};
                }
                .MatrixTheme {
                    background: ${theme?.accentBgColor};
                    color: white;
                }
            `}</style>
            <table className={`table-auto ${isReadOnly ? "pointer-events-none" : ""}`}>
                <thead>
                    <tr>
                        <th className="text-left px-2 py-1 whitespace-nowrap"></th>
                        {general?.columnData?.map((colLabel, colIndex) => (
                            <th key={colIndex} className="text-left px-2 py-1 whitespace-nowrap">{colLabel}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {general?.rowsData?.map((rowLabel, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="px-2 font-medium whitespace-nowrap">{rowLabel}</td>
                            {general?.columnData?.map((columnLabel, colIndex) => {
                                const cellText = general.cells?.[`row-${rowIndex}`]?.[`column-${colIndex}`];
                                const displayText = cellText || columnLabel;
                                const isSelected = value?.[rowLabel] === displayText;

                                return (
                                    <td key={colIndex} className="px-2 py-1">
                                        {cellText ? (
                                            <button className={`py-1 px-2 bg-gray-50 hover:bg-gray-100 w-full text-left rounded-md ${isSelected ? "MatrixTheme" : ""}`} onClick={() => handleSelect(rowIndex, colIndex)}>
                                                {cellText}
                                            </button>
                                        ) : (
                                            <div className="relative my-1.5 mx-4 w-max">
                                                <input
                                                    type="checkbox"
                                                    id="selectAll"
                                                    className="peer appearance-none border w-[17px] h-[17px] rounded-sm align-middle block bg-white checkbox-item cursor-pointer"
                                                    checked={isSelected}
                                                    onChange={() => handleSelect(rowIndex, colIndex)}
                                                    disabled={isReadOnly}
                                                />
                                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white p-px pointer-events-none opacity-0 invisible peer-checked:opacity-100 peer-checked:visible">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                                </span>
                                            </div>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MatrixRoot;