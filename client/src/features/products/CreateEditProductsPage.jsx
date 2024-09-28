import Form from "../../ui/Form";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  useNavigate,
  useLocation,
  useParams,
  Navigate,
} from "react-router-dom";
import {
  getProduct,
  createProduct,
  updateProduct,
  uploadProductImage,
} from "./productsSlice";
import { getUser } from "../users/usersSlice";

function CreateEditProductsPage() {
  const { productId } = useParams();
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const {
    product,
    lastActionType,
    lastActionPayload,
    loading: productLoading,
    error: productError,
  } = useSelector((state) => state.products);
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // getUser to validate
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    // if the url is to edit, pre-polulate product details
    if (productId) {
      // get product details
      dispatch(
        getProduct({
          productId: productId,
        })
      );
    }
  }, [dispatch, location, productId]);

  useEffect(() => {
    if (productId) {
      // get file from product if update
      setImagePreview("/" + product?.imageUrl);
    }
  }, [product, location, productId]);

  useEffect(() => {
    // console.log(user, location, product, lastActionType, lastActionPayload);
    // if product has created or updated, try upload product image
    if (
      !productLoading &&
      (lastActionType?.includes("products/createProduct") ||
        lastActionType?.includes("products/updateProduct"))
    ) {
      if (productError) {
        window.alert(productError);
      } else if (lastActionPayload) {
        if (file)
          dispatch(
            uploadProductImage({
              file: file,
              productId: lastActionPayload.product._id,
              imageType: file?.name.split(".").pop(),
            })
          );
        // ignore error about image uploading
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

  if (userError || user?.role === "regular")
    return <Navigate to="/login" replace={true} state={{ from: location }} />;

  if (productId && (productError || product?.userId !== user?._id))
    return <Navigate to="/error" replace={true} state={{ from: location }} />;

  if (userLoading || productLoading) return <p>loading...</p>;

  return (
    <div className="create-product-page text-center">
      <h1 className="mb-3">
        {productId ? "Update a Product" : "Create a Product"}
      </h1>
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
            style={{ maxWidth: "100%", maxHeight: "10em" }}
          />
        </div>
      )}
      {productId && (
        <Form
          formName=""
          formValidations={formValidations}
          dispatchAction={updateProduct}
          submitButtonName="save editing"
          initialFormData={product}
          additionalFormData={{
            productId: productId,
          }}
        />
      )}
      {!productId && (
        <Form
          formName=""
          formValidations={formValidations}
          dispatchAction={createProduct}
          submitButtonName="create"
        />
      )}
    </div>
  );
}

export default CreateEditProductsPage;
