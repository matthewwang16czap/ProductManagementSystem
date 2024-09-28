import Form from "../../ui/Form";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createProduct, uploadProductImage } from "./productsSlice";

function CreateProductsPage() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const { lastActionType, lastActionPayload, loading, error } = useSelector(
    (state) => state.products
  );
  const { user } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(lastActionType, lastActionPayload, loading, error);
    // user should login
    if (!user?.role === "admin") {
      navigate("/login", { replace: true, from: location });
    }
    // if product created, try upload product image
    if (!loading && lastActionType?.includes("products/createProduct")) {
      if (error) {
        window.alert(error);
      } else if (lastActionPayload?.message === "Product created") {
        dispatch(
          uploadProductImage({
            file: file,
            productId: lastActionPayload.product._id,
            imageType: file?.name.split(".").pop(),
          })
        );
        // don't need to care about error about image uploading
        navigate(`/products/${lastActionPayload.product._id}`, {
          replace: true,
        });
      }
    }
  });

  const formValidations = {
    name: {
      label: "Product Name",
      type: "text",
      pattern: ".{4,}",
      failedMessage: "product must contain at least 4 characters",
    },
    description: {
      label: "Product Description",
      type: "textarea",
      pattern: ".{6,}",
      failedMessage: "product description must contain at least 6 characters",
    },
    category: {
      type: "radio",
      selections: [
        "Electronics",
        "Clothing and Accessories",
        "Home and Kitchen",
        "Health and Beauty",
        "Sports and Outdoors",
        "Toys and Games",
        "Others",
      ],
      label: "Select an category: ",
    },
    price: {
      type: "number",
      min: "0",
      step: "0.01",
      label: "price in $",
    },
    stock: {
      type: "number",
      min: "0",
      label: "stock quantity",
    },
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="create-product-page text-center">
      <h1 className="mb-3">Create a Product</h1>
      <form className="row" onSubmit={(e) => e.preventDefault()}>
        <div className="col-xs-10 col-sm-8 col-md-6 mx-auto mb-3">
          <input
            type="file"
            className="form-control"
            name="productImage"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
      </form>
      {imagePreview && (
        <div className="col-xs-10 col-sm-8 col-md-6 mx-auto mb-3">
          <img
            src={imagePreview}
            className="img-fluid"
            alt="Preview"
            style={{maxWidth: "100%", maxHeight: "10em"}}
          />
        </div>
      )}
      <Form
        formName=""
        formValidations={formValidations}
        dispatchAction={createProduct}
      />
    </div>
  );
}

export default CreateProductsPage;
