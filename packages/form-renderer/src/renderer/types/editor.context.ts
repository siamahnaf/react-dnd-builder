import { ReactNode } from "react";
import { TDesignPage } from "./design.types";
import { TSettings } from "./settings.types";
import { FormTypes } from "./formInput";
import { PageIndexTypes, QuizFinishTypes } from "./pageIndex.types";

export type EditorContextType = {
    onUpload: ((file: File) => Promise<string>) | null;
    onCloudDelete: ((url: string) => void) | null;
    pages: TDesignPage[];
    settings: TSettings;
    indexId: string | undefined;
    form: FormTypes;
    loading: boolean;
    captchaSiteKey: string | null;
    index: PageIndexTypes;
    onQuizTimeFinish: (() => void) | null;
    quiz: QuizFinishTypes;
};

export type EditorProviderProps = {
    children?: ReactNode;
    value: EditorContextType;
}