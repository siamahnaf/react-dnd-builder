"use client"
import { useEditor } from "../../../context/editor.context";

//Components
import SidebarForm from "./_helpers/_sidebar/SidebarForm";
import SidebarGeneral from "./_helpers/_sidebar/SidebarGeneral";
import SidebarLogo from "./_helpers/_sidebar/SidebarLogo";
import SidebarThemes from "./_helpers/_sidebar/SidebarThemes";
import SidebarPages from "./_helpers/_sidebar/SidebarPages";
import SidebarSettings from "./_helpers/_sidebar/SidebarSettings";

const Sidebar = () => {
    //Editor
    const { sidebar } = useEditor();

    return (
        <div className="flex-[0_0_380px] w-[380px] basis-[380px] h-[calc(100vh-55px)] bg-white border-r border-solid border-gray-200/80">
            {sidebar.value === "form" && <SidebarForm />}
            {sidebar.value === "general" && <SidebarGeneral />}
            {sidebar.value === "logo" && <SidebarLogo />}
            {sidebar.value === "theme" && <SidebarThemes />}
            {sidebar.value === "page" && <SidebarPages />}
            {sidebar.value === "setting" && <SidebarSettings />}
        </div>
    );
};

export default Sidebar;