import { RenderFragmentTypes } from "./_helpers/renderer.types";
import { HeadingBlockTypes } from "../../types/context/design.types";
import { toSize, spacing } from "./_helpers/helpers.fn";

export const renderHeading = (data: HeadingBlockTypes): RenderFragmentTypes => {
    const { content, style, advance } = data;
    const className = data.id;
    const baseStyle = style.typography;
    const { background, border } = advance;


    //_Helpers_Functions
    const renderText = () => {
        const tag = content.html_tag || "h2";
        const text = content.content || "";
        if (content.link?.url) {
            const rel = content.link.open_no_follow ? "nofollow" : "";
            const target = content.link.open_in_new_window ? "_blank" : "_self";
            return `<${tag}><a href="${content.link.url}" target="${target}" rel="${rel}">${text}</a></${tag}>`;
        }
        return `<${tag}>${text}</${tag}>`;
    };

    const desktopStyles = [
        `color:${style.text_color || "#6EC1E4"}`,
        baseStyle.family ? `font-family:${baseStyle.family}` : "",
        baseStyle.weight ? `font-weight:${baseStyle.weight}` : "",
        baseStyle.transform ? `text-transform:${baseStyle.transform}` : "",
        baseStyle.style ? `font-style:${baseStyle.style}` : "",
        baseStyle.decoration ? `text-decoration:${baseStyle.decoration}` : "",

        background.background_type === "color" && background.color ? `background-color:${background.color}` : "",
        background.background_type === "image" && background.image?.url ? `background:url('${background.image.url}') ${background.image.position || "center"} / ${background.image.size || "cover"} ${background.image.repeat || "no-repeat"}` : "",
        border.border_type && border.border_color ? `border-style:${border.border_type};border-color:${border.border_color}` : "",
        spacing(border.border_width.desktop) ? `border-width:${spacing(border.border_width.desktop)}` : "",
        spacing(border.border_radius.desktop) ? `border-radius:${spacing(border.border_radius.desktop)}` : "",

        toSize(baseStyle.size.desktop) ? `font-size:${toSize(baseStyle.size.desktop)}` : `font-size:${content.size}`,
        toSize(baseStyle.line_height.desktop) ? `line-height:${toSize(baseStyle.line_height.desktop)}` : "",
        toSize(baseStyle.letter_spacing.desktop) ? `letter-spacing:${toSize(baseStyle.letter_spacing.desktop)}` : "",
        toSize(baseStyle.word_spacing.desktop) ? `word-spacing:${toSize(baseStyle.word_spacing.desktop)}` : "",

        content.alignment.desktop ? `text-align:${content.alignment.desktop}` : "",
        spacing(advance.layout.margin.desktop) ? `margin:${spacing(advance.layout.margin.desktop)}` : "",
        spacing(advance.layout.padding.desktop) ? `padding:${spacing(advance.layout.padding.desktop)}` : "",

        advance.responsive.desktop ? "display:none!important" : ""
    ].filter(Boolean).join(";");

    const tabletStyles = [
        toSize(baseStyle.size.tablet) ? `font-size:${toSize(baseStyle.size.tablet)}` : "",
        toSize(baseStyle.line_height.tablet) ? `line-height:${toSize(baseStyle.line_height.tablet)}` : "",
        toSize(baseStyle.letter_spacing.tablet) ? `letter-spacing:${toSize(baseStyle.letter_spacing.tablet)}` : "",
        toSize(baseStyle.word_spacing.tablet) ? `word-spacing:${toSize(baseStyle.word_spacing.tablet)}` : "",
        content.alignment.tablet ? `text-align:${content.alignment.tablet}` : "",
        spacing(advance.layout.margin.tablet) ? `margin:${spacing(advance.layout.margin.tablet)}` : "",
        spacing(advance.layout.padding.tablet) ? `padding:${spacing(advance.layout.padding.tablet)}` : "",
        spacing(border.border_width.tablet)
            ? `border-width:${spacing(border.border_width.tablet)}`
            : "",
        spacing(border.border_radius.tablet)
            ? `border-radius:${spacing(border.border_radius.tablet)}`
            : "",
        advance.responsive.tablet ? "display:none!important" : ""
    ].filter(Boolean);

    const mobileStyles = [
        toSize(baseStyle.size.mobile) ? `font-size:${toSize(baseStyle.size.mobile)}` : "",
        toSize(baseStyle.line_height.mobile) ? `line-height:${toSize(baseStyle.line_height.mobile)}` : "",
        toSize(baseStyle.letter_spacing.mobile) ? `letter-spacing:${toSize(baseStyle.letter_spacing.mobile)}` : "",
        toSize(baseStyle.word_spacing.mobile) ? `word-spacing:${toSize(baseStyle.word_spacing.mobile)}` : "",
        content.alignment.mobile ? `text-align:${content.alignment.mobile}` : "",
        spacing(advance.layout.margin.mobile) ? `margin:${spacing(advance.layout.margin.mobile)}` : "",
        spacing(advance.layout.padding.mobile) ? `padding:${spacing(advance.layout.padding.mobile)}` : "",
        spacing(border.border_width.mobile)
            ? `border-width:${spacing(border.border_width.mobile)}`
            : "",
        spacing(border.border_radius.mobile)
            ? `border-radius:${spacing(border.border_radius.mobile)}`
            : "",
        advance.responsive.mobile ? "display:none!important" : ""
    ].filter(Boolean);

    const formateTabletStyles = `
    .${className} {
    ${tabletStyles.join(";")}
    }`.trim();

    const formateMobileStyles = `
    .${className} {
    ${mobileStyles.join(";")}
    }`.trim();

    const customStyles = `
    ${advance.custom_css || ""}
    `.trim();

    const html = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center" id="${advance.layout.css_id}" class="${className} ${advance.layout.css_class}" style="${desktopStyles}">
        ${renderText()}
        </td>
    </tr>
    </table>
    `.trim();

    return { html, formateTabletStyles, formateMobileStyles, customStyles };
}