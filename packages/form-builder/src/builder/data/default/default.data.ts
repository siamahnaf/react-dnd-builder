export const getDefaultData = (type: string) => {
    const commonAdvance = [{
        field: "",
        operator: "=",
        value: ""
    }]
    const commonData = {
        general: {
            isVisible: true,
            showTitle: true,
            showDescription: true
        },
        layout: {
            collapseState: "locked",
            errorMessageAlignment: "bottom",
            innerIndent: "0px",
            valueAlignment: "left",
            questionAlignment: "auto"
        },
        advance: {
            visibleIf: commonAdvance,
            readOnlyModeIf: commonAdvance,
            requiredIf: commonAdvance,
            resetIf: commonAdvance,
            setValueIf: commonAdvance
        }
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const extend = (ext: Partial<typeof commonData> | Record<string, any>) => ({
        ...commonData,
        ...ext,
        general: { ...commonData.general, ...ext.general },
        layout: { ...commonData.layout, ...ext.layout },
        advance: { ...commonData.advance, ...ext.advance }
    });

    const isOnlyCommon = ["SingleLineText", "Switch", "Datetime"]

    if (isOnlyCommon.includes(type)) return commonData;
    if (type === "LongText") return extend({ general: { showCharCount: true } });
    if (type === "RichText") return {
        general: { isVisible: true, showTitle: true, showDescription: true, minHeight: { value: "200", unit: "px" } },
        layout: { collapseState: "locked", errorMessageAlignment: "bottom", innerIndent: "0" },
        advance: { visibleIf: commonAdvance, readOnlyModeIf: commonAdvance, requiredIf: commonAdvance }
    }
    if (type === "Select") return extend({
        general: { searchMode: "contain", acceptEmpty: true, clearBtn: true, choices: [{ label: "Item1", value: "item1" }, { label: "Item2", value: "item2" }, { label: "Item3", value: "item3" }, { label: "Item4", value: "item4" }] },
        advance: { choiceVisibleIf: commonAdvance, choiceSelectableIf: commonAdvance }
    })
    if (type === "AutoComplete") return extend({
        general: { country: { type: "name" }, currency: { type: "symbol" }, searchMode: "contain" },
        advance: { choiceVisibleIf: commonAdvance, choiceSelectableIf: commonAdvance }
    })
    if (type === "Checkbox" || type === "Radio") return extend({
        general: { choices: [{ label: "Item1", value: "item1" }, { label: "Item2", value: "item2" }, { label: "Item3", value: "item3" }, { label: "Item4", value: "item4" }] },
        advance: { choiceVisibleIf: commonAdvance, choiceSelectableIf: commonAdvance }
    })
    if (type === "Range") return extend({
        general: { showTooltip: true, allowThumbCrossing: true, clrBtn: true, type: "single" }
    })
    if (type === "Rating") return extend({
        general: { ratingIcon: "star", tooltipType: "none" }
    })
    if (type === "Color") return extend({
        general: { displayType: "bar" }
    })
    if (type === "FileUpload") return extend({
        general: { type: "img" }
    })
    if (type === "Matrix") return {
        general: { isVisible: true, showTitle: true, showDescription: true, columnData: ["Column1", "Column2", "Column3"], rowsData: ["Rows1", "Rows2"] },
        layout: { collapseState: "locked", errorMessageAlignment: "bottom", innerIndent: "0" },
        advance: { visibleIf: commonAdvance, readOnlyModeIf: commonAdvance, requiredIf: commonAdvance }
    }
    if (type === "E-Signature") return {
        general: { isVisible: true, showTitle: true, showDescription: true, storeFormat: "image/png", autoScaleArea: true, areaWidth: 300, areaHeight: 186, showClearButton: true, backgroundColor: "#FFFFFF", strokeColor: "#000000" },
        layout: { collapseState: "locked", errorMessageAlignment: "bottom", innerIndent: "0" },
        advance: { visibleIf: commonAdvance, readOnlyModeIf: commonAdvance, requiredIf: commonAdvance }
    }
    if (type === "Captcha") return {
        general: { isVisible: true, showTitle: true, showDescription: true, appearance: "box" },
        layout: { collapseState: "locked", innerIndent: "0px" },
        advance: { visibleIf: commonAdvance }
    }
    if (type === "Image") return { isVisible: true, fit: "cover", height: { value: "300", unit: "px" }, width: { value: "100", unit: "%" } }
    if (type === "Video") return { isVisible: true, height: { value: "250", unit: "px" }, width: { value: "100", unit: "%" } }
    if (type === "Panel") return { showName: true, showDescription: true, appearance: "plain" }

    return {}
}