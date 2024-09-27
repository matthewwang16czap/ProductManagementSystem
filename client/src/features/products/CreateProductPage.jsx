import Form from "../../ui/Form";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "./productsSlice";

function CreateProductsPage() {
  const { lastActionPayload } = useSelector((state) => state.product);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(lastActionPayload);
    if (lastActionPayload?.message) {
      if (lastActionPayload.message === "Product created") {
        window.confirm("Successfully Created Product, go to see product?")
          ? navigate(`/products/${product.id}`, { replace: true })
          : window.location.reload();
      } else {
        window.alert(lastActionPayload.message);
      }
    }
  }, [lastActionPayload, navigate]);

  const formValidations = {
    ProductName: {
      type: "text",
      pattern: "^[a-zA-Z0-9]{4,}",
      failedMessage: "product must contain at least 4 characters",
    },
    ProductDescription: {
      type: "text",
      pattern: "^[a-zA-Z0-9]{6,}",
      failedMessage: "product description must contain at least 4 characters",
    },
    Category: {
      type: "options",
      selections: ["category1", "category2","category3","category4"],
      label: "Select an category: ",
    },
    Price: {
      type: "number",
      selections: "^[0-9]{6,}",
      label: "input price: ",
    },
    InStockQuantity: {
      type: "number",
      selections: "^[0-9]{2,}",
      label: "input price: ",
    },
    AddImageLink: {
      type: "text",
      pattern: "^[a-zA-Z0-9]{8,}",
      failedMessage: "link",
    },
  };

  return (
    <div className="signup-page">
      <Form
        formName="Create Product"
        fields={["ProductName", "ProductDescription", "Category", "Price", "InStockQuantity",
          "AddImageLink"
        ]}
        formValidations={formValidations}
        dispatchAction={createProduct}
      />
      <button type="button" lassName="btn btn-secondary" onMouseDown={() => navigate(FormData.AddImageLink)}>preview</button>
      <img src={FormData.AddImageLink} alt={FormData.ProductName} style={{ border:"2px dashed grey"}}></img>
      <div className="text-center m-3">
        <button type="button" className="btn btn-secondary" onMouseDown={() => navigate(`/products/${product.id}`)}>
          Add Product
        </button>
      </div>
    </div>
  );
}

export default CreateProductsPage;