import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { getAllProducts, deleteProduct } from "./productsSlice";
import { getUser } from "../users/usersSlice";
import AddCartComponent from "./AddCartComponent";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  const {
    products,
    productsTotal,
    lastActionType,
    error: productsError,
  } = useSelector((state) => state.products);
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.users);
  const total = Math.ceil(productsTotal / 10);

  useEffect(() => {
    dispatch(getAllProducts({ page: page || 0, limit: limit || 10 }));
  }, [dispatch, page, limit]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (lastActionType?.includes("products/deleteProduct")) {
      dispatch(getAllProducts({ page: page || 0, limit: limit || 10 })); // Refresh after product is deleted
    }
  }, [lastActionType, dispatch, page, limit]);

  useEffect(() => {
    console.log(products, productsTotal, productsError);
  }, [products, productsTotal, productsError]);

  return (
    <div>
      <header>
        <div>
          <h1>Products</h1>
        </div>
      </header>

      <main className="d-flex flex-row align-content-start flex-wrap m-3">
        {products?.map((item) => (
          <div className="p-2" key={item._id}>
            <div
              className="card text-center"
              style={{ width: "14rem", height: "20rem" }}
            >
              <div className="card-img-top" onMouseDown={() => navigate(`/products/${item._id}`)}>
                <img
                  src={"/" + item.imageUrl}
                  className="m-1"
                  style={{
                    maxWidth: "90%",
                    height: "10em",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div className="card-body">
                <p
                  className="card-text"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.name}
                </p>
                <p className="card-title">${item.price}</p>
                <div>
                  {user?._id === item.userId ? (
                    <div>
                      <button type="button" className="btn btn-light m-3">
                        <Link
                          to={`/products/${item._id}/edit`}
                          style={{ textDecoration: "none" }}
                        >
                          edit
                        </Link>
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger m-3"
                        onMouseDown={() => {
                          dispatch(deleteProduct({ productId: item._id }));
                        }}
                      >
                        delete
                      </button>
                    </div>
                  ) : (
                    <AddCartComponent productId={item._id} />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      <footer
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "20px",
        }}
      >
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => navigate(`/products?page=${Math.max(1, page-1)}`)}
              >
                Previous
              </button>
            </li>
            {[...Array(total)].map((_, index) => (
              <li key={index} className="page-item">
                <button
                  className="page-link"
                  onClick={() => navigate(`/products?page=${index+1}`)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => navigate(`/products?page=${Math.min(total, page+1)}`)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default ProductsPage;
