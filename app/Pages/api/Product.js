export async function fetchProducts () {
    const res = await fetch("/Product.json");
    if (!res.ok) {
      throw new Error("Failed to fetch product data");
    }
    return await res.json();
  }
  

