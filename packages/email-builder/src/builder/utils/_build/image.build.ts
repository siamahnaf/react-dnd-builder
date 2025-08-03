import { ImageBlockTypes } from "../../types/context/design.types";
import { RenderFragmentTypes } from "./_helpers/renderer.types";
import { toSize, spacing } from "./_helpers/helpers.fn";


export const renderImage = (data: ImageBlockTypes): RenderFragmentTypes => {
    const { content, style, advance } = data;
    const cls = data.id;
    const imgCls = `${cls}-img`;
    const wrapBg = advance.background;
    const wrapBorder = advance.border;
    const imgBorder = style.border;

    const getImageSize = () => {
        if (content.size === "custom") {
            return {
                width: Number(content.custom_size.width),
                height: Number(content.custom_size.height)
            }
        } else if (content.size) {
            const size = content.size?.split("×");
            return {
                width: Number(size[0] || 1200),
                height: Number(size[1] || 1200)
            }
        } else {
            return {
                width: 1200,
                height: 1200
            }
        }
    }

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

    const imgDesktop = [
        "display:block",
        content.alignment.desktop ? `margin:${content.alignment.desktop}` : "",
        `opacity:${style.opacity ?? "1"}`,
        toSize(style.width.desktop) ? `width:${toSize(style.width.desktop)}` : "",
        toSize(style.height.desktop) ? `height:${toSize(style.height.desktop)}` : "",
        style.object_fit.desktop ? `object-fit:${style.object_fit.desktop}` : "",
        imgBorder.border_type && imgBorder.border_color ? `border-style:${imgBorder.border_type};border-color:${imgBorder.border_color}` : "",
        spacing(imgBorder.border_width.desktop) ? `border-width:${spacing(imgBorder.border_width.desktop)}` : "",
        spacing(imgBorder.border_radius.desktop) ? `border-radius:${spacing(imgBorder.border_radius.desktop)}` : ""
    ].filter(Boolean).join(";");

    const buildWrapArr = (bp: "tablet" | "mobile") => [
        spacing(wrapBorder.border_width[bp]) ? `border-width:${spacing(wrapBorder.border_width[bp])}` : "",
        spacing(wrapBorder.border_radius[bp]) ? `border-radius:${spacing(wrapBorder.border_radius[bp])}` : "",
        spacing(advance.layout.margin[bp]) ? `margin:${spacing(advance.layout.margin[bp])}` : "",
        spacing(advance.layout.padding[bp]) ? `padding:${spacing(advance.layout.padding[bp])}` : "",
        advance.responsive[bp] ? "display:none!important" : ""
    ].filter(Boolean);

    const buildImgArr = (bp: "tablet" | "mobile") => [
        content.alignment[bp] ? `margin:${content.alignment[bp]}` : "",
        toSize(style.width[bp]) ? `width:${toSize(style.width[bp])}` : "",
        toSize(style.height[bp]) ? `height:${toSize(style.height[bp])}` : "",
        style.object_fit[bp] ? `object-fit:${style.object_fit[bp]}` : "",
        spacing(imgBorder.border_width[bp]) ? `border-width:${spacing(imgBorder.border_width[bp])}` : "",
        spacing(imgBorder.border_radius[bp]) ? `border-radius:${spacing(imgBorder.border_radius[bp])}` : ""
    ].filter(Boolean);

    const tabletImgArr = buildImgArr("tablet");
    const mobileImgArr = buildImgArr("mobile");
    const tabletWrapArr = buildWrapArr("tablet");
    const mobileWrapArr = buildWrapArr("mobile");

    const formateTabletStyles = `
.${cls}{${tabletWrapArr.join(";")}}
.${imgCls}{${tabletImgArr.join(";")}}
`.trim();

    const formateMobileStyles = `
.${cls}{${mobileWrapArr.join(";")}}
.${imgCls}{${mobileImgArr.join(";")}}
`.trim();

    const customStyles = `${advance.custom_css || ""}`.trim();


    const imgTag = `<img src="${content.content}" alt="${content.alt_text || ""}" class="${imgCls}" width="${getImageSize().width}" height="${getImageSize().height}" style="${imgDesktop}" />`;

    const linkedImg = content.link.url
        ? `<a href="${content.link.url}" target="${content.link.open_in_new_window ? "_blank" : "_self"}" rel="${content.link.open_no_follow ? "nofollow" : ""}">${imgTag}</a>`
        : imgTag;

    const tdId = advance.layout.css_id || "";
    const tdCls = `${cls} ${advance.layout.css_class || ""}`;

    const html = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td id="${tdId}" class="${tdCls}" style="${wrapperDesktop}">
      ${linkedImg}
    </td>
  </tr>
</table>
`.trim();

    return { html, formateTabletStyles, formateMobileStyles, customStyles };

}