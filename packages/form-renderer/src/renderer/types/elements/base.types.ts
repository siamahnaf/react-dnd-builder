export type TBase = {
    id: string;
    type: string;
    name: string;
}

export type TBaseUnit = {
    value: string;
    unit: string;
}

export type TBaseImage = {
    alt: string;
    url: string;
}

export type TBaseChoice = { label: string, value: string }[];
export type TBaseTicks = { value: number, text: string }[]

export type TElementGeneral = Partial<{
    label: string;
    placeholder: string;
    tooltip: string;
    defaultValue: string;
    isVisible: boolean;
    readOnly: boolean;
    showTitle: boolean;
    showDescription: boolean;
}>;

export type TElementLayout = Partial<{
    collapseState: string;
    titleAlignment: string;
    descriptionAlignment: string;
    errorMessageAlignment: string;
    innerIndent: string;
    fieldWidth: {
        value?: string;
        unit?: string;
    }
}>;

export type TCondition = {
    logic?: string,
    field: string;
    operator: string;
    value: string;
}

export type TValidation = {
    id: string;
    title: string;
    errorMessage: string;
    conditions: {
        logic?: string,
        operator: string;
        option: string;
        value: string;
    }[];
    c: boolean;
}