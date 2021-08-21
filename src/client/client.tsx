import { React, ReactDom } from "../../deps.ts";
import App from "./app.tsx";

(ReactDom).hydrate(<App todos={[]} />, document.getElementById("root"));
