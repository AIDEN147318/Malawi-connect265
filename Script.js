
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navigation = document.getElementById("navigation");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const searchMessage = document.getElementById("search-message");
  const actionMessage = document.getElementById("action-message");
  const serviceCards = document.querySelectorAll(".service-card");

  // Automatically display the current year.
  document.getElementById("year").textContent =
    new Date().getFullYear();

  // Open and close the mobile navigation.
  menuToggle.addEventListener("click", function () {
    const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Close the mobile menu after selecting a link.
  navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navigation.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });

  // Search the service categories on the homepage.
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      searchMessage.textContent =
        "Please type something to search for.";
      return;
    }

    let matches = 0;

    serviceCards.forEach(function (card) {
      const searchableText = (
        card.innerText + " " +
        (card.dataset.search || "")
      ).toLowerCase();

      const matched = searchableText.includes(query);

      card.hidden = !matched;

      if (matched) {
        matches++;
      }
    });

    if (matches > 0) {
      searchMessage.textContent =
        "Found " + matches + " service category. Explore below.";
    } else {
      searchMessage.textContent =
        "No matching categories found. Try jobs, business, taxi or food.";
    }

    document.querySelector(".categories").scrollIntoView({
      behavior: "smooth"
    });
  });

  // Show helpful messages when users select an action.
  document.querySelectorAll("[data-message]").forEach(function (button) {
    button.addEventListener("click", function () {
      actionMessage.textContent = button.dataset.message;
    });
  });
});
