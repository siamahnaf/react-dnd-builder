import { TValidation } from "../types/elements";

export const validateAll = (value: string, validationList: TValidation[], getElementValue: (name: string) => string | undefined): string | true => {
    for (const validation of validationList) {
        if (!validation.c) continue;

        const results: boolean[] = [];

        for (const condition of validation.conditions) {
            let compareValue: string = "";

            if (condition.option === "element") {
                compareValue = getElementValue(condition.value) ?? "";
            } else if (condition.option === "regex") {
                try {
                    const regex = new RegExp(condition.value);
                    results.push(regex.test(value));
                    continue;
                } catch {
                    results.push(false);
                    continue;
                }
            } else {
                compareValue = condition.value;
            }

            switch (condition.operator) {
                case "empty":
                    results.push(value.trim() === "");
                    break;
                case "notempty":
                    results.push(value.trim() !== "");
                    break;
                case "=":
                    results.push(value === compareValue);
                    break;
                case "!=":
                    results.push(value !== compareValue);
                    break;
                case "contains":
                    results.push(value.includes(compareValue));
                    break;
                case "notcontains":
                    results.push(!value.includes(compareValue));
                    break;
                case "startwith":
                    results.push(value.startsWith(compareValue));
                    break;
                case "endwith":
                    results.push(value.endsWith(compareValue));
                    break;
                default:
                    results.push(false);
            }
        }

        const logic = validation.conditions[0]?.logic ?? "AND";

        const isValid = logic === "OR" ? results.some(Boolean) : results.every(Boolean);

        if (!isValid) return validation.errorMessage;
    }

    return true;
}
