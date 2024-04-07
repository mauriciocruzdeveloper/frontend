import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { API_URL } from "@/config/config";
import { transformFromStrapi, transformToStrapi } from '@/helpers/object-to-strapi-body'
import { StrapiEntity, StrapiResponseGet, StrapiResponsePost } from '@/types/strapi.type';

export interface Pedido { id: number; fecha_hora: number; moso_id: number; cliente_id: number; mesa_id: number; }
 
const pedidosAdapter = createEntityAdapter<Pedido>();
 
export const fetchPedidos = createAsyncThunk('pedidos/fetchPedidos', async () => {
  const response = await fetch(`${API_URL}/pedidos`);
  return response.json() as Promise<StrapiResponseGet<Pedido>>;
});
 
export const addPedido = createAsyncThunk('pedidos/addPedido', async (pedido: Pedido) => {
  const body = transformToStrapi<Pedido>(pedido);
  const response = await fetch(`${API_URL}/pedidos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json() as Promise<StrapiResponsePost<Pedido>>;
});
 
export const updatePedido = createAsyncThunk('pedidos/updatePedido', async (pedido: Pedido) => {
  const response = await fetch(`${API_URL}/pedidos/${pedido.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pedido),
  });
  return response.json() as Promise<StrapiResponsePost<Pedido>>;
});
 
export const deletePedido = createAsyncThunk('pedidos/deletePedido', async (id: number) => {
  await fetch(`${API_URL}/pedidos/${id}`, {
    method: 'DELETE',
  });
  return id;
});
 
const pedidosSlice = createSlice({
  name: 'pedidos',
  initialState: pedidosAdapter.getInitialState(),
  reducers: {
    // Reducers for CRUD operations
    pedidoAdded: pedidosAdapter.addOne,
    pedidoUpdated: pedidosAdapter.updateOne,
    pedidoRemoved: pedidosAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPedidos.fulfilled, (state, action) => {
        const pedidos: Pedido[] = action.payload.data.map((value: StrapiEntity<Pedido>) => transformFromStrapi<Pedido>(value));
        pedidosAdapter.setAll(state, pedidos);
      })
      .addCase(addPedido.fulfilled, (state, action) => {
        const pedido = transformFromStrapi<Pedido>(action.payload.data);
        pedidosAdapter.addOne(state, pedido);
      })
      .addCase(updatePedido.fulfilled, (state, action) => {
        pedidosAdapter.updateOne(state, { id: action.payload.data.id, changes: action.payload.data.attributes });
      })
      .addCase(deletePedido.fulfilled, (state, action) => {
        pedidosAdapter.removeOne(state, action.payload);
      });
  },
});
 
export const {
  selectAll: selectAllPedidos,
  selectById: selectPedidoById,
  selectIds: selectPedidoIds,
} = pedidosAdapter.getSelectors((state: any) => state.pedidos);
 
export const { pedidoAdded, pedidoUpdated, pedidoRemoved } = pedidosSlice.actions;
 
export default pedidosSlice.reducer;