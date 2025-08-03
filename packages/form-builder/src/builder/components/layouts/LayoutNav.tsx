"use client"
import { Fragment, cloneElement } from "react";
import { LogoSvg } from "../../icons";
import { layoutNavList } from "../../data/layout/layout-nav.data";

//Editor
import { useEditor } from "../../context/editor.context";

const LayoutNav = () => {
    //Editor
    const { sidebar, header, backUrl } = useEditor();

    return (
        <Fragment>
            <div className="h-[50px] border-b border-solid border-white/10 w-full p-1.5 flex items-center justify-center">
                <a href={backUrl || "/"} className="bg-gray-50 rounded-full p-1.5">
                    <LogoSvg />
                </a>
            </div>
            <div className="mt-0">
                {layoutNavList.map((item, i) => (
                    <div key={i} className={`text-center hover:bg-white/10 transition-all duration-200 w-full py-3 cursor-pointer select-none ${item.id === sidebar.value ? "bg-white/10" : ""}`} onClick={() => (sidebar.setValue(item.id), header.setValue("design"))}>
                        {cloneElement(item.icon, {
                            className: "text-gray-50 mx-auto"
                        })}
                        <p className="text-gray-50 mt-1 text-sm">{item.name}</p>
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export default LayoutNav;

