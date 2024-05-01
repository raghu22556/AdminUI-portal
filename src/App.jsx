import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
import Loader from "./common/Loader";
//import "./core/redux-helper"

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      <Routes>
        {AllRoutes.map((item, index) => {
          const { name, path, element } = item;
          return (
            <Route
              name={name}
              path={path}
              element={element}
              exact={true}
              key={index}
            />
          );
        })}
      </Routes>
    </>
  );
};

export default App;
