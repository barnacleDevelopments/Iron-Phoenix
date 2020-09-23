/*
===============================
Material Elements
===============================
*/
// create material large preloader
function createBigPreloader() {
  return `  
      <div style="width: 100%; margin: 0 auto;">
      <div class="preloader-wrapper big active" style="margin: 0 auto;">
        <div class="spinner-layer spinner-green-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
      </div>`;
}

// create material small preloader
function createSmallPreloader() {
  let element = document.createElement("div");
  element.innerHTML = `
  <div class="preloader-wrapper active">
    <div class="spinner-layer spinner-green-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
`;
  return element;
}

// create chip element
function createChipElement(name, id, chipStatus) {
  let allElement = document.createElement("div");
  allElement.setAttribute("class", "chip");
  allElement.setAttribute("data-allid", id);
  allElement.innerHTML = `${name}`;
  allElement.setAttribute("data-chipstatus", chipStatus);
  if (chipStatus === "active") {
    allElement.setAttribute(
      "style",
      "background-color: #5cb85c; color: white;"
    );
  } else {
    allElement.setAttribute(
      "style",
      "background-color: #e4e4e4; color: #0009;"
    );
  }
  return allElement;
}

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
