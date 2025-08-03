import { IconBlockTypes } from "../../types/context/design.types";
import { toSize, spacing } from "./_helpers/helpers.fn";
import { RenderFragmentTypes } from "./_helpers/renderer.types";

export const renderIcon = (data: IconBlockTypes): RenderFragmentTypes => {
    const { content, style, advance } = data;
    const cls = data.id;
    const iconCls = `${cls}-ico`;
    const bg = advance.background;
    const brd = advance.border;

    const shapeRadius = (shape: string, radius: string) => {
        switch (shape) {
            case "circle":
                return "50%";
            case "square":
                return radius || "0px";
            default:
                return "0px"
        }
    };

    const wrapperDesktop = [
        bg.background_type === "color" && bg.color ? `background-color:${bg.color}` : "",
        bg.background_type === "image" && bg.image?.url ? `background:url('${bg.image.url}') ${bg.image.position || "center"} / ${bg.image.size || "cover"} ${bg.image.repeat || "no-repeat"}` : "",
        brd.border_type && brd.border_color ? `border-style:${brd.border_type};border-color:${brd.border_color}` : "",
        spacing(brd.border_width.desktop) ? `border-width:${spacing(brd.border_width.desktop)}` : "",
        spacing(brd.border_radius.desktop) ? `border-radius:${spacing(brd.border_radius.desktop)}` : "",
        spacing(advance.layout.margin.desktop) ? `margin:${spacing(advance.layout.margin.desktop)}` : "",
        spacing(advance.layout.padding.desktop) ? `padding:${spacing(advance.layout.padding.desktop)}` : "",
        advance.responsive.desktop ? "display:none!important" : ""
    ].filter(Boolean).join(";");

    const iconDesktop = [
        "display:inline-block",
        content.alignment.desktop ? `margin:${content.alignment.desktop}` : "",
        toSize(style.size.desktop) ? `width:${toSize(style.size.desktop)};height:${toSize(style.size.desktop)}` : "",
        toSize(style.rotate.desktop) ? `transform:rotate(${style.rotate.desktop})` : "",
        `border-radius:${shapeRadius(content.shape, spacing(style.border_radius.desktop))}`
    ].filter(Boolean).join(";");

    const mediaWrap = (bp: "tablet" | "mobile") => [
        spacing(brd.border_width[bp]) ? `border-width:${spacing(brd.border_width[bp])}` : "",
        spacing(brd.border_radius[bp]) ? `border-radius:${spacing(brd.border_radius[bp])}` : "",
        spacing(advance.layout.margin[bp]) ? `margin:${spacing(advance.layout.margin[bp])}` : "",
        spacing(advance.layout.padding[bp]) ? `padding:${spacing(advance.layout.padding[bp])}` : "",
        advance.responsive[bp] ? "display:none!important" : ""
    ].filter(Boolean);

    const mediaIcon = (bp: "tablet" | "mobile") => [
        content.alignment[bp] ? `margin:${content.alignment[bp]}` : "",
        toSize(style.size[bp]) ? `width:${toSize(style.size[bp])};height:${toSize(style.size[bp])}` : "",
        toSize(style.rotate[bp]) ? `transform:rotate(${style.rotate[bp]})` : "",
        `border-radius:${shapeRadius(content.shape, spacing(style.border_radius[bp]))}`
    ].filter(Boolean);

    const formateTabletStyles = `
.${cls}{${mediaWrap("tablet").join(";")}}
.${iconCls}{${mediaIcon("tablet").join(";")}}
`.trim();

    const formateMobileStyles = `
.${cls}{${mediaWrap("tablet").join(";")}}
.${iconCls}{${mediaIcon("mobile").join(";")}}
`.trim();

    const customStyles = `${advance.custom_css || ""}`.trim();


    const iconSrc = content.content || "";

    const imgTag = `<img src="${iconSrc}" alt="Social Icon" class="${iconCls}" style="${iconDesktop}" />`;

    const linked = content.link.url
        ? `<a href="${content.link.url}" target="${content.link.open_in_new_window ? "_blank" : "_self"}" rel="${content.link.open_no_follow ? "nofollow" : ""}">${imgTag}</a>`
        : imgTag;

    const html = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td id="${advance.layout.css_id}" class="${cls} ${advance.layout.css_class}" style="${wrapperDesktop}">
      ${linked}
    </td>
  </tr>
</table>
`.trim();

    return { html, formateTabletStyles, formateMobileStyles, customStyles };
}