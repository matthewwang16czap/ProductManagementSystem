import './App.css'

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import AppRoutes from './routes/AppRoutes';
import {getUserPublic} from "./features/users/usersSlice";

function App() {

  const dispatch = useDispatch();
  const { lastActionPayload, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    console.log(lastActionPayload, loading, error);
  }, [lastActionPayload, loading, error]);

  useEffect(() => {
    dispatch(getUserPublic({userId: '66e51d77babd8ede85e0447f'}));
  }, [dispatch])

  return (
    <div className='App'>
      <AppRoutes />
    </div>
  )
}

export default App;
