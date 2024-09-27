// const ErrorPage = () => (
//     <div>
//       Error
//     </div>
//   );
  
// export default ErrorPage;

import { useState,useEffect } from 'react';
import { uploadProductImage } from "../products/productsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const { lastActionType, lastActionPayload, loading, error } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading && lastActionType?.includes("products/uploadProductImage")) {
      if (error) {
        window.alert(error);
      } else if (lastActionPayload) {
        window.alert(lastActionPayload);
      }
    }
    // if (!user) {
    //     navigate("/login", { replace: true, from: location});
    // }
  });



  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(uploadProductImage({file: file, productId: "66f4f367f0c59a1a4af8cfe7"}));

  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="productImage" accept="image/*" onChange={handleFileChange} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUpload;
