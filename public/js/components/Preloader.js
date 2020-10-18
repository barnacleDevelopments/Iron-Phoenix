
class Preloader {
    constructor() {

    }
    // create material large preloader
BigPreloader() {
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
  SmallPreloader() {
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
}
