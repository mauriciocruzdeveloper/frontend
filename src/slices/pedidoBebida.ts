import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { API_URL } from "@/config/config";
import { transformFromStrapi, transformToStrapi } from '@/helpers/object-to-strapi-body'
import { StrapiEntity, StrapiResponseGet, StrapiResponsePost } from '@/types/strapi.type';

export interface PedidoBebida { id: number; pedido_id: number; bebida_id: number; }
 
const pedidoBebidasAdapter = createEntityAdapter<PedidoBebida>();
 
export const fetchPedidoBebidas = createAsyncThunk('pedidoBebidas/fetchPedidoBebidas', async () => {
  const response = await fetch(`${API_URL}/pedidoBebidas`);
  return response.json() as Promise<StrapiResponseGet<PedidoBebida>>;
});
 
export const addPedidoBebida = createAsyncThunk('pedidoBebidas/addPedidoBebida', async (pedidoBebida: PedidoBebida) => {
  const body = transformToStrapi<PedidoBebida>(pedidoBebida);
  const response = await fetch(`${API_URL}/pedidoBebidas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json() as Promise<StrapiResponsePost<PedidoBebida>>;
});
 
export const updatePedidoBebida = createAsyncThunk('pedidoBebidas/updatePedidoBebida', async (pedidoBebida: PedidoBebida) => {
  const response = await fetch(`${API_URL}/pedidoBebidas/${pedidoBebida.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pedidoBebida),
  });
  return response.json() as Promise<StrapiResponsePost<PedidoBebida>>;
});
 
export const deletePedidoBebida = createAsyncThunk('pedidoBebidas/deletePedidoBebida', async (id: number) => {
  await fetch(`${API_URL}/pedidoBebidas/${id}`, {
    method: 'DELETE',
  });
  return id;
});
 
const pedidoBebidasSlice = createSlice({
  name: 'pedidoBebidas',
  initialState: pedidoBebidasAdapter.getInitialState(),
  reducers: {
    // Reducers for CRUD operations
    pedidoBebidaAdded: pedidoBebidasAdapter.addOne,
    pedidoBebidaUpdated: pedidoBebidasAdapter.updateOne,
    pedidoBebidaRemoved: pedidoBebidasAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPedidoBebidas.fulfilled, (state, action) => {
        const pedidoBebidas: PedidoBebida[] = action.payload.data.map((value: StrapiEntity<PedidoBebida>) => transformFromStrapi<PedidoBebida>(value));
        pedidoBebidasAdapter.setAll(state, pedidoBebidas);
      })
      .addCase(addPedidoBebida.fulfilled, (state, action) => {
        const pedidoBebida = transformFromStrapi<PedidoBebida>(action.payload.data);
        pedidoBebidasAdapter.addOne(state, pedidoBebida);
      })
      .addCase(updatePedidoBebida.fulfilled, (state, action) => {
        pedidoBebidasAdapter.updateOne(state, { id: action.payload.data.id, changes: action.payload.data.attributes });
      })
      .addCase(deletePedidoBebida.fulfilled, (state, action) => {
        pedidoBebidasAdapter.removeOne(state, action.payload);
      });
  },
});
 
export const {
  selectAll: selectAllPedidoBebidas,
  selectById: selectPedidoBebidaById,
  selectIds: selectPedidoBebidaIds,
} = pedidoBebidasAdapter.getSelectors((state: any) => state.pedidoBebidas);
 
export const { pedidoBebidaAdded, pedidoBebidaUpdated, pedidoBebidaRemoved } = pedidoBebidasSlice.actions;
 
export default pedidoBebidasSlice.reducer;