import Item from './Item';

const ItemList = ({ products }) => {
    return (
        <div className="row g-4">
            {products.map((prod) => (
                <Item key={prod.id} product={prod} />
            ))}
        </div>
    );
};

export default ItemList;