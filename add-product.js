document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
});

document.getElementById("addProductForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const newCategory = document.getElementById("newCategoryInput").value.trim();

  if (newCategory) {
    formData.set("category", newCategory);
    await createNewCategory(newCategory);
  }

  const plainData = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("https://ecommerce-electronics-0j4e.onrender.com/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plainData),
    });

    const result = await res.json();
    if (res.ok) {
      alert("Product successfully added!");
      this.reset();
      loadCategories(); // refresh categories in case a new one was added
    } else {
      alert("Error: " + result.error);
    }
  } catch (err) {
    console.error(err);
    alert("Failed to connect to server");
  }
});