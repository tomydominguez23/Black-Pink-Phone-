const filtersContainer = document.getElementById("brandFilters");
const filterButtons = Array.from(filtersContainer.querySelectorAll("button"));
const productCards = Array.from(document.querySelectorAll(".product-card"));
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cartCount");
const addCartButtons = document.querySelectorAll(".add-cart");
const noResults = document.getElementById("noResults");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const currentYear = document.getElementById("currentYear");
const newsletterForm = document.querySelector(".newsletter-form");

let activeFilter = "all";
let itemsInCart = 0;

function normalizeText(text) {
  return text.toLowerCase().trim();
}

function renderProducts() {
  const searchTerm = normalizeText(searchInput.value);
  let visibleCount = 0;

  productCards.forEach((card) => {
    const brand = card.dataset.brand;
    const name = normalizeText(card.dataset.name || "");
    const brandMatches = activeFilter === "all" || brand === activeFilter;
    const searchMatches = !searchTerm || name.includes(searchTerm);
    const shouldShow = brandMatches && searchMatches;

    card.classList.toggle("hidden", !shouldShow);
    if (shouldShow) visibleCount += 1;
  });

  noResults.classList.toggle("hidden", visibleCount > 0);
}

filtersContainer.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  activeFilter = button.dataset.filter;

  filterButtons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");

  renderProducts();
});

searchInput.addEventListener("input", renderProducts);

addCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    itemsInCart += 1;
    cartCount.textContent = itemsInCart;
    button.textContent = "Agregado";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = "Agregar al carrito";
      button.disabled = false;
    }, 1200);
  });
});

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Gracias por suscribirte. Tu cupon del 10% llegara a tu correo.");
  newsletterForm.reset();
});

currentYear.textContent = new Date().getFullYear();
renderProducts();
