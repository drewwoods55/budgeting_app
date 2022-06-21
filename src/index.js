import React from "react"
import ReactDom from "react-dom"
import App from "./App"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BudgetsProvider } from "./contexts/BudgetsContext"

ReactDom.render(
  <React.StrictMode>
    <BudgetsProvider>  
    <App />
    </BudgetsProvider>
  </React.StrictMode>,
  document.getElementById("root")
)