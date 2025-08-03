export const containerData = {
    id: "",
    type: "container",
    name: "Container",
    display: true,
    nodes: [],
    layout: {
        container: {
            width: {
                mobile: { value: "100", unit: "%" },
                tablet: { value: "100", unit: "%" },
                desktop: { value: "600", unit: "px" }
            },
            min_height: {
                mobile: { value: "", unit: "px" },
                tablet: { value: "", unit: "px" },
                desktop: { value: "", unit: "px" }
            },
            display_type: { mobile: "block", tablet: "block", desktop: "block" },
            display_direction: { mobile: "", tablet: "", desktop: "" },
            grid_type: { mobile: "", tablet: "", desktop: "" },
            justify_content: { mobile: "", tablet: "", desktop: "" },
            align_items: { mobile: "", tablet: "", desktop: "" },
            gaps: {
                mobile: { column: "", row: "", unit: "px" },
                tablet: { column: "", row: "", unit: "px" },
                desktop: { column: "", row: "", unit: "px" }
            }
        },
        additional_options: {
            html_tag: "div"
        }
    },
    style: {
        background: {
            background_type: "color",
            color: "",
            image: {
                url: "",
                props: {
                    alt_text: "",
                    caption: ""
                },
                size: "",
                position: "",
                repeat: ""
            }
        },
        border: {
            border_type: "",
            border_width: {
                mobile: { top: "", right: "", bottom: "", left: "", unit: "px" },
                tablet: { top: "", right: "", bottom: "", left: "", unit: "px" },
                desktop: { top: "", right: "", bottom: "", left: "", unit: "px" }
            },
            border_color: "",
            border_radius: {
                mobile: { top: "", right: "", bottom: "", left: "", unit: "px" },
                tablet: { top: "", right: "", bottom: "", left: "", unit: "px" },
                desktop: { top: "", right: "", bottom: "", left: "", unit: "px" }
            }
        }
    },
    advance: {
        layout: {
            margin: {
                mobile: { top: "", right: "", bottom: "", left: "", unit: "px" },
                tablet: { top: "", right: "", bottom: "", left: "", unit: "px" },
                desktop: { top: "", right: "", bottom: "", left: "", unit: "px" }
            },
            padding: {
                mobile: { top: "10", right: "10", bottom: "10", left: "10", unit: "px" },
                tablet: { top: "10", right: "10", bottom: "10", left: "10", unit: "px" },
                desktop: { top: "10", right: "10", bottom: "10", left: "10", unit: "px" }
            },
            css_id: "",
            css_class: ""
        },
        responsive: {
            mobile: false,
            tablet: false,
            desktop: false
        },
        custom_css: ""
    }
}