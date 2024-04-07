import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { API_URL } from "@/config/config";
import { transformFromStrapi, transformToStrapi } from '@/helpers/object-to-strapi-body'
import { StrapiEntity, StrapiResponseGet, StrapiResponsePost } from '@/types/strapi.type';

export interface Cliente { id: number; nombre: string; apellido: string; }
 
const clientesAdapter = createEntityAdapter<Cliente>();
 
export const fetchClientes = createAsyncThunk('clientes/fetchClientes', async () => {
  const response = await fetch(`${API_URL}/clientes`);
  return response.json() as Promise<StrapiResponseGet<Cliente>>;
});
 
export const addCliente = createAsyncThunk('clientes/addCliente', async (cliente: Cliente) => {
  const body = transformToStrapi<Cliente>(cliente);
  const response = await fetch(`${API_URL}/clientes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json() as Promise<StrapiResponsePost<Cliente>>;
});
 
export const updateCliente = createAsyncThunk('clientes/updateCliente', async (cliente: Cliente) => {
  const response = await fetch(`${API_URL}/clientes/${cliente.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cliente),
  });
  return response.json() as Promise<StrapiResponsePost<Cliente>>;
});
 
export const deleteCliente = createAsyncThunk('clientes/deleteCliente', async (id: number) => {
  await fetch(`${API_URL}/clientes/${id}`, {
    method: 'DELETE',
  });
  return id;
});
 
const clientesSlice = createSlice({
  name: 'clientes',
  initialState: clientesAdapter.getInitialState(),
  reducers: {
    // Reducers for CRUD operations
    clienteAdded: clientesAdapter.addOne,
    clienteUpdated: clientesAdapter.updateOne,
    clienteRemoved: clientesAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientes.fulfilled, (state, action) => {
        const clientes: Cliente[] = action.payload.data.map((value: StrapiEntity<Cliente>) => transformFromStrapi<Cliente>(value));
        clientesAdapter.setAll(state, clientes);
      })
      .addCase(addCliente.fulfilled, (state, action) => {
        const cliente = transformFromStrapi<Cliente>(action.payload.data);
        clientesAdapter.addOne(state, cliente);
      })
      .addCase(updateCliente.fulfilled, (state, action) => {
        clientesAdapter.updateOne(state, { id: action.payload.data.id, changes: action.payload.data.attributes });
      })
      .addCase(deleteCliente.fulfilled, (state, action) => {
        clientesAdapter.removeOne(state, action.payload);
      });
  },
});
 
export const {
  selectAll: selectAllClientes,
  selectById: selectClienteById,
  selectIds: selectClienteIds,
} = clientesAdapter.getSelectors((state: any) => state.clientes);
 
export const { clienteAdded, clienteUpdated, clienteRemoved } = clientesSlice.actions;
 
export default clientesSlice.reducer;