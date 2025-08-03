import { RenderFragmentTypes } from "./_helpers/renderer.types";
import { ContainerBlockTypes } from "../../types/context/design.types";
import { toSize, spacing } from "./_helpers/helpers.fn";
import { renderNodes } from "./nodes.build";

export const renderContainer = (data: ContainerBlockTypes): RenderFragmentTypes => {
    //_helpers_function
    const fragments = renderNodes(data.nodes);
    const prevTabStyles = fragments.map(f => f.formateTabletStyles).join("\n");
    const prevMobileStyles = fragments.map(f => f.formateMobileStyles).join("\n");
    const prevCustomStyles = fragments.map(f => f.customStyles).join("\n");
    const childHtml = fragments.map(f => f.html).join("\n");

    //Building Styles
    const desktopStyles = [
        `width:${toSize(data.layout.container.width.desktop)}`,
        data.layout.container.min_height.desktop.value ? `min-height:${toSize(data.layout.container.min_height.desktop)}` : "",
        `display:${data.layout.container.display_type.desktop || "block"}`,
        data.layout.container.display_type.desktop === "flex" && data.layout.container.display_direction.desktop
            ? `flex-direction:${data.layout.container.display_direction.desktop}`
            : "",
        data.layout.container.display_type.desktop === "grid" && data.layout.container.grid_type.desktop
            ? `grid-template-columns:${data.layout.container.grid_type.desktop}`
            : "",
        data.layout.container.justify_content.desktop
            ? `justify-content:${data.layout.container.justify_content.desktop}`
            : "",
        data.layout.container.align_items.desktop
            ? `align-items:${data.layout.container.align_items.desktop}`
            : "",
        (data.layout.container.gaps.desktop.column || data.layout.container.gaps.desktop.row)
            ? `column-gap:${data.layout.container.gaps.desktop.column || 0}${data.layout.container.gaps.desktop.unit || "px"};row-gap:${data.layout.container.gaps.desktop.row}${data.layout.container.gaps.desktop.unit}`
            : "",


        data.style.background.color === "color" && data.style.background.color ? `background-color:${data.style.background.color}` : "",
        data.style.background.background_type === "image" && data.style.background.image.url
            ? `background:url('${data.style.background.image.url}') ${data.style.background.image.position || "center"} / ${data.style.background.image.size || "cover"
            } ${data.style.background.image.repeat || "no-repeat"}`
            : "",

        data.style.border.border_type && data.style.border.border_color
            ? `border-style:${data.style.border.border_type};border-color:${data.style.border.border_color}` : "",

        spacing(data.style.border.border_width.desktop) ? `border-width:${spacing(data.style.border.border_width.desktop)}` : "",
        spacing(data.style.border.border_radius.desktop) ? `border-radius:${spacing(data.style.border.border_radius.desktop)}` : "",

        spacing(data.advance.layout.padding.desktop) ? `padding:${spacing(data.advance.layout.padding.desktop)}` : "",
        spacing(data.advance.layout.margin.desktop) ? `margin:${spacing(data.advance.layout.margin.desktop)}` : "",
        data.advance.responsive.desktop ? "display:none!important" : ""
    ]
        .filter(Boolean)
        .join("; ");


    const tabletStyles = [
        data.layout.container.width.tablet ? `width:${toSize(data.layout.container.width.tablet)}` : "",
        data.layout.container.min_height.tablet.value ? `min-height:${toSize(data.layout.container.min_height.tablet)}` : "",
        data.layout.container.display_type.tablet ? `display:${data.layout.container.display_type.tablet}` : "",
        data.layout.container.display_type.tablet === "flex" && data.layout.container.display_direction.tablet
            ? `flex-direction:${data.layout.container.display_direction.tablet}`
            : "",
        data.layout.container.display_type.tablet === "grid" && data.layout.container.grid_type.tablet
            ? `grid-template-columns:${data.layout.container.grid_type.tablet}`
            : "",
        data.layout.container.justify_content.tablet
            ? `justify-content:${data.layout.container.justify_content.tablet}`
            : "",
        data.layout.container.align_items.tablet
            ? `align-items:${data.layout.container.align_items.tablet}`
            : "",
        (data.layout.container.gaps.tablet.column || data.layout.container.gaps.tablet.row)
            ? `column-gap:${data.layout.container.gaps.tablet.column}${data.layout.container.gaps.tablet.unit};row-gap:${data.layout.container.gaps.tablet.row}${data.layout.container.gaps.tablet.unit}`
            : "",
        data.style.border.border_type && data.style.border.border_color
            ? `border-style:${data.style.border.border_type};border-color:${data.style.border.border_color}`
            : "",
        spacing(data.style.border.border_width.tablet)
            ? `border-width:${spacing(data.style.border.border_width.tablet)}`
            : "",
        spacing(data.style.border.border_radius.tablet)
            ? `border-radius:${spacing(data.style.border.border_radius.tablet)}`
            : "",

        spacing(data.advance.layout.padding.tablet) ? `padding:${spacing(data.advance.layout.padding.tablet)}` : "",
        spacing(data.advance.layout.margin.tablet) ? `margin:${spacing(data.advance.layout.padding.tablet)}` : "",
        data.advance.responsive.tablet ? "display:none!important" : ""
    ].filter(Boolean);

    const mobileStyles = [
        data.layout.container.width.mobile ? `width:${toSize(data.layout.container.width.mobile)}` : "",
        data.layout.container.min_height.mobile.value ? `min-height:${toSize(data.layout.container.min_height.mobile)}` : "",
        data.layout.container.display_type.mobile ? `display:${data.layout.container.display_type.mobile}` : "",
        data.layout.container.display_type.mobile === "flex" && data.layout.container.display_direction.mobile
            ? `flex-direction:${data.layout.container.display_direction.mobile}`
            : "",
        data.layout.container.display_type.mobile === "grid" && data.layout.container.grid_type.mobile
            ? `grid-template-columns:${data.layout.container.grid_type.mobile}`
            : "",
        data.layout.container.justify_content.mobile
            ? `justify-content:${data.layout.container.justify_content.mobile}`
            : "",
        data.layout.container.align_items.mobile
            ? `align-items:${data.layout.container.align_items.mobile}`
            : "",
        (data.layout.container.gaps.mobile.column || data.layout.container.gaps.mobile.row)
            ? `column-gap:${data.layout.container.gaps.mobile.column}${data.layout.container.gaps.mobile.unit};row-gap:${data.layout.container.gaps.mobile.row}${data.layout.container.gaps.mobile.unit}`
            : "",
        data.style.border.border_type && data.style.border.border_color
            ? `border-style:${data.style.border.border_type};border-color:${data.style.border.border_color}`
            : "",
        spacing(data.style.border.border_width.mobile)
            ? `border-width:${spacing(data.style.border.border_width.mobile)}`
            : "",
        spacing(data.style.border.border_radius.mobile)
            ? `border-radius:${spacing(data.style.border.border_radius.mobile)}`
            : "",
        spacing(data.advance.layout.padding.mobile) ? `padding:${spacing(data.advance.layout.padding.mobile)}` : "",
        spacing(data.advance.layout.margin.mobile) ? `margin:${spacing(data.advance.layout.margin.mobile)}` : "",
        data.advance.responsive.mobile ? "display:none!important" : ""
    ].filter(Boolean);

    const formateTabletStyles = `
    .${data.id} {
        ${tabletStyles.join(";")}
    }
    ${prevTabStyles}
    `.trim();
    const formateMobileStyles = `
    .${data.id} {
        ${mobileStyles.join(";")}
    }
    ${prevMobileStyles}
    `.trim();
    const customStyles = `
    ${data.advance.custom_css || ""}
    ${prevCustomStyles}
    `.trim()

    //HTML
    const html = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" class="u-row">
            <tr>
              <td id="${data.advance.layout.css_id}" class="${data.id} ${data.advance.layout.css_class}" style="${desktopStyles}">
                <${data.layout.additional_options.html_tag || "div"} class="${data.id}">
                    ${childHtml}
                </${data.layout.additional_options.html_tag || "div"}>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `.trim();

    return { html, formateTabletStyles, formateMobileStyles, customStyles }
};
