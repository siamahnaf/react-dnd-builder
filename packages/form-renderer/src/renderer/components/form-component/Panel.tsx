import { TPanel } from "../../types/design.types";

//Interface
interface Props {
    item: TPanel;
}

const Panel = ({ item }: Props) => {
    return (
        <div className="mb-3">
            {item.showName &&
                <h4 className="text-lg font-semibold">{item.name}</h4>
            }
            {item.showDescription &&
                <p className="opacity-90" style={{ marginTop: `${item.spacing || -2}px` }}>
                    {item.description}
                </p>
            }
        </div>
    );
};

export default Panel;