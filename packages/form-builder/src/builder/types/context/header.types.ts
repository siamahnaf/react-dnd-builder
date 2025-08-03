import { Dispatch, SetStateAction } from "react";
import { headerNavList } from "../../data/layout/header-nav.data";

export type LayoutHeaderId = typeof headerNavList[number]["id"];

export type HeaderTypes = {
    value: LayoutHeaderId;
    setValue: Dispatch<SetStateAction<LayoutHeaderId>>;
}