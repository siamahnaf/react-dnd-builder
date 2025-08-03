import { HtmlBlockTypes } from "../../types/context/design.types";
import { spacing } from "./_helpers/helpers.fn";
import { RenderFragmentTypes } from "./_helpers/renderer.types";

export const renderHtml = (data: HtmlBlockTypes): RenderFragmentTypes => {
    const { content, advance } = data;
    const cls = data.id;
    const bg = advance.background;
    const brd = advance.border;

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

    const mediaWrap = (bp: "tablet" | "mobile") => [
        spacing(brd.border_width[bp]) ? `border-width:${spacing(brd.border_width[bp])}` : "",
        spacing(brd.border_radius[bp]) ? `border-radius:${spacing(brd.border_radius[bp])}` : "",
        spacing(advance.layout.margin[bp]) ? `margin:${spacing(advance.layout.margin[bp])}` : "",
        spacing(advance.layout.padding[bp]) ? `padding:${spacing(advance.layout.padding[bp])}` : "",
        advance.responsive[bp] ? "display:none!important" : ""
    ].filter(Boolean);

    const formateTabletStyles = `
.${cls}{${mediaWrap("tablet").join(";")}}
`.trim();

    const formateMobileStyles = `
.${cls}{${mediaWrap("mobile").join(";")}}
`.trim();

    const customStyles = `${advance.custom_css || ""}`.trim();

    const html = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td id="${advance.layout.css_id}" class="${cls} ${advance.layout.css_class}" style="${wrapperDesktop}">
      ${content.content}
    </td>
  </tr>
</table>
`.trim();
    return { html, formateTabletStyles, formateMobileStyles, customStyles };
};