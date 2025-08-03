export const createDragPreview = (type: string) => {
    const dragPreview = document.createElement("div");
    dragPreview.innerHTML = `&lt;${type}/&gt;`;
    dragPreview.style.position = "absolute";
    dragPreview.style.top = "-9999px";
    dragPreview.style.left = "-9999px";
    dragPreview.style.padding = "0.5rem 0.75rem";
    dragPreview.style.fontSize = "0.875rem";
    dragPreview.style.border = "1px solid #e5e7eb";
    dragPreview.style.background = "#ffffff";
    dragPreview.style.borderRadius = "0.375rem";
    dragPreview.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
    dragPreview.style.color = "#111827";
    dragPreview.style.fontFamily = "monospace";
    dragPreview.style.pointerEvents = "none";
    return dragPreview;
};