const API_URL = "https://68fa7e15ef8b2e621e802566.mockapi.io/products";

export const getProducts = async (page = 1, limit = 10, filter = '') => {
  let url = `${API_URL}?page=${page}&limit=${limit}`;
  
  if (filter) {
    url = `${API_URL}?name=${filter}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al cargar productos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Producto no encontrado');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creando producto:", error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error actualizando producto:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    console.error("Error eliminando producto:", error);
    throw error;
  }
};