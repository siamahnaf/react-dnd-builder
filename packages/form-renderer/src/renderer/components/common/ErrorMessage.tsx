import { useEditor } from "../../context/editor.context";

//Interface
interface Props {
    message?: string;
    className?: string;
}

const ErrorMessage = ({ message, className = "" }: Props) => {
    //Editor
    const { settings } = useEditor();

    if (!message) return null;

    return (
        <p className={`font-medium ${className}`} style={{ color: settings.theme?.errorMessageColor }}>
            {message}
        </p>
    );
};

export default ErrorMessage;