import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../components/ItemDetail';

const ItemDetailContainer = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://68fa7e15ef8b2e621e802566.mockapi.io/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="container mt-5 text-center"><h2>Cargando...</h2></div>;
    }

    return (
        <div>
        {product && <ItemDetail product={product} />}
        </div>
    );
};

export default ItemDetailContainer;