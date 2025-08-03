"use client"
import { useState, useEffect, useRef, Fragment } from "react";
import moment, { Moment } from "moment";
import { IconCalendarWeek, IconX, IconChevronLeft, IconChevronRight } from "../../icons";
import { createPortal } from "react-dom";
import { useFloating, offset, flip, shift, autoUpdate, useInteractions, useClick, useDismiss } from "@floating-ui/react"
import { AnimatePresence, motion } from "framer-motion";
import { useEditor } from "../../context/editor.context";
import { TDatetime } from "../../types/elements";
import CustomSelect from "./CustomSelect";

//Motions
const initialMotion = { opacity: 0, scale: 0.95 };
const animateMotion = { opacity: 1, scale: 1 };

//Interface
interface CalendarDay {
    date: string;
    day: string;
    isCurrentMonth: boolean;
    isDisabled?: boolean;
}
interface TimeSelection {
    hours: string;
    minutes: string;
}
interface Props {
    value?: string;
    onChange?: (e: string) => void;
    item: TDatetime;
    isReadOnly: boolean;
}

const DateTimeRoot = ({ onChange, value, item, isReadOnly }: Props) => {
    //Editor
    const { settings, form } = useEditor();
    const { name, general, layout } = item;
    const { theme } = settings;


    //State
    const [currentDate, setCurrentDate] = useState<Moment>(value ? moment(value) : moment());
    const [calendarData, setCalendarData] = useState<CalendarDay[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [selector, setSelector] = useState<"year" | "month" | "date">("date");
    const [step, setStep] = useState<"date" | "time">("date");
    const [timeSelection, setTimeSelection] = useState<TimeSelection>({ hours: "00", minutes: "00" });
    const [selectDate, setSelectDate] = useState<string>(moment(value).format("YYYY-MM-DD") ?? "");

    //Floating UI
    const { x, y, strategy, refs, context } = useFloating({
        open,
        onOpenChange: setOpen,
        placement: "bottom-start",
        middleware: [offset(4), flip(), shift({ padding: 8 })],
        whileElementsMounted: autoUpdate,
    });
    const click = useClick(context)
    const dismiss = useDismiss(context)
    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss])

    //Ref
    const triggerRef = useRef<HTMLInputElement>(null);


    // Check if date is disabled
    const isDateDisabled = (date: Moment) => {
        if (general?.minDate && date.isBefore(moment(general.minDate), "day")) {
            return true;
        }
        if (general?.maxDate && date.isAfter(moment(general.maxDate), "day")) {
            return true;
        }
        return false;
    };

    // Generate calendar data with disabled dates
    const generateCalendarData = (date: Moment) => {
        const startOfMonth = date.clone().startOf("month").startOf("week");
        const endOfMonth = date.clone().endOf("month").endOf("week");
        const calendarDays: CalendarDay[] = [];
        const currentDay = startOfMonth.clone();

        while (currentDay.isBefore(endOfMonth)) {
            calendarDays.push({
                date: currentDay.format("YYYY-MM-DD"),
                day: currentDay.format("D"),
                isCurrentMonth: currentDay.isSame(date, "month"),
                isDisabled: isDateDisabled(currentDay)
            });
            currentDay.add(1, "day");
        }
        return calendarDays;
    };

    //Handler
    const goToPreviousMonth = () => {
        setCurrentDate(
            selector === "date"
                ? currentDate.clone().subtract(1, "month")
                : selector === "month"
                    ? currentDate.clone().subtract(1, "year")
                    : currentDate.clone().subtract(10, "year")
        );
    };
    const goToNextMonth = () => {
        setCurrentDate(
            selector === "date"
                ? currentDate.clone().add(1, "month")
                : selector === "month"
                    ? currentDate.clone().add(1, "year")
                    : currentDate.clone().add(10, "year")
        );
    };
    const onSelectorChange = () => {
        setSelector(selector === "date" ? "year" : selector === "year" ? "month" : "date");
    };
    const onYearSelect = (year: number) => {
        setCurrentDate(currentDate.clone().year(year));
        setSelector("month");
    };
    const onMonthSelect = (month: number) => {
        setCurrentDate(currentDate.clone().month(month));
        setSelector("date");
    };
    const handleDateChange = (value: string) => {
        if (general?.showTime) {
            setStep("time");
            setSelectDate(value);
        } else {
            applySingleDateSelection(value);
        }
    };
    const applySingleDateSelection = (date: string) => {
        const dateTime = `${date}T${timeSelection.hours}:${timeSelection.minutes}:00`;
        onChange?.(dateTime);
        setOpen(false);
    };

    const handleTimeChange = (type: "hours" | "minutes", value: string) => {
        const timeValue = value.padStart(2, "0");
        setTimeSelection(prev => ({ ...prev, [type]: timeValue }));
    };

    const applyTimeSelection = () => {
        const date = selectDate ? moment(selectDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
        applySingleDateSelection(date);
        setStep("date");
    };

    const getDisplayValue = () => {
        if (!value) return "";

        if (general?.showTime) {
            return moment(value).format(`${general?.dateFormat || "ddd, DD MMM YYYY"} ${general.timeFormat || "HH:mm"}`);
        }
        return moment(value).format(general?.dateFormat || "ddd, DD MMM YYYY");
    };

    //Theme
    const getTheme = () => {
        switch (theme?.theme) {
            case "border":
                return "border border-solid rounded-lg";
            case "border-less":
                return "rounded-lg";
            case "underline":
                return "border-b border-solid"
        }
    }

    //Initialize Calendar
    useEffect(() => {
        setCalendarData(generateCalendarData(currentDate));

        if (value) {
            const dateMoment = moment(value);
            setTimeSelection({
                hours: dateMoment.format("HH"),
                minutes: dateMoment.format("mm")
            });
            setSelectDate(dateMoment.format("YYYY-MM-DD"));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDate, value, general?.minDate, general?.maxDate]);

    return (
        <div>
            <style jsx>{`
                .DateTime {
                    background: ${theme?.fieldBgColor};
                    border-color: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.fieldBorderColor};
                    color: ${theme?.fieldTextColor};
                    width: ${layout?.fieldWidth?.value || 100}${layout?.fieldWidth?.unit || "%"};
                    text-align: ${layout?.valueAlignment || "auto"};
                }
                .DateTimeThemeBg {
                    background: ${theme?.accentBgColor};
                }
                .DateTimeThemeText {
                    color: ${theme?.accentBgColor};
                }
                .DateTime:focus {
                    outline-color: ${form?.errors?.[name]?.message ? theme?.errorMessageColor : theme?.accentBgColor}
                }
                .DateTimeThemeBgAfter:after {
                    background: ${theme?.accentBgColor};
                }
                .DateTimeUnderline:focus {
                    outline-style: none;
                    box-shadow: ${theme?.accentBgColor} 0px 2px;
                    border-color: transparent;
                }
                .DateTimeBorderLess {
                    outline-style: none;
                }
                .IconArrowColor {
                    color: ${theme?.fieldTextColor};
                }
            `}</style>
            <div className="relative mt-[4px]">
                <input
                    {...getReferenceProps({
                        ref(node: Element | null) {
                            refs.setReference(node)
                            triggerRef.current = node as HTMLInputElement
                        },
                        value: getDisplayValue(),
                        autoComplete: "off",
                        role: "presentation",
                        readOnly: true,
                        type: "text",
                        placeholder: general?.placeholder || "Select Date"
                    })}
                    className={`${getTheme()} relative h-[48px] pl-3 pr-10 cursor-pointer text-base DateTime ${theme?.theme === "border-less" && "DateTimeBorderLess"} ${theme?.theme === "underline" && "DateTimeUnderline"} ${isReadOnly ? "pointer-events-none" : ""}`}
                />
                {!value && (
                    <span className="absolute top-1/2 right-4 pointer-events-none -translate-y-1/2 IconArrowColor">
                        <IconCalendarWeek className="text-lg text-main" />
                    </span>
                )}
                {value && (
                    <button
                        className="absolute top-1/2 right-2 -translate-y-1/2 IconArrowColor hover:bg-gray-200 p-1.5 rounded-md transition-all"
                        type="button"
                        onClick={() => { onChange?.(""); }}
                    >
                        <IconX size={20} />
                    </button>
                )}
            </div>
            {createPortal(<AnimatePresence>
                {open &&
                    <motion.div
                        {...getFloatingProps({
                            ref: refs.setFloating,
                            style: {
                                position: strategy,
                                top: y ?? 0,
                                left: x ?? 0,
                                width: triggerRef.current?.offsetWidth,
                                maxWidth: 400
                            },
                            className: "z-[99999] p-2 bg-white border border-solid rounded-lg border-gray-200/80",
                            role: "listbox"
                        })}
                        initial={initialMotion}
                        animate={animateMotion}
                        exit={initialMotion}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                        {step === "date" ? (
                            <Fragment>
                                <div className="flex justify-between mb-3 items-center">
                                    <button className="text-text-main font-bold py-1.5 px-2 rounded" onClick={goToPreviousMonth} type="button">
                                        <IconChevronLeft size={28} stroke={1.4} />
                                    </button>
                                    <div className="flex items-center justify-center">
                                        <button className="text-lg font-medium hover:bg-secondary px-2 py-px rounded-md transition-all" type="button" onClick={onSelectorChange}>
                                            {selector === "date" && currentDate.format("MMMM YYYY")}
                                            {selector === "month" && currentDate.format("YYYY")}
                                            {selector === "year" && `${Math.floor(currentDate.year() / 10) * 10}-${Math.floor(currentDate.year() / 10) * 10 + 9}`}
                                        </button>
                                    </div>
                                    <button className="text-text-main font-bold py-1.5 px-2 rounded" onClick={goToNextMonth} type="button">
                                        <IconChevronRight size={28} />
                                    </button>
                                </div>
                                {(selector === "month" || selector === "year") &&
                                    <div>
                                        {selector === "year" &&
                                            <div className="grid grid-cols-4 gap-2">
                                                {Array.from({ length: 10 }, (_, i) => {
                                                    const year = Math.floor(currentDate.year() / 10) * 10 + i
                                                    const isCurrentYear = year === moment().year()
                                                    const isSelectedYear = year === currentDate.year()

                                                    return (
                                                        <button
                                                            key={year}
                                                            type="button"
                                                            onClick={() => onYearSelect(year)}
                                                            className={`py-1.5 text-center rounded-lg transition-all ${isSelectedYear
                                                                ? "DateTimeThemeBg text-white"
                                                                : isCurrentYear
                                                                    ? "DateTimeThemeText font-medium"
                                                                    : "text-gray-600"
                                                                }`}
                                                        >
                                                            {year}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        }
                                        {selector === "month" &&
                                            <div className="grid grid-cols-3 gap-2">
                                                {moment.monthsShort().map((month, index) => {
                                                    const isCurrentMonth = index === moment().month() && currentDate.year() === moment().year()
                                                    const isSelectedMonth = index === currentDate.month()

                                                    return (
                                                        <button
                                                            key={month}
                                                            type="button"
                                                            onClick={() => onMonthSelect(index)}
                                                            className={`py-1.5 text-center rounded-lg transition-all ${isSelectedMonth
                                                                ? "DateTimeThemeBg text-white"
                                                                : isCurrentMonth
                                                                    ? "DateTimeThemeText font-medium"
                                                                    : "text-gray-600"
                                                                }`}
                                                        >
                                                            {month}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        }
                                    </div>
                                }
                                {selector === "date" &&
                                    <div className="h-full w-full relative">
                                        <table className="w-full min-w-max table-auto text-left">
                                            <thead>
                                                <tr>
                                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                                        <th key={day} className="text-center text-gray-700 p-1.5">
                                                            {day}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[...Array(6)].map((_, rowIndex) => (
                                                    <tr key={rowIndex}>
                                                        {[0, 1, 2, 3, 4, 5, 6].map((colIndex) => {
                                                            const index = rowIndex * 7 + colIndex;
                                                            const day = calendarData[index];
                                                            if (!day) return null;
                                                            const isSelected = day.date === moment(value).format('YYYY-MM-DD');
                                                            return (
                                                                <td
                                                                    key={colIndex}
                                                                    className={`select-none text-base text-center cursor-pointer p-2 ${!day?.isCurrentMonth ? "text-gray-400" : ""} ${day.isDisabled ? "text-gray-200 cursor-not-allowed" : "cursor-pointer"}`}
                                                                    onClick={() => handleDateChange(day?.date || "")}
                                                                >
                                                                    <div className={`${isSelected ? `relative text-white z-10 after:w-9 after:h-9 after:absolute DateTimeThemeBgAfter after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:-z-10 after:rounded-full` : ""} ${day?.date === moment().format("YYYY-MM-DD") && !isSelected ? "DateTimeThemeText font-semibold" : ""}`}>
                                                                        {day?.day}
                                                                    </div>
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                }
                            </Fragment>
                        ) : (
                            <div className="p-4">
                                <h3 className="text-lg font-medium opacity-90">Select Time</h3>

                                <div className="flex items-center gap-x-2 mt-4">
                                    <CustomSelect
                                        placeholder="00"
                                        value={timeSelection.hours}
                                        onChange={(e) => handleTimeChange("hours", e)}
                                        options={Array.from({ length: 24 }, (_, i) => ({ label: i.toString().padStart(2, "0"), value: i.toString().padStart(2, "0") }))}
                                    />
                                    <span className="text-gray-500">:</span>
                                    <CustomSelect
                                        placeholder="00"
                                        value={timeSelection.minutes}
                                        onChange={(e) => handleTimeChange("minutes", e)}
                                        options={Array.from({ length: 60 }, (_, i) => ({ label: i.toString().padStart(2, "0"), value: i.toString().padStart(2, "0") }))}
                                    />
                                </div>
                                <div className="flex justify-end mt-6 gap-x-4">
                                    <button
                                        className="px-4 py-1.5 border rounded-md text-gray-700 hover:bg-gray-100 border-gray-300"
                                        onClick={() => setStep('date')}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className="px-4 py-1.5 DateTimeThemeBg text-white rounded-md border border-solid"
                                        onClick={applyTimeSelection}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>}
            </AnimatePresence>, document.body)}
        </div>
    );
};

export default DateTimeRoot;