export const toSize = (v?: { value: string; unit: string }) =>
    v?.value ? `${v.value}${v.unit}` : "";

export const spacing = (v?: { top: string; right: string; bottom: string; left: string; unit: string }) => {
    if (!v) return "";
    return `${v.top || 0}${v.unit} ${v.right || 0}${v.unit} ${v.bottom || 0}${v.unit} ${v.left || 0}${v.unit}`;
};