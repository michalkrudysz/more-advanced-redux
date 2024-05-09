import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "Moja pierwsza książka",
    description: "Pierwsza książka, którą kiedykolwiek napisałem",
  },
  {
    id: "p2",
    price: 5,
    title: "Moja druga książka",
    description: "Druga książka, którą kiedykolwiek napisałem",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Kup swoje ulubione produkty</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
