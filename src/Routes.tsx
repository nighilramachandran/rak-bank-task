import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./widgets/layouts/layout";
import Home from "./Home";

const PrivateRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
