import { ButtonBlockTypes } from "../../types/context/design.types";
import { spacing, toSize } from "./_helpers/helpers.fn";

export const renderButton = (data: ButtonBlockTypes) => {
    const { content, style, advance } = data;
    const className = data.id;
    const btnCls = `${className}-btn`;
    const typo = style.typography;
    const btnBorder = style.border;
    const btnPad = style.padding;
    const wrapBorder = advance.border;
    const wrapBg = advance.background;

    //Helpers
    const padFromSize = (sizeStr?: string) => {
        if (!sizeStr) return "";
        const [v, h] = sizeStr.split(" ");
        return v && h ? `${v} ${h}` : sizeStr;
    };

    const wrapperDesktop = [
        content.alignment.desktop ? `text-align:${content.alignment.desktop}` : "",
        wrapBg.background_type === "color" && wrapBg.color ? `background-color:${wrapBg.color}` : "",
        wrapBg.background_type === "image" && wrapBg.image?.url ? `background:url('${wrapBg.image.url}') ${wrapBg.image.position || "center"} / ${wrapBg.image.size || "cover"} ${wrapBg.image.repeat || "no-repeat"} : ""}` : "",

        wrapBorder.border_type && wrapBorder.border_color ? `border-style:${wrapBorder.border_type};border-color:${wrapBorder.border_color}` : "",
        spacing(wrapBorder.border_width.desktop) ? `border-width:${spacing(wrapBorder.border_width.desktop)}` : "",
        spacing(wrapBorder.border_radius.desktop) ? `border-radius:${spacing(wrapBorder.border_radius.desktop)}` : "",
        spacing(advance.layout.margin.desktop) ? `margin:${spacing(advance.layout.margin.desktop)}` : "",
        spacing(advance.layout.padding.desktop) ? `padding:${spacing(advance.layout.padding.desktop)}` : "",
        advance.responsive.desktop ? "display:none!important" : ""
    ].filter(Boolean).join(";");

    const btnDesktop = [
        "display:inline-block",
        `color:${style.basic_style.text_color}`,
        `background-color:${style.basic_style.background_color || content.type}`,
        typo.family ? `font-family:${typo.family}` : "",
        toSize(typo.size.desktop) ? `font-size:${toSize(typo.size.desktop)}` : "",
        typo.weight ? `font-weight:${typo.weight}` : "",
        typo.transform ? `text-transform:${typo.transform}` : "",
        typo.style ? `font-style:${typo.style}` : "",
        typo.decoration ? `text-decoration:${typo.decoration}` : "text-decoration:none",
        toSize(typo.line_height.desktop) ? `line-height:${toSize(typo.line_height.desktop)}` : "",
        toSize(typo.letter_spacing.desktop) ? `letter-spacing:${toSize(typo.letter_spacing.desktop)}` : "",
        toSize(typo.word_spacing.desktop) ? `word-spacing:${toSize(typo.word_spacing.desktop)}` : "",
        spacing(btnPad.desktop) ? `padding:${spacing(btnPad.desktop)}` : `padding:${padFromSize(content.size)}`,
        btnBorder.border_type && btnBorder.border_color ? `border-style:${btnBorder.border_type};border-color:${btnBorder.border_color}` : "",
        spacing(btnBorder.border_width.desktop) ? `border-width:${spacing(btnBorder.border_width.desktop)}` : "",
        spacing(btnBorder.border_radius.desktop) ? `border-radius:${spacing(btnBorder.border_radius.desktop)}` : "",
        "cursor:pointer"
    ].filter(Boolean).join(";");

    const buildWrapArray = (bp: "tablet" | "mobile") => [
        content.alignment[bp] ? `text-align:${content.alignment[bp]}` : "",
        spacing(wrapBorder.border_width[bp]) ? `border-width:${spacing(wrapBorder.border_width[bp])}` : "",
        spacing(wrapBorder.border_radius[bp]) ? `border-radius:${spacing(wrapBorder.border_radius[bp])}` : "",
        spacing(advance.layout.margin[bp]) ? `margin:${spacing(advance.layout.margin[bp])}` : "",
        spacing(advance.layout.padding[bp]) ? `padding:${spacing(advance.layout.padding[bp])}` : "",
        advance.responsive[bp] ? "display:none!important" : ""
    ].filter(Boolean);

    const buildBtnArray = (bp: "tablet" | "mobile") => [
        toSize(typo.size[bp]) ? `font-size:${toSize(typo.size[bp])}` : "",
        toSize(typo.line_height[bp]) ? `line-height:${toSize(typo.line_height[bp])}` : "",
        toSize(typo.letter_spacing[bp]) ? `letter-spacing:${toSize(typo.letter_spacing[bp])}` : "",
        toSize(typo.word_spacing[bp]) ? `word-spacing:${toSize(typo.word_spacing[bp])}` : "",
        spacing(btnPad[bp]) ? `padding:${spacing(btnPad[bp])}` : "",
        spacing(btnBorder.border_width[bp]) ? `border-width:${spacing(btnBorder.border_width[bp])}` : "",
        spacing(btnBorder.border_radius[bp]) ? `border-radius:${spacing(btnBorder.border_radius[bp])}` : ""
    ].filter(Boolean);

    const tabletBtnArr = buildBtnArray("tablet");
    const mobileBtnArr = buildBtnArray("mobile");
    const tabletWrapArr = buildWrapArray("tablet");
    const mobileWrapArr = buildWrapArray("mobile");

    const formateTabletStyles = `
.${className}{${tabletWrapArr.join(";")}}
.${btnCls}{${tabletBtnArr.join(";")}}
`.trim();

    const formateMobileStyles = `
.${className}{${mobileWrapArr.join(";")}}
.${btnCls}{${mobileBtnArr.join(";")}}
`.trim();

    const customStyles = `${advance.custom_css || ""}`.trim();

    const url = content.link.url || "#";
    const rel = content.link.open_no_follow ? "nofollow" : "";
    const target = content.link.open_in_new_window ? "_blank" : "_self";

    const html = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td id="${advance.layout.css_id}" class="${className} ${advance.layout.css_class}" style="${wrapperDesktop}">
      <a href="${url}" target="${target}" rel="${rel}" class="${btnCls}" style="${btnDesktop}">
        ${content.content}
      </a>
    </td>
  </tr>
</table>
`.trim();

    return { html, formateTabletStyles, formateMobileStyles, customStyles };
}