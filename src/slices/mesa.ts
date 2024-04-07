import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { API_URL } from "@/config/config";
import { transformFromStrapi, transformToStrapi } from '@/helpers/object-to-strapi-body'
import { StrapiEntity, StrapiResponseGet, StrapiResponsePost } from '@/types/strapi.type';

export interface Mesa { id: number; numero: string; capacidad: number; moso_id: number; }
 
const mesasAdapter = createEntityAdapter<Mesa>();
 
export const fetchMesas = createAsyncThunk('mesas/fetchMesas', async () => {
  const response = await fetch(`${API_URL}/mesas`);
  return response.json() as Promise<StrapiResponseGet<Mesa>>;
});
 
export const addMesa = createAsyncThunk('mesas/addMesa', async (mesa: Mesa) => {
  const body = transformToStrapi<Mesa>(mesa);
  const response = await fetch(`${API_URL}/mesas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json() as Promise<StrapiResponsePost<Mesa>>;
});
 
export const updateMesa = createAsyncThunk('mesas/updateMesa', async (mesa: Mesa) => {
  const response = await fetch(`${API_URL}/mesas/${mesa.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mesa),
  });
  return response.json() as Promise<StrapiResponsePost<Mesa>>;
});
 
export const deleteMesa = createAsyncThunk('mesas/deleteMesa', async (id: number) => {
  await fetch(`${API_URL}/mesas/${id}`, {
    method: 'DELETE',
  });
  return id;
});
 
const mesasSlice = createSlice({
  name: 'mesas',
  initialState: mesasAdapter.getInitialState(),
  reducers: {
    // Reducers for CRUD operations
    mesaAdded: mesasAdapter.addOne,
    mesaUpdated: mesasAdapter.updateOne,
    mesaRemoved: mesasAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMesas.fulfilled, (state, action) => {
        const mesas: Mesa[] = action.payload.data.map((value: StrapiEntity<Mesa>) => transformFromStrapi<Mesa>(value));
        mesasAdapter.setAll(state, mesas);
      })
      .addCase(addMesa.fulfilled, (state, action) => {
        const mesa = transformFromStrapi<Mesa>(action.payload.data);
        mesasAdapter.addOne(state, mesa);
      })
      .addCase(updateMesa.fulfilled, (state, action) => {
        mesasAdapter.updateOne(state, { id: action.payload.data.id, changes: action.payload.data.attributes });
      })
      .addCase(deleteMesa.fulfilled, (state, action) => {
        mesasAdapter.removeOne(state, action.payload);
      });
  },
});
 
export const {
  selectAll: selectAllMesas,
  selectById: selectMesaById,
  selectIds: selectMesaIds,
} = mesasAdapter.getSelectors((state: any) => state.mesas);
 
export const { mesaAdded, mesaUpdated, mesaRemoved } = mesasSlice.actions;
 
export default mesasSlice.reducer;