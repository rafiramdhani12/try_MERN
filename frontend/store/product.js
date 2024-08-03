import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all field" };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  },
  fetchProducts: async () => {
    const res = await fetch("api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  fetchDetailProducts: async (id) => {
    try {
      if (!id) {
        throw new Error("ID is undefined");
      }
      console.log("Fetching details for ID:", id); // Logging ID
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? data.data : product
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Failed to fetch product details:", error);
      return { success: false, message: error.message };
    }
  },
  deleteProducts: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    // kode di bawah ini berguna disaat kita melakukan event pengahapusan makan akan langsung merubah state tanpa di reload
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },
  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return {
          success: false,
          message: errorData.message || "Failed to update product",
        };
      }

      const data = await res.json();

      if (!data.success) return { success: false, message: data.message };

      // Update UI immediately without needing a refresh
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message || "An error occurred" };
    }
  },
}));
