import { TBase, TSingleText, TLongText, TRichText, TSelect, TAutocomplete, TCheckbox, TRadio, TSwitch, TRange, TRating, TDatetime, TColor, TFileUpload, TMatrix, TSignature, TCaptcha, TExpression, TVideo, TImage, THtml, TBaseImage, TBaseUnit } from "./elements";
import { TSettings } from "./settings.types";

export type TInputElement = TSingleText | TLongText | TRichText | TSelect | TAutocomplete | TCheckbox | TRadio | TSwitch | TRange | TRating | TDatetime | TColor | TFileUpload | TMatrix | TSignature | TCaptcha;

export type TLayoutElement = TExpression | TVideo | TImage | THtml;

export type TDesignElement = TInputElement | TLayoutElement;

export type TPanel = TBase & Partial<{
    name: string;
    description: string;
    showName: boolean;
    showDescription: boolean;
    spacing: string;
    appearance: string;
    elements: TDesignElement[];
}>

export type TDesignPage = TBase & {
    name?: string;
    description?: string;
    image?: TBaseImage;
    imageWidth?: TBaseUnit;
    imageHeight?: TBaseUnit;
    imageRadius?: TBaseUnit;
    elements: (TDesignElement | TPanel)[];
}

export type TDesignJSON = {
    pages: TDesignPage[];
    settings: TSettings;
}