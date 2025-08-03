import { TExpression } from "../../types/elements";

//Interface
interface Props {
    item: TExpression;
}

const Expression = ({ item }: Props) => {
    return (
        <div style={{
            marginTop: `${item.spaceTop?.value || 0}${item.spaceTop?.unit || "px"}`,
            marginBottom: `${item.spaceBottom?.value || 0}${item.spaceBottom?.unit || "px"}`
        }}>
            <div dangerouslySetInnerHTML={{ __html: item.text || "" }} />
        </div>
    );
};

export default Expression;