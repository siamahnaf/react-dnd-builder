import { TBaseImage, TBaseUnit } from "./elements";

export type TSettings = {
    general?: Partial<{
        showFormDetails: boolean;
        title: string;
        titleFontSize: string;
        description: string;
        descriptionFontSize: string;
        marginBottom: TBaseUnit;
        marginTop: TBaseUnit;
        titleColor: string;
        descriptionColor: string;
    }>;
    logo?: Partial<{
        logo: TBaseImage;
        logoWidth: TBaseUnit;
        logoHeight: TBaseUnit;
        borderRadius: TBaseUnit;
        fit: string;
        position: string;
    }>;
    theme?: Partial<{
        theme: string;
        appearance: string;
        bodyColor: string;
        bodyBackgroundColor: string;
        accentBgColor: string;
        accentTextColor: string;
        boxOpacity: string;
        boxColor: string;
        enableBoxBorder: boolean;
        boxBorderColor: string;
        fieldBorderColor: string;
        fieldBgColor: string;
        fieldTextColor: string;
        errorMessageColor: string;
        lineColor: string;
    }>;
    pages?: Partial<{
        showPageTitle: boolean;
        showPageDesc: boolean;
        showPageNumber: boolean;
        showPageImg: boolean;
    }>;
    global?: Partial<{
        requiredQuestionSymbol: string;
        allPageOneView: boolean;
        showPreviousButton: boolean;
        showProgressBar: boolean;
        previousBtnText: string;
        nextBtnText: string;
        completeBtnText: string;
    }>,
    submission?: Partial<{
        formType: string;
        redirectUrl: string;
        showThankYouPage: boolean;
        pageMarkup: string;
        showButton: boolean;
        btnText: string;
        btnAction: string;
        btnURL: string;
    }>,
    quiz?: Partial<{
        useTimer: boolean;
        timerAlignment: string;
        timeLimit: string;
        bgColor: string;
        textColor: string;
        unitForm: string;
        unitForSecond: string;
        unitForMinute: string;
        unitForHour: string;
        unitForDay: string;
        appearance: string;
        fontSize: string;
    }>
}