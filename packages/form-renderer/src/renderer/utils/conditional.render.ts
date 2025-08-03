import { useMemo, useEffect } from "react";
import { TCondition } from "../types/elements";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { FormInput } from "../types/formInput";

interface Props {
    watch?: UseFormWatch<FormInput>;
    setValue?: UseFormSetValue<FormInput>;
    visibleIf?: TCondition[];
    requiredIf?: TCondition[];
    readOnlyModeIf?: TCondition[];
    resetIf?: TCondition[];
    setValueIf?: TCondition[];
    choiceVisibleIf?: TCondition[];
    choiceSelectableIf?: TCondition[];
    base: {
        isVisible?: boolean;
        isRequired?: boolean;
        isReadOnly?: boolean;
    };
    fieldName: keyof FormInput;
}

const sanitizeConditions = (conditions?: TCondition[]) => {
    return (conditions || []).filter(
        (c) => c.field?.trim() && c.operator?.trim() && c.value?.trim()
    );
};

const extractWatchedFields = (...conditionGroups: (TCondition[] | undefined)[]) => {
    const all = conditionGroups.flat().filter(Boolean) as TCondition[];
    return Array.from(new Set(all.map((c) => c.field)));
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const evaluateConditions = (conditions: TCondition[], values: Record<string, any>) => {
    const results = conditions.map((cond) => {
        const val = values[cond.field] ?? "";
        const target = cond.value;

        switch (cond.operator) {
            case "empty": return val.trim?.() === "";
            case "notempty": return val.trim?.() !== "";
            case "=": return val === target;
            case "!=": return val !== target;
            case "contains": return val.includes?.(target);
            case "notcontains": return !val.includes?.(target);
            case "startwith": return val.startsWith?.(target);
            case "endwith": return val.endsWith?.(target);
            default: return false;
        }
    });

    const logic = conditions[0]?.logic ?? "AND";
    return logic === "OR" ? results.some(Boolean) : results.every(Boolean);
};

export const useConditionalProps = ({
    watch,
    setValue,
    visibleIf,
    requiredIf,
    readOnlyModeIf,
    resetIf,
    setValueIf,
    choiceSelectableIf,
    choiceVisibleIf,
    base,
    fieldName,
}: Props) => {
    const allConditions = {
        visibleIf: sanitizeConditions(visibleIf),
        requiredIf: sanitizeConditions(requiredIf),
        readOnlyModeIf: sanitizeConditions(readOnlyModeIf),
        resetIf: sanitizeConditions(resetIf),
        setValueIf: sanitizeConditions(setValueIf),
        choiceVisibleIf: sanitizeConditions(choiceVisibleIf),
        choiceSelectableIf: sanitizeConditions(choiceSelectableIf)
    };

    const watchedFields = extractWatchedFields(
        allConditions.visibleIf,
        allConditions.requiredIf,
        allConditions.readOnlyModeIf,
        allConditions.resetIf,
        allConditions.setValueIf,
        allConditions.choiceSelectableIf,
        allConditions.choiceVisibleIf
    );
    const watchedValues = watch?.(watchedFields) || [];

    const getWatchedObject = useMemo(() => {
        const map: Record<string, string> = {};
        watchedFields.forEach((field, i) => {
            map[field] = watchedValues[i] ?? "";
        });
        return map;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchedValues.map(String).join("|")]);

    // Visibility
    const isVisible = useMemo(() => {
        if (base.isVisible === false) return false;
        if (!allConditions.visibleIf.length) return true;
        return evaluateConditions(allConditions.visibleIf, getWatchedObject);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(allConditions.visibleIf), getWatchedObject, base.isVisible]);

    // Required
    const isRequired = useMemo(() => {
        if (base.isRequired === true) return true;
        if (!allConditions.requiredIf.length) return false;
        return evaluateConditions(allConditions.requiredIf, getWatchedObject);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(allConditions.requiredIf), getWatchedObject, base.isRequired]);

    // ReadOnly
    const isReadOnly = useMemo(() => {
        if (base.isReadOnly === true) return true;
        if (!allConditions.readOnlyModeIf.length) return false;
        return evaluateConditions(allConditions.readOnlyModeIf, getWatchedObject);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(allConditions.readOnlyModeIf), getWatchedObject, base.isReadOnly]);

    const isChoiceVisible = useMemo(() => {
        if (!allConditions.choiceVisibleIf.length) return true;
        return evaluateConditions(allConditions.choiceVisibleIf, getWatchedObject);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(allConditions.choiceVisibleIf), getWatchedObject]);

    const isChoiceSelectable = useMemo(() => {
        if (!allConditions.choiceSelectableIf.length) return true;
        return evaluateConditions(allConditions.choiceSelectableIf, getWatchedObject);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(allConditions.choiceSelectableIf), getWatchedObject]);

    useEffect(() => {
        if (evaluateConditions(allConditions.resetIf, getWatchedObject)) {
            setValue?.(fieldName, "");
        }

        const matched = allConditions.setValueIf.find((c) =>
            evaluateConditions([c], getWatchedObject)
        );
        if (matched?.value !== undefined) {
            setValue?.(fieldName, matched.value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        fieldName,
        setValue
    ]);

    return { isVisible, isRequired, isReadOnly, isChoiceVisible, isChoiceSelectable };
};
