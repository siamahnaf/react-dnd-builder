import { TextBlockTypes } from "../../types/context/design.types";
import { RenderFragmentTypes } from "./_helpers/renderer.types";
import { toSize, spacing } from "./_helpers/helpers.fn";

export const renderText = (data: TextBlockTypes): RenderFragmentTypes => {
    const { content, style, advance } = data;
    const className = data.id;
    const typo = style.typography;
    const background = advance.background;
    const border = advance.border;

    //_Helpers_functions
    const txtHtml = `<p>${content.content || ""}</p>`;

    const desktopStyles = [
        `color:${style.text_color || "#000"}`,
        typo.family ? `font-family:${typo.family}` : "",
        toSize(typo.size.desktop) ? `font-size:${toSize(typo.size.desktop)}` : "",
        typo.weight ? `font-weight:${typo.weight}` : "",
        typo.transform ? `text-transform:${typo.transform}` : "",
        typo.style ? `font-style:${typo.style}` : "",
        typo.decoration ? `text-decoration:${typo.decoration}` : "",
        toSize(typo.line_height.desktop) ? `line-height:${toSize(typo.line_height.desktop)}` : "",
        toSize(typo.letter_spacing.desktop) ? `letter-spacing:${toSize(typo.letter_spacing.desktop)}` : "",
        toSize(typo.word_spacing.desktop) ? `word-spacing:${toSize(typo.word_spacing.desktop)}` : "",
        style.alignment.desktop ? `text-align:${style.alignment.desktop}` : "",

        content.column.desktop ? `column-count:${content.column.desktop}` : "",
        toSize(content.column_gaps.desktop) ? `column-gap:${toSize(content.column_gaps.desktop)}` : "",
        background.background_type === "color" && background.color ? `background-color:${background.color}` : "",
        background.background_type === "image" && background.image?.url ? `background:url('${background.image.url}') ${background.image.position || "center"} / ${background.image.size || "cover"} ${background.image.repeat || "no-repeat"}` : "",
        border.border_type && border.border_color ? `border-style:${border.border_type};border-color:${border.border_color}` : "",
        spacing(border.border_width.desktop) ? `border-width:${spacing(border.border_width.desktop)}` : "",
        spacing(border.border_radius.desktop) ? `border-radius:${spacing(border.border_radius.desktop)}` : "",
        spacing(advance.layout.margin.desktop) ? `margin:${spacing(advance.layout.margin.desktop)}` : "",
        spacing(advance.layout.padding.desktop) ? `padding:${spacing(advance.layout.padding.desktop)}` : "",
        advance.responsive.desktop ? "display:none!important" : ""
    ].filter(Boolean).join(";");

    const tabletArr = [
        toSize(typo.size.tablet) ? `font-size:${toSize(typo.size.tablet)}` : "",
        toSize(typo.line_height.tablet) ? `line-height:${toSize(typo.line_height.tablet)}` : "",
        toSize(typo.letter_spacing.tablet) ? `letter-spacing:${toSize(typo.letter_spacing.tablet)}` : "",
        toSize(typo.word_spacing.tablet) ? `word-spacing:${toSize(typo.word_spacing.tablet)}` : "",
        style.alignment.tablet ? `text-align:${style.alignment.tablet}` : "",
        content.column.tablet ? `column-count:${content.column.tablet}` : "",
        toSize(content.column_gaps.tablet) ? `column-gap:${toSize(content.column_gaps.tablet)}` : "",
        spacing(border.border_width.tablet) ? `border-width:${spacing(border.border_width.tablet)}` : "",
        spacing(border.border_radius.tablet) ? `border-radius:${spacing(border.border_radius.tablet)}` : "",
        spacing(advance.layout.margin.tablet) ? `margin:${spacing(advance.layout.margin.tablet)}` : "",
        spacing(advance.layout.padding.tablet) ? `padding:${spacing(advance.layout.padding.tablet)}` : "",
        advance.responsive.tablet ? "display:none!important" : ""
    ].filter(Boolean);

    const mobileArr = [
        toSize(typo.size.mobile) ? `font-size:${toSize(typo.size.mobile)}` : "",
        toSize(typo.line_height.mobile) ? `line-height:${toSize(typo.line_height.mobile)}` : "",
        toSize(typo.letter_spacing.mobile) ? `letter-spacing:${toSize(typo.letter_spacing.mobile)}` : "",
        toSize(typo.word_spacing.mobile) ? `word-spacing:${toSize(typo.word_spacing.mobile)}` : "",
        style.alignment.mobile ? `text-align:${style.alignment.mobile}` : "",
        content.column.mobile ? `column-count:${content.column.mobile}` : "",
        toSize(content.column_gaps.mobile) ? `column-gap:${toSize(content.column_gaps.mobile)}` : "",
        spacing(border.border_width.mobile) ? `border-width:${spacing(border.border_width.mobile)}` : "",
        spacing(border.border_radius.mobile) ? `border-radius:${spacing(border.border_radius.mobile)}` : "",
        spacing(advance.layout.margin.mobile) ? `margin:${spacing(advance.layout.margin.mobile)}` : "",
        spacing(advance.layout.padding.mobile) ? `padding:${spacing(advance.layout.padding.mobile)}` : "",
        advance.responsive.mobile ? "display:none!important" : ""
    ].filter(Boolean);

    const formateTabletStyles = `
    .${className}{
    ${tabletArr.join(";")}
    }`.trim();

    const formateMobileStyles = `
    .${className}{
    ${mobileArr.join(";")}
    }`.trim();

    const customStyles = `${advance.custom_css || ""}`.trim();

    const html = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="left" id="${advance.layout.css_id}" class="${className} ${advance.layout.css_class}" style="${desktopStyles}">
      ${txtHtml}
    </td>
  </tr>
</table>
`.trim();

    return { html, formateTabletStyles, formateMobileStyles, customStyles };
}