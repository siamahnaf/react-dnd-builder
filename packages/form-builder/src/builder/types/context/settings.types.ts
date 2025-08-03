import { Dispatch, SetStateAction } from "react";
import { TSettings } from "@siamahnaf/react-form-renderer";

export type SettingTypes = {
    value: TSettings;
    setValue: Dispatch<SetStateAction<TSettings>>;
}