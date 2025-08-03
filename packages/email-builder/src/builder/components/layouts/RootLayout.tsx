"use client"
import { useEditor } from "../../context/editor.context";
import InsertBlock from "../canvas/InsertBlock";

//Components
import Preview from "../canvas/Preview";

const RootLayout = () => {
    //Store
    const { device } = useEditor();

    const width = () => {
        switch (device.value) {
            case "desktop":
                return "w-full"
            case "tablet":
                return "w-[768px]"
            case "mobile":
                return "w-[360px]"
        }
    }

    return (
        <div className={`bg-white min-h-full mx-auto ${width()}`}>
            <div>
                <Preview />
            </div>
            <div className="pb-32 pt-6">
                <InsertBlock />
            </div>
        </div>
    );
};

export default RootLayout;