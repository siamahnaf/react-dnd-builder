import { useRef, useEffect } from "react";
import { useEditor } from "../../context/editor.context";
import { TRange } from "../../types/elements";
import { useRanger, Ranger } from "../ranger";

interface Props {
    value?: number[];
    onChange?: (value: number[]) => void;
    item: TRange;
    isReadOnly: boolean;
}

const RangeRoot = ({ item, value = [10], onChange, isReadOnly }: Props) => {
    //Reading Options
    const { settings, form } = useEditor();
    const { theme } = settings;
    const { general, name } = item;

    //Helpers
    const toNumber = (val?: string, fallback = 0) => {
        const num = Number(val);
        return isNaN(num) ? fallback : num;
    };

    //Ranger
    const rangerRef = useRef<HTMLDivElement>(null)

    const rangerInstance = useRanger<HTMLDivElement>({
        getRangerElement: () => rangerRef.current,
        values: value || [10],
        min: toNumber(general?.minValue, 0),
        max: toNumber(general?.maxValue, 300),
        stepSize: toNumber(general?.step, 1),
        ticks: general?.scaleLabels?.map(a => a.value),
        onDrag: (instance: Ranger<HTMLDivElement>) => {
            const newValues = [...instance.sortedValues];

            if (general?.type === "range") {
                const minGap = toNumber(general?.minRangeLength);
                const maxGap = toNumber(general?.maxRangeLength);
                const distance = Math.abs(newValues[1] - newValues[0]);

                if (distance < minGap) return;
                if (maxGap && distance > maxGap) return;
                if (!general?.allowThumbCrossing && newValues[0] > newValues[1]) return;
            }

            onChange?.(newValues);
        },
    });

    useEffect(() => {
        form?.setValue?.(name, general?.type === "single" ? [10] : [10, 70])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [general?.type]);

    return (
        <div>
            <style jsx>{`
                .RangeTheme {
                    background: ${theme?.accentBgColor};
                }
            `}</style>
            <div ref={rangerRef} className={`relative bg-gray-200 h-[4px] rounded-full ${isReadOnly ? "pointer-events-none" : ""}`}>
                {rangerInstance.handles().map((item, i) => (
                    <button
                        key={i}
                        className="absolute top-1/2 -translate-1/2 w-[20px] h-[20px] rounded-full bg-white border border-solid border-gray-200/70 shadow-xl z-[99] p-1 group"
                        style={{ left: `${rangerInstance.getPercentageForValue(item.value)}%` }}
                        onKeyDown={item.onKeyDownHandler}
                        onMouseDown={item.onMouseDownHandler}
                        onTouchStart={item.onTouchStart}
                        role="slider"
                        aria-valuemin={rangerInstance.options.min}
                        aria-valuemax={rangerInstance.options.max}
                        aria-valuenow={item.value}
                    >
                        <span className="w-full h-full RangeTheme block rounded-full" />
                        {general?.showTooltip &&
                            <span className={`absolute -top-[38px] left-1/2 -translate-x-1/2 bg-white p-1 border border-solid border-gray-200 px-3 rounded-md ${item.isActive ? "opacity-100 visible" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"}`}>{item.value}</span>
                        }
                    </button>
                ))}
                {rangerInstance.getSteps().slice(...(general?.type === "single" ? [0, 1] : [1, 2])).map(({ left, width }, i) => (
                    <div key={i} className="absolute top-0 h-full RangeTheme rounded-full" style={{ width: `${width}%`, left: `${left}%` }}>
                    </div>
                ))}
            </div>
            {general?.showScale &&
                <div className="relative mt-3 pb-8">
                    {rangerInstance.getTicks().map(({ key, percentage }) => (
                        <div className="absolute -translate-x-1/2" style={{ left: `${percentage}%` }} key={key}>
                            <div className="h-[10px] w-[2px] bg-gray-200 mx-auto mb-0.5" />
                            <p className="text-sm opacity-80">{general.scaleLabels?.[key].text}</p>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export default RangeRoot;