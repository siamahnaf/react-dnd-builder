"use client"
import { useState } from "react";
import { IconCaretRightFilled } from "../../../../icons";
import { produce } from "immer";

//Components
import { SliderInput } from "../../../../components/common/control";

//Store
import { useEditor } from "../../../../context/editor.context";

//Essentials
import { merge, DeepPartial } from "../../../../types/layouts/layout.types";
import { ContainerBlockTypes, SpacerBlockTypes, NodesBlockTypes } from "../../../../types/context/design.types";
import { spaceResp } from "../../../../utils/spacer.utils";

const Styles = () => {
    //States
    const [active, setActive] = useState<string | null>("spacer");

    //Store
    const { design, selected, device } = useEditor();

    //Handler_Helpers
    const findSpacer = (nodes: NodesBlockTypes[]): SpacerBlockTypes | undefined => nodes.reduce<SpacerBlockTypes | undefined>((acc, n) => {
        if (acc) return acc;
        if (n.id === selected.value?.id) return n as SpacerBlockTypes;
        if (n.type === "container") return findSpacer((n as ContainerBlockTypes).nodes);
        return undefined;
    }, undefined);

    const updateSpacer = (patch: DeepPartial<Pick<SpacerBlockTypes, "content" | "advance">>) => {
        design.setValue(prev =>
            produce(prev, draft => {
                const hit = findSpacer(draft.rows);
                if (hit) merge(hit, patch);
            })
        )
    }

    //Handler
    const onActiveChange = (id: string) => {
        setActive(prev => prev === id ? null : id);
    }

    //Target Container
    const target = findSpacer(design.value.rows);

    return (
        <div className="mt-4">
            <div className="border-b-2 border-solid border-black/5">
                <button className="flex gap-0.5 items-center w-full py-3 px-3" onClick={() => onActiveChange("spacer")}>
                    <IconCaretRightFilled size={16} className={`${active === "spacer" ? "rotate-90" : "rotate-0"}`} />
                    <span className="text-sm font-medium text-gray-700">Spacer</span>
                </button>
                {active === "spacer" &&
                    <div className="px-3.5 mb-6 mt-1.5">
                        <SliderInput
                            label="Space"
                            value={target?.content.space[device.value].value}
                            onChange={(e) => updateSpacer(spaceResp("content", "space", {
                                [device.value]: {
                                    value: e
                                }
                            }))}
                            unit={target?.content.space[device.value].unit}
                            onUnitChange={(e) => updateSpacer(spaceResp("content", "space", {
                                [device.value]: {
                                    unit: e
                                }
                            }))}
                            options={[
                                { unit: "px", min: 1, max: 1000, step: 1 },
                                { unit: "em", min: 1, max: 20, step: 0.1 },
                                { unit: "rem", min: 1, max: 20, step: 0.1 },
                            ]}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default Styles;