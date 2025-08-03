import { useState, useMemo, Fragment } from "react";
import { AnimatePresence, motion, cubicBezier } from "framer-motion";
import { useEditor } from "../../context/editor.context";
import { layoutElements } from "../../data/layout/layoutelement.data";
import { BasicShowAnimate, InputBox, SelectBox } from "../common/control";
import { produce } from "immer";
import { logicActionData, logicActionOptions } from "../../data/editor/logic.action";
import { IconAlertSquareRoundedFilled } from "../../icons";
import { ScrollWrapper } from "../common/Scrollbar";

//Types
import { TDesignElement, TDesignPage, TInputElement, TSelect, TCondition } from "@siamahnaf/react-form-renderer";
import { DeepPartial, merge, selectResp } from "../../types/context/elements/init.element";

//Interface
interface LogicTypes {
    conditions: TCondition[];
    action: string;
    field: string;
}

const EditorLogic = () => {
    //Editor
    const { design } = useEditor();

    //State
    const [logic, setLogic] = useState<LogicTypes | null>(null);
    const [error, setError] = useState<boolean>(false);

    //All Elements
    const allElements = design.value.pages.flatMap(p => p.elements?.flatMap(el => "elements" in el && el.elements ? [el, ...el.elements] : [el])).filter(el => !layoutElements.includes(el.type)).map((a: TInputElement) => ({
        label: a.name,
        value: a.name
    }));
    const filteredElements = logic?.action ? design.value.pages.flatMap(p => p.elements?.flatMap(el => "elements" in el && el.elements ? [el, ...el.elements] : [el])).filter(el => logicActionData[logic.action].includes(el.type)).map((a: TInputElement) => ({
        label: a.name,
        value: a.name
    })) : []

    //Handler
    const updateCondition = (index: number, field: keyof TCondition, value: string) => {
        setLogic(prev =>
            produce(prev, draft => {
                if (!draft) return;
                draft.conditions[index][field] = value;
            })
        );
    };
    const onAdd = (logicStr: string) => (setLogic(prev => ({
        action: prev?.action ?? "",
        field: prev?.field ?? "",
        conditions: [...(prev?.conditions ?? []), { logic: logicStr, field: "", operator: "=", value: "" }]
    })), setError(false));
    const onDelete = () => (setLogic(prev => prev ? { ...prev, conditions: prev.conditions.slice(0, -1) } : prev), setError(false));

    //Handler_Helpers
    const updateLogic = () => {
        if (!logic) return null;

        if (!logic?.action || !logic.field || logic.conditions.some(cond => !cond.field || !cond.operator || !cond.value)) {
            setError(true);
            return null;
        }

        const findElement = (pages: TDesignPage[]): TDesignElement | undefined => pages
            .flatMap(p => p.elements.flatMap(e => "elements" in e && e.elements ? [e, ...e.elements] : [e]))
            .find(e => e.id === logic.field);


        const updateElement = (patch: DeepPartial<TDesignElement>) => {
            design.setValue(prev =>
                produce(prev, draft => {
                    const el = findElement(draft.pages);
                    if (el) merge(el, patch);
                })
            );
        }

        if (logic.action === "visibleIf") updateElement(selectResp("advance", { visibleIf: logic.conditions }));
        if (logic.action === "readOnlyModeIf") updateElement(selectResp("advance", { readOnlyModeIf: logic.conditions }));
        if (logic.action === "requiredIf") updateElement(selectResp("advance", { requiredIf: logic.conditions }));
        if (logic.action === "resetIf") updateElement(selectResp("advance", { resetIf: logic.conditions }));
        if (logic.action === "setValueIf") updateElement(selectResp("advance", { setValueIf: logic.conditions }));
        if (logic.action === "choiceVisibleIf") updateElement(selectResp("advance", { choiceVisibleIf: logic.conditions }));
        if (logic.action === "choiceSelectableIf") updateElement(selectResp("advance", { choiceSelectableIf: logic.conditions }));
        setError(false);
        setLogic(null);
    }

    //Logic Arrays
    const logicArray = useMemo(() => {
        return design.value.pages.flatMap(p =>
            p.elements?.flatMap(el =>
                ("elements" in el && el.elements ? [el, ...el.elements] : [el])
                    .filter(el => !layoutElements.includes(el.type))
                    .flatMap((a: TSelect) =>
                        logicActionOptions
                            .map(opt => {
                                const raw = a.advance?.[opt.value as keyof typeof a.advance] as TCondition[] | undefined;

                                const filteredConditions = Array.isArray(raw)
                                    ? raw.filter(c => !!c.field && !!c.operator)
                                    : [];

                                return filteredConditions.length > 0
                                    ? { conditions: filteredConditions, action: opt.value, field: a.name } as LogicTypes
                                    : null;
                            })
                            .filter(Boolean)
                    )
            ) ?? []
        );
    }, [design.value]);


    return (
        <AnimatePresence>
            <motion.div
                key="page-logic"
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.3, ease: cubicBezier(0.33, 1, 0.68, 1) }}
            >
                <ScrollWrapper className={`px-[350px] py-10 h-[calc(100vh-50px)] ${(!logic && logicArray.length === 0) ? "flex items-center justify-center" : ""}`}>
                    {logicArray.length > 0 &&
                        <div className="mb-6 space-y-4">
                            {logicArray.map((logic, li) => (
                                <div key={li} className="text-xl  text-gray-600">
                                    {logic?.conditions.map((a, i) => (
                                        <Fragment key={i}>
                                            {a.logic && <span className="font-medium">{" "}{a.logic}{" "}</span>}
                                            <span>if(</span>
                                            <span className="text-builder font-medium">{allElements.find(b => b.value === a.field)?.label}</span>
                                            <span className="text-red-600 font-medium">{" "}{a.operator}{" "}</span>
                                            <span className="font-medium">{a.value}</span>
                                            <span>){" "}</span>
                                        </Fragment>
                                    ))}
                                    <span>then {" "}</span>
                                    <span className="text-builder font-medium">{allElements.find(b => b.value === logic?.field)?.label} {" "}</span>
                                    <span className="font-medium">{logicActionOptions.find(a => a.value === logic?.action)?.label}</span>
                                </div>
                            ))}
                        </div>
                    }

                    {logic &&
                        <div>
                            <h4 className="text-2xl font-medium text-gray-600 mb-5">New Rule</h4>
                            {logic.conditions.map((item, i) => (
                                <div key={i} className={`${i !== 0 ? "mt-6" : ""}`}>
                                    <div className="flex items-center gap-x-3">
                                        {item.logic ? (
                                            <p className="text-gray-600 font-medium">
                                                {item.logic}
                                            </p>
                                        ) : (
                                            <p>
                                                If
                                            </p>
                                        )}
                                        <div className="w-[130px] relative">
                                            <SelectBox
                                                value={item.field}
                                                onChange={(e) => updateCondition(i, "field", e)}
                                                placeholder="Select"
                                                options={allElements}
                                                theme="orange"
                                            />
                                            {error && !item.field &&
                                                <IconAlertSquareRoundedFilled className="absolute top-1/2 right-2.5 -translate-y-1/2 text-red-600" size={16} />
                                            }
                                        </div>
                                        <div className="w-[150px] relative">
                                            <SelectBox
                                                value={item.operator}
                                                onChange={(e) => updateCondition(i, "operator", e)}
                                                options={[
                                                    { label: "Empty", value: "empty" },
                                                    { label: "Not empty", value: "notempty" },
                                                    { label: "Equals", value: "=" },
                                                    { label: "Not equals", value: "!=" },
                                                    { label: "Contains", value: "contains" },
                                                    { label: "Not contain", value: "notcontains" },
                                                    { label: "Starts with", value: "startwith" },
                                                    { label: "Ends with", value: "endwith" }
                                                ]}
                                                theme="blue"
                                                placeholder="Select"
                                            />
                                            {error && !item.operator &&
                                                <IconAlertSquareRoundedFilled className="absolute top-1/2 right-2.5 -translate-y-1/2 text-red-600" size={16} />
                                            }
                                        </div>
                                    </div>
                                    <BasicShowAnimate
                                        show={item.operator !== "empty" && item.operator !== "notempty"}
                                        id={`input${i}`}
                                    >
                                        <div className="bg-white border border-solid border-gray-100 p-5 mt-4 rounded-md relative">

                                            <InputBox
                                                placeholder="Value"
                                                className="mt-2"
                                                value={item.value}
                                                onChange={(e) => updateCondition(i, "value", e)}
                                            />
                                            {error && !item.value &&
                                                <IconAlertSquareRoundedFilled className="absolute top-1.5 right-1.5 text-red-600" size={16} />
                                            }
                                        </div>
                                    </BasicShowAnimate>
                                </div>
                            ))}
                            <div className="flex gap-x-3 mt-5">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="border border-dashed border-gray-400 text-gray-600 font-medium px-3 py-1 rounded-md"
                                    onClick={() => onAdd("AND")}
                                >
                                    AND
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="border border-dashed border-gray-400 text-gray-600 font-medium px-3 py-1 rounded-md"
                                    onClick={() => onAdd("OR")}
                                >
                                    OR
                                </motion.button>
                                {logic.conditions.length > 1 && (
                                    <motion.button
                                        whileHover={{ opacity: 0.7 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="text-red-500 font-medium"
                                        onClick={onDelete}
                                    >
                                        Delete
                                    </motion.button>
                                )}
                            </div>
                            <div className="flex items-center gap-x-3 mt-6">
                                <p>Then</p>
                                <div className="w-[120px] relative">
                                    <SelectBox
                                        value={logic.action}
                                        onChange={(e) => setLogic(prev => (prev ? { ...prev, action: e } : prev))}
                                        options={logicActionOptions}
                                        width={250}
                                        theme="orange"
                                        placeholder="Select"
                                    />
                                    {error && !logic.action &&
                                        <IconAlertSquareRoundedFilled className="absolute top-1/2 right-2.5 -translate-y-1/2 text-red-600" size={16} />
                                    }
                                </div>
                                <div className="w-[130px] relative">
                                    <SelectBox
                                        value={logic.field}
                                        onChange={(e) => setLogic(prev => (prev ? { ...prev, field: e } : prev))}
                                        placeholder="Select"
                                        options={filteredElements}
                                        theme="blue"
                                    />
                                    {error && !logic.field &&
                                        <IconAlertSquareRoundedFilled className="absolute top-1/2 right-2.5 -translate-y-1/2 text-red-600" size={16} />
                                    }
                                </div>
                            </div>
                            <div className="flex gap-x-3 mt-5">
                                <button className="bg-builder text-white px-4 py-1.5 rounded-lg" onClick={updateLogic}>
                                    Save
                                </button>
                                <button className="border border-solid border-builder/40 text-builder px-4 py-1.5 rounded-lg font-medium bg-builder/10" onClick={() => (setLogic(null), setError(false))}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    }
                    {!logic && logicArray.length === 0 &&
                        <div className="text-center">
                            <h4 className="text-3xl font-medium mb-2">No Logical Rules</h4>
                            <p className="font-light text-gray-700">Create a rule to customize the flow of the survey!</p>
                            <button className="mt-4 bg-builder text-white px-4 py-2 rounded-lg" onClick={() => (setLogic({ conditions: [{ field: "", operator: "=", value: "" }], action: "", field: "" }), setError(false))}>
                                Add New Rule
                            </button>
                        </div>
                    }
                    {!logic && logicArray.length > 0 &&
                        <div className="mt-4">
                            <button className="bg-builder px-3 w-full py-3 rounded-lg text-white font-medium" onClick={() => (setLogic({ conditions: [{ field: "", operator: "=", value: "" }], action: "", field: "" }), setError(false))}>
                                Add New Rules
                            </button>
                        </div>
                    }
                </ScrollWrapper>
            </motion.div>
        </AnimatePresence>
    );
};

export default EditorLogic;