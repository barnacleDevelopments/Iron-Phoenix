(function () {
  const allergyListContainer = document.getElementById(
    "allergy-list-container"
  );

  const Proc = new Product();
  if (allergyListContainer) {
    // ======================================
    // ALLERGY MANAGEMENT HANDLER MANAGEMENT
    // ======================================
    document.getElementById("allergy-input").addEventListener("click", (e) => {
      let targetElement = e.target;

      if (targetElement.id === "allergy-save-btn") {
        proc.create();
      }
    });
  }
})();
