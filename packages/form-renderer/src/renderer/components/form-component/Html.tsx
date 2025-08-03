import { THtml } from "../../types/elements";

interface Props {
    item: THtml;
}

const Html = ({ item }: Props) => {
    return (
        <div
            className="col-span-12"
            style={{
                marginTop: `${item.spaceTop?.value || 0}${item.spaceTop?.unit || "px"}`,
                marginBottom: `${item.spaceBottom?.value || 0}${item.spaceBottom?.unit || "px"}`
            }}
        >
            {item.html ?
                <div dangerouslySetInnerHTML={{ __html: item.html }} className="break-all" />
                :
                <div>{"<p>Type here content</p>"}</div>
            }
        </div>
    );
};

export default Html;