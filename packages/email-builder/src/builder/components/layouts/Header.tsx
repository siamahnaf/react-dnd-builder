"use client"
import { useState } from "react";
import { IconPhoto, IconEye, IconChevronDown, IconFolderFilled, IconDeviceImac, IconDeviceIpad, IconDeviceMobile, IconX } from "../../icons";
import { motion, AnimatePresence } from "framer-motion";
import { toJpeg } from "html-to-image";

//Store
import { useEditor } from "../../context/editor.context";

//Essentials
import { useClickOutside } from "../hooks/useClickOutside";
import { render } from "../../utils/_build/root.build";
import LoadingDialog from "./LoadingDialog";


const Header = () => {
    //State
    const [open, setOpen] = useState<boolean>(false);
    const [dialog, setDialog] = useState<boolean>(false);

    //Store
    const { logo, device, design, selected, preview } = useEditor();

    //Ref
    const ref = useClickOutside(() => setOpen(false));

    const onHtmlDownload = () => {
        const html = render(design.value);
        const blob = new Blob([html], {
            type: "text/html;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "design.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    const onImageDownload = async () => {
        selected.setValue(null);
        const node = document.getElementById("email-builder-main-preview-wrap");
        if (!node) return;
        const dataUrl = await toJpeg(node, {
            backgroundColor: "#FFFFFF",
            filter: node => node.tagName !== "LINK",
            includeQueryParams: true
        });

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "design.jpeg";
        link.click();
    }

    return (
        <div className="h-[55px] border-b border-solid border-gray-50 bg-white relative z-[999] shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex items-center py-2 px-5">
            {logo?.backURl ? <a href={logo.backURl}>
                {logo ?
                    <img src={logo.url} width={logo.width} height={logo.height} alt={logo.alt || "Logo"} /> :
                    <h4 className="text-xl font-semibold">Logo Here</h4>
                }
            </a> : <div>
                {logo ?
                    <img src={logo.url} width={logo.width} height={logo.height} alt={logo.alt || "Logo"} /> :
                    <h4 className="text-xl font-semibold">Logo Here</h4>
                }
            </div>}
            <div className="flex-1 flex gap-3 justify-center">
                <button className={`${device.value === "desktop" ? "bg-builder text-white" : "hover:bg-gray-100 text-gray-700"} p-2 rounded-lg `} onClick={() => device.setValue("desktop")}>
                    <IconDeviceImac size={22} />
                </button>
                <button className={`${device.value === "tablet" ? "bg-builder text-white" : "hover:bg-gray-100 text-gray-700"} p-2 rounded-lg`} onClick={() => device.setValue("tablet")}>
                    <IconDeviceIpad />
                </button>
                <button className={`${device.value === "mobile" ? "bg-builder text-white" : "hover:bg-gray-100 text-gray-700"} p-2 rounded-lg`} onClick={() => device.setValue("mobile")}>
                    <IconDeviceMobile />
                </button>
            </div>
            {!preview.value &&
                <div className="flex gap-2 bg-builder text-white rounded-lg relative" ref={ref}>
                    <button className="flex gap-2 items-center pl-3 pr-2 py-1.5 relative" onClick={() => {
                        setDialog(true)
                        selected.setValue(null)
                    }}>
                        <IconFolderFilled size={20} />
                        <span className="text-base font-medium">Save Design</span>
                    </button>
                    <button className="border-l border-white/35 px-1.5" onClick={() => setOpen(!open)}>
                        <IconChevronDown size={22} />
                    </button>
                    <AnimatePresence>
                        {open &&
                            <motion.div
                                className="absolute bg-white border border-solid border-gray-200 text-gray-800 top-full w-[180px] right-0 mt-1 rounded-lg overflow-hidden"
                                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                                transition={{ duration: 0.1 }}
                            >
                                <button className="flex gap-2 items-center hover:bg-gray-100 px-2.5 transition-all py-1.5 w-full" onClick={() => preview.setValue(true)}>
                                    <IconEye size={22} />
                                    <span>Show Preview</span>
                                </button>
                                <button className="flex gap-2 items-center hover:bg-gray-100 px-2.5 transition-all py-1.5 w-full" onClick={onImageDownload}>
                                    <IconPhoto size={20} />
                                    <span>Export Image</span>
                                </button>
                                <button className="flex gap-2 items-center hover:bg-gray-100 px-2.5 transition-all py-1.5 w-full" onClick={onHtmlDownload}>
                                    <IconPhoto size={20} />
                                    <span>Export HTML</span>
                                </button>
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>
            }
            {preview.value &&
                <button className="flex gap-1 bg-builder text-white rounded-lg px-2.5 py-1.5 items-center" onClick={() => preview.setValue(false)}>
                    <IconX size={20} />
                    <span>Close Preview</span>
                </button>
            }
            <LoadingDialog
                open={dialog}
                onClose={() => setDialog(false)}
            />
        </div>
    );
};

export default Header;