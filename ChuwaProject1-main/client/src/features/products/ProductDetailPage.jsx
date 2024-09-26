import { useSelector, useDispatch, useParams } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateCartItem } from "../users/usersSlice";

function ProductDetailsPage(){
  
  return(
    <div>
    <div className="left">
    <img></img>
    </div>

    <div className="right">
      <span></span>
      <h4></h4>
      <div><h4></h4> <span></span></div>
      <p></p>
      <div><button>Add To Cart</button><button>Edit</button></div>
    </div>

  </div>)
}

export default ProductDetailsPage;