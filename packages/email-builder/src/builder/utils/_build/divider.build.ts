import { DividerBlockTypes } from "../../types/context/design.types";
import { toSize, spacing } from "./_helpers/helpers.fn";
import { RenderFragmentTypes } from "./_helpers/renderer.types";

export const renderDivider = (data: DividerBlockTypes): RenderFragmentTypes => {
    const { content, style, advance } = data;
    const cls = data.id;
    const wrapBorder = advance.border;
    const wrapBg = advance.background;
    const textTypo = style.text.typography;

    const getGap = (gap?: string) => (gap ? `${gap}px` : "0");

    const lineBase = `flex:1;border:none;border-top:${style.divider.weight}px ${content.style || "solid"
        } ${style.divider.color}`;

    const hrBase = [
        "display:flex",
        "align-items:center",
        `padding-top:${getGap(style.divider.gap.desktop)}`,
        `padding-bottom:${getGap(style.divider.gap.desktop)}`,
        toSize(content.width.desktop) ? `width:${toSize(content.width.desktop)}` : "width:100%",
        content.alignment.desktop ? `margin:${content.alignment.desktop}` : ""
    ].filter(Boolean).join(";");


    const wrapperDesktop = [
        wrapBg.background_type === "color" && wrapBg.color ? `background-color:${wrapBg.color}` : "",
        wrapBg.background_type === "image" && wrapBg.image?.url ? `background:url('${wrapBg.image.url}') ${wrapBg.image.position || "center"} / ${wrapBg.image.size || "cover"} ${wrapBg.image.repeat || "no-repeat"}` : "",
        wrapBorder.border_type && wrapBorder.border_color ? `border-style:${wrapBorder.border_type};border-color:${wrapBorder.border_color}` : "",
        spacing(wrapBorder.border_width.desktop) ? `border-width:${spacing(wrapBorder.border_width.desktop)}` : "",
        spacing(wrapBorder.border_radius.desktop) ? `border-radius:${spacing(wrapBorder.border_radius.desktop)}` : "",
        spacing(advance.layout.margin.desktop) ? `margin:${spacing(advance.layout.margin.desktop)}` : "",
        spacing(advance.layout.padding.desktop) ? `padding:${spacing(advance.layout.padding.desktop)}` : "",
        advance.responsive.desktop ? "display:none!important" : ""
    ].filter(Boolean).join(";");

    const textStyles = [
        style.text.color ? `color:${style.text.color}` : "",
        textTypo.family ? `font-family:${textTypo.family}` : "",
        toSize(textTypo.size.desktop) ? `font-size:${toSize(textTypo.size.desktop)}` : "",
        textTypo.weight ? `font-weight:${textTypo.weight}` : "",
        textTypo.transform ? `text-transform:${textTypo.transform}` : "",
        textTypo.style ? `font-style:${textTypo.style}` : "",
        textTypo.decoration ? `text-decoration:${textTypo.decoration}` : "",
        toSize(textTypo.line_height.desktop) ? `line-height:${toSize(textTypo.line_height.desktop)}` : "",
        toSize(textTypo.letter_spacing.desktop) ? `letter-spacing:${toSize(textTypo.letter_spacing.desktop)}` : "",
        toSize(textTypo.word_spacing.desktop) ? `word-spacing:${toSize(textTypo.word_spacing.desktop)}` : ""
    ].filter(Boolean).join(";");

    const mediaHR = (device: "tablet" | "mobile") => {
        const w = toSize(content.width[device]);
        return [
            w ? `width:${w}` : "",
            style.divider.gap[device] ? `padding-top:${getGap(style.divider.gap[device])}` : "",
            style.divider.gap[device] ? `padding-bottom:${getGap(style.divider.gap[device])}` : "",
            content.alignment[device] ? `margin:${content.alignment[device]}` : ""
        ].filter(Boolean).join(";");
    };

    const mediaWrapper = (device: "tablet" | "mobile") => [
        spacing(wrapBorder.border_width[device]) ? `border-width:${spacing(wrapBorder.border_width[device])}` : "",
        spacing(wrapBorder.border_radius[device]) ? `border-radius:${spacing(wrapBorder.border_radius[device])}` : "",
        spacing(advance.layout.margin[device]) ? `margin:${spacing(advance.layout.margin[device])}` : "",
        spacing(advance.layout.padding[device]) ? `padding:${spacing(advance.layout.padding[device])}` : "",
        advance.responsive[device] ? "display:none!important" : ""
    ].filter(Boolean);

    const mediaText = (device: "tablet" | "mobile") => [
        toSize(textTypo.size[device]) ? `font-size:${toSize(textTypo.size[device])}` : "",
        toSize(textTypo.line_height[device]) ? `line-height:${toSize(textTypo.line_height[device])}` : "",
        toSize(textTypo.letter_spacing[device]) ? `letter-spacing:${toSize(textTypo.letter_spacing[device])}` : "",
        toSize(textTypo.word_spacing[device]) ? `word-spacing:${toSize(textTypo.word_spacing[device])}` : ""
    ].filter(Boolean);

    const formateTabletStyles = `
.${cls} { ${mediaWrapper("tablet").join(";")} }
.${cls}-hr { ${mediaHR("tablet")} }
.${cls}-txt { ${mediaText("tablet").join(";")} }
`.trim();

    const formateMobileStyles = `
.${cls} { ${mediaWrapper("mobile").join(";")} }
.${cls}-hr { ${mediaHR("mobile")} }
.${cls}-txt { ${mediaText("mobile").join(";")} }
`.trim();

    const customStyles = `${advance.custom_css || ""}`.trim();


    const buildInnerHtml = () => {
        const line = `<span style="${lineBase}"></span>`;
        const txt =
            content.element_type === "none" ? ""
                : `<span class="${cls}-txt" style="${textStyles}">${content.text}</span>`;

        if (!txt) return line;

        switch (style.text.position) {
            case "left":
                return `${txt}${line}`;
            case "right":
                return `${line}${txt}`;
            default:
                return `${line}${txt}${line}`;
        }
    };


    const html = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td id="${advance.layout.css_id}" class="${cls} ${advance.layout.css_class}" style="${wrapperDesktop}">
       <div class="${cls}-hr" style="${hrBase}">
        ${buildInnerHtml()}
      </div>
    </td>
  </tr>
</table>
`.trim();

    return { html, formateTabletStyles, formateMobileStyles, customStyles };

}