'use client'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllPedidoBebidas,
  fetchPedidoBebidas,
  addPedidoBebida,
  updatePedidoBebida,
  deletePedidoBebida,
  PedidoBebida,
} from '@/slices/pedidoBebida';
import { AppDispatch } from "@/store/store";

const PedidoBebidas = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pedidoBebidas = useSelector(selectAllPedidoBebidas);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchPedidoBebidas())
      .then(() => setLoading(false))
      .catch((error: any) => {
        setLoading(false);
        setError(error);
      });
  }, [dispatch]);

  const handleAddPedidoBebida = (pedidoBebida: PedidoBebida) => {
    dispatch(addPedidoBebida(pedidoBebida));
  };

  const handleUpdatePedidoBebida = (pedidoBebida: PedidoBebida) => {
    dispatch(updatePedidoBebida(pedidoBebida));
  };

  const handleDeletePedidoBebida = (id: number) => {
    dispatch(deletePedidoBebida(id));
  };

  return (
    <div>
      <h1>PedidoBebidas</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {pedidoBebidas.map((pedidoBebida) => (
            <li key={pedidoBebida.id}>
              {pedidoBebida.id} - {pedidoBebida.pedido_id} - {pedidoBebida.bebida_id}
              <button onClick={() => handleUpdatePedidoBebida(pedidoBebida)}>Update</button>
              <button onClick={() => handleDeletePedidoBebida(pedidoBebida.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => handleAddPedidoBebida({
  id: 123,
  pedido_id: 456,
  bebida_id: 789
})}>Add PedidoBebida</button>
    </div>
  );
};

export default PedidoBebidas;