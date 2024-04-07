'use client'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllPedidos,
  fetchPedidos,
  addPedido,
  updatePedido,
  deletePedido,
  Pedido,
} from '@/slices/pedido';
import { AppDispatch } from "@/store/store";

const Pedidos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pedidos = useSelector(selectAllPedidos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchPedidos())
      .then(() => setLoading(false))
      .catch((error: any) => {
        setLoading(false);
        setError(error);
      });
  }, [dispatch]);

  const handleAddPedido = (pedido: Pedido) => {
    dispatch(addPedido(pedido));
  };

  const handleUpdatePedido = (pedido: Pedido) => {
    dispatch(updatePedido(pedido));
  };

  const handleDeletePedido = (id: number) => {
    dispatch(deletePedido(id));
  };

  return (
    <div>
      <h1>Pedidos</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {pedidos.map((pedido) => (
            <li key={pedido.id}>
              {pedido.id} - {new Date(pedido.fecha_hora).toLocaleDateString()} - {pedido.moso_id}
              <button onClick={() => handleUpdatePedido(pedido)}>Update</button>
              <button onClick={() => handleDeletePedido(pedido.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => handleAddPedido({
  id: 123,
  fecha_hora: 1617181920,
  moso_id: 45,
  cliente_id: 789,
  mesa_id: 67
})}>Add Pedido</button>
    </div>
  );
};

export default Pedidos;