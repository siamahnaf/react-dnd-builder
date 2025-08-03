import { useState, useEffect } from "react";
import { useEditor } from "../../context/editor.context";
import { IconAlertSquareRoundedFilled } from "../../icons";

const FormTimer = () => {
    const { settings, onQuizTimeFinish, quiz: quizTime } = useEditor();
    const { quiz } = settings;

    const initialTime = Number(quiz?.timeLimit || 0);

    const [remainingTime, setRemainingTime] = useState(initialTime);

    const getTimeUnitsToShow = (time: number) => {
        const units = {
            showDays: false,
            showHours: false,
            showMinutes: false,
            showSeconds: true
        };

        if (time >= 86400) {
            units.showDays = true;
            units.showHours = true;
            units.showMinutes = true;
        } else if (time >= 3600) {
            units.showHours = true;
            units.showMinutes = true;
        } else if (time >= 60) {
            units.showMinutes = true;
        }

        return units;
    };

    const [timeUnitsToShow] = useState(getTimeUnitsToShow(initialTime));

    useEffect(() => {
        if (remainingTime <= 0) {
            onQuizTimeFinish?.()
            quizTime.setValue(true);
        };

        const intervalId = setInterval(() => {
            setRemainingTime(prev => {
                if (prev <= 1) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [remainingTime, quizTime.value, onQuizTimeFinish]);

    const days = Math.floor(remainingTime / (3600 * 24));
    const hours = Math.floor((remainingTime % (3600 * 24)) / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    const parts = [];
    if (timeUnitsToShow.showDays) parts.push(`${days}${quiz?.unitForm === "manual" ? quiz.unitForDay : "d"}`);
    if (timeUnitsToShow.showHours) parts.push(`${hours}${quiz?.unitForm === "manual" ? quiz.unitForHour : "h"}`);
    if (timeUnitsToShow.showMinutes) parts.push(`${minutes}${quiz?.unitForm === "manual" ? quiz.unitForMinute : "m"}`);
    if (timeUnitsToShow.showSeconds) parts.push(`${seconds}${quiz?.unitForm === "manual" ? quiz.unitForSecond : "s"}`);

    return (
        <div>
            <style jsx>{`
                .BgColor {
                    background: ${quiz?.bgColor};
                    color: ${quiz?.textColor};
                    padding: ${quiz?.appearance === "box" ? "6px 14px" : "0px"};
                    font-size: ${quiz?.fontSize || 16}px;
                }
                .TimerAlignment {
                    margin-left: ${quiz?.timerAlignment === "left" ? "0" : "auto"};
                }
            `}</style>
            {!quizTime.value &&
                <div className="BgColor p-1.5 w-max font-semibold TimerAlignment rounded-md">
                    {parts.join(' ')}
                </div>
            }
            {quizTime.value &&
                <div className="text-center py-14">
                    <IconAlertSquareRoundedFilled size={80} className="mx-auto text-red-600" />
                    <h4 className="mt-2 text-4xl font-semibold opacity-90 text-red-600">Time Over</h4>
                    <p className="mt-1 text-gray-700">Form submission time is over, please try again later.</p>
                </div>
            }
        </div>
    );
};

export default FormTimer;