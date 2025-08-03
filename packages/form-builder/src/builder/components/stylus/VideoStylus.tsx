import Stylus from "../common/Stylus";
import { Checkbox, InputBox } from "../common/control";
import { produce } from "immer";
import { useEditor } from "../../context/editor.context";

//Essentials
import { DeepPartial, merge, vidResp } from "../../types/context/elements/init.element";
import { TDesignPage, TDesignElement, TVideo } from "@siamahnaf/react-form-renderer";

const VideoStylus = () => {
    //Editor
    const { design, selected } = useEditor();

    //Handler_Helpers
    const findElement = (pages: TDesignPage[]): TVideo | undefined => pages
        .flatMap(p => p.elements.flatMap(e => "elements" in e && e.elements ? [e, ...e.elements] : [e]))
        .find(e => e.id === selected.value?.id);
    const updateElement = (patch: DeepPartial<TDesignElement>) =>
        design.setValue(prev =>
            produce(prev, draft => {
                const el = findElement(draft.pages);
                if (el) merge(el, patch);
            })
        );
    const element = findElement(design.value.pages);

    if (!element) return null;

    return (
        <Stylus.r>
            <InputBox
                label="Youtube Video ID"
                placeholder="9BgsMDQWprs"
                value={element.videoUrl}
                onChange={(e) => updateElement(vidResp({ videoUrl: e }))}
            />
            <Checkbox
                id="playerControls"
                label="Show player controls"
                value={element.showControlButton}
                onChange={(e) => updateElement(vidResp({ showControlButton: e }))}
                className="mt-4"
            />
            <Checkbox
                id="privacyMode"
                label="Enable privacy-enhanced mode"
                value={element.privacyEnhancedMode}
                onChange={(e) => updateElement(vidResp({ privacyEnhancedMode: e }))}
                className="mt-2.5"
            />
            <InputBox
                label="Video Width"
                placeholder="Ex. 5"
                value={element?.width?.value}
                unit={element.width?.unit}
                onChange={(e) => updateElement(vidResp({
                    width: {
                        value: e,
                        unit: element.width?.unit ?? "px"
                    }
                }))}
                onUnitChange={(e) => updateElement(vidResp("width", { unit: e }))}
                inputType="int"
                suffix="unit"
                className="mt-5"
            />
            <InputBox
                label="Video Height"
                placeholder="Ex. 5"
                value={element.height?.value}
                unit={element.height?.unit}
                onChange={(e) => updateElement(vidResp({
                    height: {
                        value: e,
                        unit: element.height?.unit ?? "px"
                    }
                }))}
                onUnitChange={(e) => updateElement(vidResp("height", {
                    unit: e
                }))}
                inputType="int"
                suffix="unit"
                className="mt-5"
            />
            <Checkbox
                id="isVisible"
                label="Is visible"
                value={element.isVisible}
                onChange={(e) => updateElement(vidResp({ isVisible: e }))}
                className="mt-4"
            />
            <InputBox
                label="Top Space"
                placeholder="Ex. 5"
                value={element.spaceTop?.value}
                unit={element.spaceTop?.unit}
                onChange={(e) => updateElement(vidResp({
                    spaceTop: {
                        value: e,
                        unit: element.spaceTop?.unit ?? "px"
                    }
                }))}
                onUnitChange={(e) => updateElement(vidResp("spaceTop", {
                    unit: e
                }))}
                inputType="int"
                className="mt-5"
                suffix="unit"
            />
            <InputBox
                label="Bottom Space"
                placeholder="Ex. 5"
                value={element.spaceBottom?.value}
                unit={element.spaceBottom?.unit}
                onChange={(e) => updateElement(vidResp({
                    spaceBottom: {
                        value: e,
                        unit: element.spaceBottom?.unit ?? "px"
                    }
                }))}
                onUnitChange={(e) => updateElement(vidResp("spaceBottom", {
                    unit: e
                }))}
                inputType="int"
                className="mt-5"
                suffix="unit"
            />
        </Stylus.r>
    );
};

export default VideoStylus;