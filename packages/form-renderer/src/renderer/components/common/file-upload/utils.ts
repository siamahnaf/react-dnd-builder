import { RefObject } from "react";

export const openFileDialog = (inputRef: RefObject<HTMLInputElement | null>): void => {
    if (inputRef.current) inputRef.current.click();
};