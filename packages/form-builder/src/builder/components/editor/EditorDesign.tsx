import Sidebar from "../pages/editor-design/Sidebar";
import RootBody from "../pages/editor-design/RootBody";
import Preview from "../pages/editor-design/Preview";

const EditorDesign = () => {
    return (
        <div className="flex">
            <Sidebar />
            <RootBody />
            <Preview />
        </div>
    );
};

export default EditorDesign;