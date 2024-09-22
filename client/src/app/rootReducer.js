import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import productsReducer from '../features/products/productsSlice';
import usersReducer from '../features/users/usersSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  users: usersReducer,
});

export default rootReducer;