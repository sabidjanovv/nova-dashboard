import ReactDOM from "react-dom/client";
import "./css/index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./static/methods.ts";
import { store } from "./redux/index.js";
import { Suspense } from "./utils/index.js";
import App from "./App.tsx";



ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
        <Suspense>
          <App />
        </Suspense>
    </Provider>
  </BrowserRouter>
);
