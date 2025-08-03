import { Dispatch, SetStateAction } from "react";

export type DeviceTypes = {
    value: "desktop" | "tablet" | "mobile";
    setValue: Dispatch<SetStateAction<"desktop" | "tablet" | "mobile">>;
}