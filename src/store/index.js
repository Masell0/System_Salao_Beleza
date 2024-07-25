import { createStore,  } from "redux";
import usuarioReducer from "./usuarioReducer"

//criação da variavel global
export default createStore( usuarioReducer );