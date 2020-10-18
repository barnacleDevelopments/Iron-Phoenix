/*
===============================
Material Elements
===============================
*/


//  create form tip
function createFormTip(tipType, text, tip) {
  // create element
  let element = document.createElement("div");

  // get element color
  let elementColor;
  switch (tipType) {
    case "warning":
      elementColor = "red";
      break;
    case "recomend":
      elementColor = "blue";
      break;
    default:
      elementColor = " #5cb85c";
      break;
  }
  // set element id
  element.setAttribute("class", "tip-menu");
  element.setAttribute("data-tipcolor", elementColor);

  // create title & text
  element.innerHTML = `
  <div>
    <p style="display: inline">${text}</p>
    <i class="material-icons">arrow_drop_down</i>
  </div>
  `;
  element.addEventListener("click", () => {
    if (!document.getElementById("tip-element")) {
      let tipElement = document.createElement("div");
      tipElement.setAttribute("id", "tip-element");
      tipElement.setAttribute(
        "style",
        `width: 100%; background-color: #ffffff; padding: 10px 20px; border: 2px solid ${elementColor}`
      );
      tipElement.innerHTML = `<p style="color:black; font-size: 14px !important; text-indent: 20px;">Tip: ${tip}</p>`;
      element.append(tipElement);
    } else {
      document.getElementById("tip-element").remove();
    }
  });

  return element;
}
