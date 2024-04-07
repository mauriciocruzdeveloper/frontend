import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { API_URL } from "@/config/config";
import { transformFromStrapi, transformToStrapi } from '@/helpers/object-to-strapi-body'
import { StrapiEntity, StrapiResponseGet, StrapiResponsePost } from '@/types/strapi.type';

export interface PedidoPlato { id: number; pedido_id: number; plato_id: number; }
 
const pedidoPlatosAdapter = createEntityAdapter<PedidoPlato>();
 
export const fetchPedidoPlatos = createAsyncThunk('pedidoPlatos/fetchPedidoPlatos', async () => {
  const response = await fetch(`${API_URL}/pedidoPlatos`);
  return response.json() as Promise<StrapiResponseGet<PedidoPlato>>;
});
 
export const addPedidoPlato = createAsyncThunk('pedidoPlatos/addPedidoPlato', async (pedidoPlato: PedidoPlato) => {
  const body = transformToStrapi<PedidoPlato>(pedidoPlato);
  const response = await fetch(`${API_URL}/pedidoPlatos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json() as Promise<StrapiResponsePost<PedidoPlato>>;
});
 
export const updatePedidoPlato = createAsyncThunk('pedidoPlatos/updatePedidoPlato', async (pedidoPlato: PedidoPlato) => {
  const response = await fetch(`${API_URL}/pedidoPlatos/${pedidoPlato.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pedidoPlato),
  });
  return response.json() as Promise<StrapiResponsePost<PedidoPlato>>;
});
 
export const deletePedidoPlato = createAsyncThunk('pedidoPlatos/deletePedidoPlato', async (id: number) => {
  await fetch(`${API_URL}/pedidoPlatos/${id}`, {
    method: 'DELETE',
  });
  return id;
});
 
const pedidoPlatosSlice = createSlice({
  name: 'pedidoPlatos',
  initialState: pedidoPlatosAdapter.getInitialState(),
  reducers: {
    // Reducers for CRUD operations
    pedidoPlatoAdded: pedidoPlatosAdapter.addOne,
    pedidoPlatoUpdated: pedidoPlatosAdapter.updateOne,
    pedidoPlatoRemoved: pedidoPlatosAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPedidoPlatos.fulfilled, (state, action) => {
        const pedidoPlatos: PedidoPlato[] = action.payload.data.map((value: StrapiEntity<PedidoPlato>) => transformFromStrapi<PedidoPlato>(value));
        pedidoPlatosAdapter.setAll(state, pedidoPlatos);
      })
      .addCase(addPedidoPlato.fulfilled, (state, action) => {
        const pedidoPlato = transformFromStrapi<PedidoPlato>(action.payload.data);
        pedidoPlatosAdapter.addOne(state, pedidoPlato);
      })
      .addCase(updatePedidoPlato.fulfilled, (state, action) => {
        pedidoPlatosAdapter.updateOne(state, { id: action.payload.data.id, changes: action.payload.data.attributes });
      })
      .addCase(deletePedidoPlato.fulfilled, (state, action) => {
        pedidoPlatosAdapter.removeOne(state, action.payload);
      });
  },
});
 
export const {
  selectAll: selectAllPedidoPlatos,
  selectById: selectPedidoPlatoById,
  selectIds: selectPedidoPlatoIds,
} = pedidoPlatosAdapter.getSelectors((state: any) => state.pedidoPlatos);
 
export const { pedidoPlatoAdded, pedidoPlatoUpdated, pedidoPlatoRemoved } = pedidoPlatosSlice.actions;
 
export default pedidoPlatosSlice.reducer;