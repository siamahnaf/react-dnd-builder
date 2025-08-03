import { TImage } from "../../types/elements";

//Interface
interface Props {
    item: TImage;
}

const Images = ({ item }: Props) => {
    if (!item.isVisible) return null;
    return (
        <div
            className="col-span-12"
            style={{
                marginTop: `${item.spaceTop?.value || 0}${item.spaceTop?.unit || "px"}`,
                marginBottom: `${item.spaceBottom?.value || 0}${item.spaceBottom?.unit || "px"}`
            }}
        >
            <img
                src={item.image?.url || "https://cdn.jsdelivr.net/gh/siamahnaf/react-dnd-assets@v1.0.1/email-builder/placeholder.png"}
                alt={item.image?.alt}
                className="rounded-lg"
                style={{
                    width: `${item.width?.value || "100"}${item.width?.unit || "%"}`,
                    height: `${item.height?.value || "200"}${item.height?.unit || "px"}`,
                    objectFit: (item.fit as "cover") || "cover",
                    borderRadius: `${item.imageRadius?.value || "100"}${item.imageRadius?.unit || "%"}`
                }}
            />
        </div>
    );
};

export default Images;