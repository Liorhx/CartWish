import "./Pagination.css";

const Pagination = ({
  totalProducts,
  productsPerPage,
  onClick,
  currentPage,
}) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pages.push(i);
  }
  console.log("pages", pages);
  return (
    <>
      <ul className="pagination">
        {pages.length > 1 &&
          pages.map((page) => (
            <li key={page}>
              <button
                onClick={() => onClick(page)}
                className={
                  parseInt(currentPage) === page
                    ? "pagination_button active"
                    : "pagination_button"
                }
              >
                {page}
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Pagination;
