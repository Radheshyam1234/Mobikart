import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Context from './context/Context'

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Context>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Context>
  </StrictMode>,
  rootElement
);
