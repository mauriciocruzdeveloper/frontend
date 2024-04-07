'use client'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllClientes,
  fetchClientes,
  addCliente,
  updateCliente,
  deleteCliente,
  Cliente,
} from '@/slices/cliente';
import { AppDispatch } from "@/store/store";

const Clientes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const clientes = useSelector(selectAllClientes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchClientes())
      .then(() => setLoading(false))
      .catch((error: any) => {
        setLoading(false);
        setError(error);
      });
  }, [dispatch]);

  const handleAddCliente = (cliente: Cliente) => {
    dispatch(addCliente(cliente));
  };

  const handleUpdateCliente = (cliente: Cliente) => {
    dispatch(updateCliente(cliente));
  };

  const handleDeleteCliente = (id: number) => {
    dispatch(deleteCliente(id));
  };

  return (
    <div>
      <h1>Clientes</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {clientes.map((cliente) => (
            <li key={cliente.id}>
              {cliente.id} - {cliente.nombre} - {cliente.apellido}
              <button onClick={() => handleUpdateCliente(cliente)}>Update</button>
              <button onClick={() => handleDeleteCliente(cliente.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => handleAddCliente({
  id: 123,
  nombre: 'Juan',
  apellido: 'Pérez'
})}>Add Cliente</button>
    </div>
  );
};

export default Clientes;