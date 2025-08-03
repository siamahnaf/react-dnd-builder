import { TSettings } from "@siamahnaf/react-form-renderer"

export const settingData: TSettings = {
    general: {
        showFormDetails: true
    },
    logo: {
        fit: "cover",
        position: "bottom"
    },
    theme: {
        theme: "border",
        appearance: "box",
        bodyColor: "#364153",
        bodyBackgroundColor: "#FFFFFF",
        accentBgColor: "#2563EB",
        accentTextColor: "#FFFFFF",
        boxColor: "#FFFFFF",
        enableBoxBorder: true,
        boxBorderColor: "#f3f4f6",
        fieldBorderColor: "#e5e7eb",
        fieldBgColor: "#FFFFFF",
        fieldTextColor: "#364153",
        errorMessageColor: "#FF0000",
        lineColor: "#e5e7eb"
    },
    pages: {
        showPageTitle: true,
        showPageDesc: true,
        showPageImg: true
    },
    global: {
        requiredQuestionSymbol: "*",
        showPreviousButton: true,
        previousBtnText: "Go Back",
        nextBtnText: "Next",
        completeBtnText: "Submit"
    },
    submission: {
        formType: "normal",
        showThankYouPage: true
    },
    quiz: {
        timerAlignment: "left",
        unitForm: "auto",
        appearance: "box",
        bgColor: "#2563EB",
        textColor: "#FFFFFF"
    }
}