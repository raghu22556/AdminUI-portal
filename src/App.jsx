import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
import { ThemeProvider } from "@material-tailwind/react";
import Loader from "./common/Loader";
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      <Routes>
        {AllRoutes.map((item) => {
          debugger;
          const { name, path, element } = item;
          return (
            <Route
              key={name}
              // element={item.private ? <PrivateRoute /> : <PublicRoute />}
            >
              <Route name={name} path={path} element={element} exact={true} />
            </Route>
          );
        })}
      </Routes>
    </>
  );
};

export default App;
