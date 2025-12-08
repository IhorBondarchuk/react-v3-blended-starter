import { PacmanLoader } from "react-spinners";
import style from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={style.backdrop}>
      <PacmanLoader color="rgba(211, 19, 19, 1)" />
    </div>
  );
}
