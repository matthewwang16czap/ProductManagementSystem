import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {getUserPublic} from "./features/users/usersSlice";

function App() {
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();
  const { lastActionPayload, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    console.log(lastActionPayload, loading, error);
  }, [lastActionPayload, loading, error]);

  useEffect(() => {
    dispatch(getUserPublic({userId: '66e51d77babd8ede85e0447f'}));
  }, [dispatch])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>{JSON.stringify(lastActionPayload)}</p>
    </>
  )
}

export default App
