import { TDesignPage } from "../../types/design.types";
import { useEditor } from "../../context/editor.context";

//Components
import FormElements from "./FormElements";

//Interface
interface Props {
    item: TDesignPage;
    index: number;
}

const FormPages = ({ item, index }: Props) => {
    //Editor
    const { settings } = useEditor();
    const { pages } = settings;

    return (
        <div>
            {pages?.showPageTitle &&
                <h4 className={`text-2xl font-semibold`}>{pages?.showPageNumber ? `${(index + 1)}. ` : ""}{item.name}</h4>
            }
            {item.description && pages?.showPageDesc &&
                <p className={`text-base font-light`}>{item.description}</p>
            }
            {item.image?.url && pages?.showPageImg &&
                <img
                    src={item.image.url}
                    alt={item.image.alt}
                    style={{
                        width: `${item.imageWidth?.value}${item.imageWidth?.unit || "px"}`,
                        height: `${item.imageHeight?.value}${item.imageHeight?.unit || "px"}`,
                        borderRadius: `${item.imageRadius?.value}${item.imageRadius?.unit || "px"}`
                    }}
                    className="object-cover object-center mt-2"
                />
            }
            <div className="space-y-5 mt-3">
                <FormElements elements={item.elements} />
            </div>
        </div>
    );
};

export default FormPages;