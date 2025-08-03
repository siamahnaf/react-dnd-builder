import { Rating } from "@siamf/rating";
import { TRating } from "../../types/elements";

interface Props {
    value?: number;
    onChange?: (value: number) => void;
    item: TRating;
    isReadOnly: boolean;
}

const RatingRoot = ({ value = 0, onChange, item, isReadOnly }: Props) => {
    //Editor
    const { general } = item;

    return (
        <div>
            <style jsx>{`
                .RatingTheme {
                    background: ${general?.fillColor || "#F9B004"};
                }
                .RatingEmpty {
                    background: ${general?.emptyColor || "#FFFFFF"};
                }
            `}</style>
            <div className={`w-max ${general?.labelAlignment === "left-right" ? "flex gap-x-2 items-center" : ""}`}>
                {general?.tooltipType === "label" &&
                    <p className="opacity-90">{general.minValueLabel}</p>
                }
                {general?.ratingIcon === "label" ?
                    <div className="flex gap-2.5 flex-wrap">
                        {general.ratingTicks?.map((item, i) => (
                            <div className={`flex-[0_0_40px] w-[40px] h-[40px] border border-solid rounded-full flex items-center justify-center border-gray-200 opacity-85 hover:bg-gray-200 cursor-pointer select-none ${item.value === value ? "RatingTheme text-white" : "RatingEmpty"}`} key={i} onClick={() => onChange?.(item.value)}>
                                {item.text}
                            </div>
                        ))}
                        {general.tooltipType === "tooltip" &&
                            <div className="px-5 bg-black flex items-center rounded-md text-white text-base">
                                {value}
                            </div>
                        }
                    </div> :
                    <Rating
                        value={value}
                        onChange={(e) => onChange?.(e)}
                        maxRating={Number(general?.ratingCount) || 5}
                        fractions={Number(general?.step) || 0.5}
                        readOnly={isReadOnly}
                        size={30}
                        icon={general?.ratingIcon === "smile" ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M8 15a5 5 0 0 0 4 2a5 5 0 0 0 4-2M8.009 9H8m8 0h-.009" /></g></svg> : undefined}
                        toolTip={general?.tooltipType === "tooltip"}
                        fillColor={general?.fillColor}
                        emptyColor={general?.emptyColor}
                    />
                }
                {general?.tooltipType === "label" &&
                    <p className="text-right opacity-90">{general.maxValueLabel}</p>
                }
            </div>
        </div>
    );
};

export default RatingRoot;