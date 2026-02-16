import "./ProductSidebar.css";
import LinkWithIcon from "./../Navbar/LinkWithIcon";
import useData from "../../hooks/useData";

const ProductSidebar = () => {
  const { data: categories, error } = useData(
    "/category",
    null,
    ["categories"],
    24 * 60 * 1000,
  );
  return (
    <section className="products_sidebar">
      <h2>Category</h2>
      <div className="category_list">
        {error && <em className="error_message">{error}</em>}
        {categories &&
          categories.map((category) => (
            <LinkWithIcon
              key={category._id}
              sidebar={true}
              title={category.name}
              link={`/products?category=${category.name}`}
              emoji={`https://cartwish-k8yo.onrender.com/category/${category.image}`}
            />
          ))}

        {/* <LinkWithIcon sidebar title="Electronics" link="/" emoji={rocket} /> */}
      </div>
    </section>
  );
};

export default ProductSidebar;
