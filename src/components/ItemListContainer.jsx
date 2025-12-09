import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const { categoryId } = useParams(); 

    useEffect(() => {
        const baseUrl = "https://68fa7e15ef8b2e621e802566.mockapi.io/products";
        
        const url = categoryId 
            ? `${baseUrl}?category=${categoryId}` 
            : baseUrl;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    setProducts([]); 
                }
            })
            .catch((error) => console.error("Error fetching data:", error));

    }, [categoryId]); 

    return (
        <div className="container mt-4">
            <h2>{categoryId ? `Categoría: ${categoryId}` : "Todos los productos"}</h2>
            <ItemList products={products} />
        </div>
    );
};

export default ItemListContainer;