document.getElementById("addProductForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  const res = await fetch("https://ecommerce-electronics-0j4e.onrender.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  if (res.ok) {
    alert("Product successfully added!");
    this.reset();
  } else {
    alert("Error: " + result.error);
  }
});
