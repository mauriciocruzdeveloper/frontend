import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { API_URL } from "@/config/config";
import { transformFromStrapi, transformToStrapi } from '@/helpers/object-to-strapi-body'
import { StrapiEntity, StrapiResponseGet, StrapiResponsePost } from '@/types/strapi.type';

export interface Bebida { id: number; descripcion: string; precio: number; disponibilidad: boolean; }
 
const bebidasAdapter = createEntityAdapter<Bebida>();
 
export const fetchBebidas = createAsyncThunk('bebidas/fetchBebidas', async () => {
  const response = await fetch(`${API_URL}/bebidas`);
  return response.json() as Promise<StrapiResponseGet<Bebida>>;
});
 
export const addBebida = createAsyncThunk('bebidas/addBebida', async (bebida: Bebida) => {
  const body = transformToStrapi<Bebida>(bebida);
  const response = await fetch(`${API_URL}/bebidas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json() as Promise<StrapiResponsePost<Bebida>>;
});
 
export const updateBebida = createAsyncThunk('bebidas/updateBebida', async (bebida: Bebida) => {
  const response = await fetch(`${API_URL}/bebidas/${bebida.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bebida),
  });
  return response.json() as Promise<StrapiResponsePost<Bebida>>;
});
 
export const deleteBebida = createAsyncThunk('bebidas/deleteBebida', async (id: number) => {
  await fetch(`${API_URL}/bebidas/${id}`, {
    method: 'DELETE',
  });
  return id;
});
 
const bebidasSlice = createSlice({
  name: 'bebidas',
  initialState: bebidasAdapter.getInitialState(),
  reducers: {
    // Reducers for CRUD operations
    bebidaAdded: bebidasAdapter.addOne,
    bebidaUpdated: bebidasAdapter.updateOne,
    bebidaRemoved: bebidasAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBebidas.fulfilled, (state, action) => {
        const bebidas: Bebida[] = action.payload.data.map((value: StrapiEntity<Bebida>) => transformFromStrapi<Bebida>(value));
        bebidasAdapter.setAll(state, bebidas);
      })
      .addCase(addBebida.fulfilled, (state, action) => {
        const bebida = transformFromStrapi<Bebida>(action.payload.data);
        bebidasAdapter.addOne(state, bebida);
      })
      .addCase(updateBebida.fulfilled, (state, action) => {
        bebidasAdapter.updateOne(state, { id: action.payload.data.id, changes: action.payload.data.attributes });
      })
      .addCase(deleteBebida.fulfilled, (state, action) => {
        bebidasAdapter.removeOne(state, action.payload);
      });
  },
});
 
export const {
  selectAll: selectAllBebidas,
  selectById: selectBebidaById,
  selectIds: selectBebidaIds,
} = bebidasAdapter.getSelectors((state: any) => state.bebidas);
 
export const { bebidaAdded, bebidaUpdated, bebidaRemoved } = bebidasSlice.actions;
 
export default bebidasSlice.reducer;