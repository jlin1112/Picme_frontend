import { Link } from "react-router-dom";
import module from "../css/NotFound.module.css";

export default function NotFound() {
  return (
    <div className={module.container}>
      <div className={module.box}>
        <h1>404 Page Not Found</h1>
        <img src="/Dora.png" alt="error" />
        <Link to="/">Return to Main Page</Link>
      </div>
    </div>
  );
}
