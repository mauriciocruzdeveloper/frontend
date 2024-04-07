import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { API_URL } from "@/config/config";
import { transformFromStrapi, transformToStrapi } from '@/helpers/object-to-strapi-body'
import { StrapiEntity, StrapiResponseGet, StrapiResponsePost } from '@/types/strapi.type';

export interface Moso { id: number; nombre: string; apellido: string; ventas_total: number; }
 
const mososAdapter = createEntityAdapter<Moso>();
 
// export const fetchMosos = createAsyncThunk('mosos/fetchMosos', async () => {
//   const response = await fetch(`${API_URL}/mosos`);
//   return response.json() as Promise<StrapiResponseGet<Moso>>;
// });
 
export const addMoso = createAsyncThunk('mosos/addMoso', async (moso: Moso) => {
  const body = transformToStrapi<Moso>(moso);
  const response = await fetch(`${API_URL}/mosos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json() as Promise<StrapiResponsePost<Moso>>;
});
 
export const updateMoso = createAsyncThunk('mosos/updateMoso', async (moso: Moso) => {
  const response = await fetch(`${API_URL}/mosos/${moso.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(moso),
  });
  return response.json() as Promise<StrapiResponsePost<Moso>>;
});
 
export const deleteMoso = createAsyncThunk('mosos/deleteMoso', async (id: number) => {
  await fetch(`${API_URL}/mosos/${id}`, {
    method: 'DELETE',
  });
  return id;
});
 
const mososSlice = createSlice({
  name: 'mosos',
  initialState: mososAdapter.getInitialState(),
  reducers: {
    // Reducers for CRUD operations
    mosoAdded: mososAdapter.addOne,
    mosoUpdated: mososAdapter.updateOne,
    mosoRemoved: mososAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchMosos.fulfilled, (state, action) => {
      //   const mosos: Moso[] = action.payload.data.map((value: StrapiEntity<Moso>) => transformFromStrapi<Moso>(value));
      //   mososAdapter.setAll(state, mosos);
      // })
      .addCase(addMoso.fulfilled, (state, action) => {
        const moso = transformFromStrapi<Moso>(action.payload.data);
        mososAdapter.addOne(state, moso);
      })
      .addCase(updateMoso.fulfilled, (state, action) => {
        mososAdapter.updateOne(state, { id: action.payload.data.id, changes: action.payload.data.attributes });
      })
      .addCase(deleteMoso.fulfilled, (state, action) => {
        mososAdapter.removeOne(state, action.payload);
      });
  },
});
 
export const {
  selectAll: selectAllMosos,
  selectById: selectMosoById,
  selectIds: selectMosoIds,
} = mososAdapter.getSelectors((state: any) => state.mosos);
 
export const { mosoAdded, mosoUpdated, mosoRemoved } = mososSlice.actions;
 
export default mososSlice.reducer;