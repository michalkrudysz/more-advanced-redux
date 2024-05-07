import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // importuje Provider z react-redux

import "./index.css";
import App from "./App";
import store from "./store/index"; // importuje store

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Provider odbiera store jako propsa i przekazuje go do wszystkich komponentów
  <Provider store={store}>
    <App />
  </Provider>
);
