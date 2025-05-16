document.getElementById("addProductForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
  
    console.log("Submitting Product:", data);
  
    // Future: Send to backend via fetch POST
    alert("Product added successfully (not really, just simulated)");
    this.reset();
  });
  