"use client"
import { useState, useEffect, useRef } from "react";
import moment, { Moment } from "moment";
import { IconCalendarWeek, IconX, IconChevronLeft, IconChevronRight } from "../../../../icons";
import { createPortal } from "react-dom";
import { useFloating, offset, flip, shift, autoUpdate, useInteractions, useClick, useDismiss } from "@floating-ui/react"
import { AnimatePresence, motion } from "framer-motion";

const initialMotion = { opacity: 0, scale: 0.95 };
const animateMotion = { opacity: 1, scale: 1 };

interface CalendarDay {
    date: string;
    day: string;
    isCurrentMonth: boolean;
}

interface Props {
    value?: string;
    onChange?: (e: string) => void;
    placeholder?: string;
    label?: string;
    className?: string;
}

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
        });
        currentDay.add(1, "day");
    }
    return calendarDays;
};

const CalendarPick = ({ label, className, onChange, value, placeholder = "Select date" }: Props) => {
    //State
    const [currentDate, setCurrentDate] = useState<Moment>(value ? moment(value) : moment());
    const [calendarData, setCalendarData] = useState<CalendarDay[]>(generateCalendarData(currentDate));
    const [selectDate, setSelectDate] = useState<string>(moment(value).format("YYYY-MM-DD") ?? "");
    const [open, setOpen] = useState<boolean>(false);
    const [selector, setSelector] = useState<"year" | "month" | "date">("date");

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
    const handleDateChange = (value: string) => {
        setSelectDate(value);
        setOpen(false);
        onChange?.(value);
    };
    const onYearSelect = (year: number) => {
        setCurrentDate(currentDate.clone().year(year));
        setSelector("month");
    };
    const onMonthSelect = (month: number) => {
        setCurrentDate(currentDate.clone().month(month));
        setSelector("date");
    };


    //Initialize Calendar
    useEffect(() => {
        setCalendarData(generateCalendarData(currentDate));
    }, [currentDate]);

    //Reset Calendar
    useEffect(() => {
        if (!value) {
            setSelectDate("");
        } else {
            setCurrentDate(moment(value));
            setSelectDate(moment(value).format("YYYY-MM-DD"));
        }
    }, [value]);

    return (
        <div className={className}>
            {label && (
                <label
                    className="text-base font-medium text-gray-700 block"
                    htmlFor={label}
                >
                    {label}
                </label>
            )}
            <div className="relative mt-[4px]">
                <input
                    {...getReferenceProps({
                        ref(node: Element | null) {
                            refs.setReference(node)
                            triggerRef.current = node as HTMLInputElement
                        },
                        className: "focus:outline-none cursor-pointer border border-solid border-gray-200 text-base py-2 px-2 rounded-lg appearance-none w-full mt-[4px] placeholder:text-gray-400 placeholder:font-light block hover:border-gray-400/80 focus:border-gray-400/80 transition-all duration-200 text-gray-800",
                        value: selectDate ? moment(selectDate).format("ddd, DD MMM YYYY") : "",
                        id: label,
                        autoComplete: "off",
                        role: "presentation",
                        readOnly: true,
                        type: "text",
                        onClick: () => setOpen(!open),
                        placeholder: placeholder || "Select Date"
                    })}
                />
                {!selectDate && (
                    <span className="absolute top-1/2 right-4 pointer-events-none -translate-y-1/2 text-gray-500">
                        <IconCalendarWeek className="text-lg text-main" />
                    </span>
                )}
                {selectDate && (
                    <button
                        className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-600 hover:bg-gray-200 p-1.5 rounded-md transition-all"
                        type="button"
                        onClick={() => {
                            setSelectDate("");
                            onChange?.("");
                        }}
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
                            },
                            className: "z-[99999] p-2 bg-white border border-solid rounded-lg border-gray-200",
                            role: "listbox"
                        })}
                        initial={initialMotion}
                        animate={animateMotion}
                        exit={initialMotion}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                    >
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
                                                        ? "bg-builder text-white"
                                                        : isCurrentYear
                                                            ? "text-builder font-medium"
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
                                                        ? "bg-builder text-white"
                                                        : isCurrentMonth
                                                            ? "text-builder font-medium"
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
                                                    return (
                                                        <td
                                                            key={colIndex}
                                                            className={`select-none text-base text-center cursor-pointer p-2 ${!day?.isCurrentMonth ? "text-gray-400" : ""}`}
                                                            onClick={() => handleDateChange(day?.date || "")}
                                                        >
                                                            <div className={`${day?.date === selectDate ? `relative text-white z-10 after:w-9 after:h-9 after:absolute after:bg-builder after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:-z-10 after:rounded-full` : ""} ${day?.date === moment().format("YYYY-MM-DD") ? "text-builder font-semibold" : ""}`}>
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
                    </motion.div>}
            </AnimatePresence>, document.body)}
        </div>
    );
};

export default CalendarPick;