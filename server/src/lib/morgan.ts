import morgan from "morgan";
import { DEVELOPMENT, NODE_ENV } from "../config";

export default morgan(NODE_ENV === DEVELOPMENT ? "dev" : "combined");
