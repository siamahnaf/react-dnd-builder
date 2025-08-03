import { Dispatch, SetStateAction } from "react";
import { TDesignPage } from "@siamahnaf/react-form-renderer";

export type DesignValueTypes = {
    pages: TDesignPage[];
}

export type DesignTypes = {
    value: DesignValueTypes;
    setValue: Dispatch<SetStateAction<DesignValueTypes>>;
}