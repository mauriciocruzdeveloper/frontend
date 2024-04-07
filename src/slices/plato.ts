import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { API_URL } from "@/config/config";
import { transformFromStrapi, transformToStrapi } from '@/helpers/object-to-strapi-body'
import { StrapiEntity, StrapiResponseGet, StrapiResponsePost } from '@/types/strapi.type';

export interface Plato { id: number; descripcion: string; precio: number; disponibilidad: boolean; }
 
const platosAdapter = createEntityAdapter<Plato>();
 
export const fetchPlatos = createAsyncThunk('platos/fetchPlatos', async () => {
  const response = await fetch(`${API_URL}/platos`);
  return response.json() as Promise<StrapiResponseGet<Plato>>;
});
 
export const addPlato = createAsyncThunk('platos/addPlato', async (plato: Plato) => {
  const body = transformToStrapi<Plato>(plato);
  const response = await fetch(`${API_URL}/platos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json() as Promise<StrapiResponsePost<Plato>>;
});
 
export const updatePlato = createAsyncThunk('platos/updatePlato', async (plato: Plato) => {
  const response = await fetch(`${API_URL}/platos/${plato.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(plato),
  });
  return response.json() as Promise<StrapiResponsePost<Plato>>;
});
 
export const deletePlato = createAsyncThunk('platos/deletePlato', async (id: number) => {
  await fetch(`${API_URL}/platos/${id}`, {
    method: 'DELETE',
  });
  return id;
});
 
const platosSlice = createSlice({
  name: 'platos',
  initialState: platosAdapter.getInitialState(),
  reducers: {
    // Reducers for CRUD operations
    platoAdded: platosAdapter.addOne,
    platoUpdated: platosAdapter.updateOne,
    platoRemoved: platosAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlatos.fulfilled, (state, action) => {
        const platos: Plato[] = action.payload.data.map((value: StrapiEntity<Plato>) => transformFromStrapi<Plato>(value));
        platosAdapter.setAll(state, platos);
      })
      .addCase(addPlato.fulfilled, (state, action) => {
        const plato = transformFromStrapi<Plato>(action.payload.data);
        platosAdapter.addOne(state, plato);
      })
      .addCase(updatePlato.fulfilled, (state, action) => {
        platosAdapter.updateOne(state, { id: action.payload.data.id, changes: action.payload.data.attributes });
      })
      .addCase(deletePlato.fulfilled, (state, action) => {
        platosAdapter.removeOne(state, action.payload);
      });
  },
});
 
export const {
  selectAll: selectAllPlatos,
  selectById: selectPlatoById,
  selectIds: selectPlatoIds,
} = platosAdapter.getSelectors((state: any) => state.platos);
 
export const { platoAdded, platoUpdated, platoRemoved } = platosSlice.actions;
 
export default platosSlice.reducer;