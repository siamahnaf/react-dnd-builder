import { Dispatch, SetStateAction } from "react";
import { layoutNavList } from "../../data/layout/layout-nav.data";

export type LayoutNavId = typeof layoutNavList[number]["id"];

export type SidebarTypes = {
    value: LayoutNavId;
    setValue: Dispatch<SetStateAction<LayoutNavId>>;
}