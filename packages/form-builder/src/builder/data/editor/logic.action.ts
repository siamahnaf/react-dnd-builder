const commonFields = ["E-Signature", "RichText", "Matrix", "Captcha", "LongText", "Rating", "Datetime", "SingleLineText", "Range", "Color", "Switch", "FileUpload", "Select", "Radio", "Checkbox", "AutoComplete"];
const resetFields = commonFields.filter(x => !["E-Signature", "RichText", "Matrix", "Captcha"].includes(x));
const choiceFields = ["Select", "Radio", "Checkbox", "AutoComplete"];

export const logicActionData: Record<string, string[]> = {
    "visibleIf": commonFields,
    "readOnlyModeIf": commonFields,
    "requiredIf": commonFields,
    "resetIf": resetFields,
    "setValueIf": resetFields,
    "choiceVisibleIf": choiceFields,
    "choiceSelectableIf": choiceFields
};

export const logicActionOptions = [
    { label: "Make Visible", value: "visibleIf" },
    { label: "Make Read Only", value: "readOnlyModeIf" },
    { label: "Make Required", value: "requiredIf" },
    { label: "Reset Value", value: "resetIf" },
    { label: "Set value", value: "setValueIf" },
    { label: "Make Choice Visible", value: "choiceVisibleIf" },
    { label: "Make Choice Selectable", value: "choiceSelectableIf" }
]
