import { DesignValueTypes } from "../../types/context/design.types";
import { renderContainer } from "./container.build";

export const render = (design: DesignValueTypes) => {
  //_helpers_functions
  const fragments = design.rows.map(renderContainer);
  const tabletStyles = fragments.map(f => f.formateTabletStyles).join("\n");
  const mobileStyles = fragments.map(f => f.formateMobileStyles).join("\n");
  const customStyles = fragments.map(f => f.customStyles).join("\n");
  const child = fragments.map(f => f.html).join("\n")

  //Build Styles
  const style = `
  <style type="text/css">
    @media only screen and (min-width:641px) and (max-width:1024px) {
      ${tabletStyles}
    }
    @media only screen and (max-width:640px) {
      ${mobileStyles}
    }
    ${customStyles}
  </style>
  `.trim();

  //Build HTML
  const html = `
     <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      ${style}
    </head>
    <body style="margin: 0; padding: 0; background-color: ${design.background || "#FFFFFF"};">
      ${child}
    </body>
    </html>
    `.trim()

  return html;
}