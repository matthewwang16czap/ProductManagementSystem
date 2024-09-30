import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getShop } from "../users/usersSlice";
import { deleteProduct } from "../products/productsSlice";

const ShopPage = () => {
  const dispatch = useDispatch();
  const { shop, loading, error } = useSelector((state) => state.users);
  const { lastActionType } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getShop());
  }, [dispatch]);

  useEffect(() => {
    console.log("here", lastActionType);
  }, [lastActionType]);

  useEffect(() => {
    if (lastActionType?.includes("products/deleteProduct")) {
      dispatch(getShop()); // Refresh shop after product is deleted
    }
  }, [lastActionType, dispatch]);

  if (lastActionType?.includes("users/getShop") && error) {
    return <p>error</p>;
  }

  // if (loading) {
  //   return <p>loading</p>;
  // }

  return (
    <div className="container-fluid p-3" style={{ maxWidth: "600px" }}>
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h5>Shop ({shop?.length})</h5>
      </header>

      {/* Shop Items */}
      <section className="mb-3">
        <ul className="list-unstyled">
          {shop?.map((item) => (
            <li key={item.productId._id} className="card mb-2 p-2">
              <div className="d-flex text-center">
                <img
                  src={"/" + item.productId.imageUrl}
                  alt={item.productId.name}
                  style={{ width: "6em", height: "6em", objectFit: "contain" }}
                  className="me-3"
                />
                <div className="flex-grow-1">
                  <h6>
                    <Link to={`/products/${item.productId._id}`}>
                      {item.productId.name}
                    </Link>
                  </h6>
                  <div className="text-muted">${item.productId.price}</div>
                  <div className="text-muted">
                    stock: {item.productId.stock}
                  </div>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    // delete product
                    dispatch(
                      deleteProduct({
                        productId: item.productId._id,
                      })
                    );
                  }}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ShopPage;
