import { configureStore, combineReducers } from "@reduxjs/toolkit";

import pedidosReducer from "@/slices/pedido";
import mososReducer from "@/slices/moso";
import clientesReducer from "@/slices/cliente";
import platosReducer from "@/slices/plato";
import bebidasReducer from "@/slices/bebida";
import pedidoPlatosReducer from "@/slices/pedidoPlato";
import pedidoBebidasReducer from "@/slices/pedidoBebida";
import mesasReducer from "@/slices/mesa";

const rootReducer = combineReducers({
  pedidos: pedidosReducer,
  mosos: mososReducer,
  clientes: clientesReducer,
  platos: platosReducer,
  bebidas: bebidasReducer,
  pedidoPlatos: pedidoPlatosReducer,
  pedidoBebidas: pedidoBebidasReducer,
  mesas: mesasReducer
});

export const store = configureStore({
  reducer: rootReducer
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;