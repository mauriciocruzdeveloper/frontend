'use client'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllPedidoPlatos,
  fetchPedidoPlatos,
  addPedidoPlato,
  updatePedidoPlato,
  deletePedidoPlato,
  PedidoPlato,
} from '@/slices/pedidoPlato';
import { AppDispatch } from "@/store/store";

const PedidoPlatos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pedidoPlatos = useSelector(selectAllPedidoPlatos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchPedidoPlatos())
      .then(() => setLoading(false))
      .catch((error: any) => {
        setLoading(false);
        setError(error);
      });
  }, [dispatch]);

  const handleAddPedidoPlato = (pedidoPlato: PedidoPlato) => {
    dispatch(addPedidoPlato(pedidoPlato));
  };

  const handleUpdatePedidoPlato = (pedidoPlato: PedidoPlato) => {
    dispatch(updatePedidoPlato(pedidoPlato));
  };

  const handleDeletePedidoPlato = (id: number) => {
    dispatch(deletePedidoPlato(id));
  };

  return (
    <div>
      <h1>PedidoPlatos</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {pedidoPlatos.map((pedidoPlato) => (
            <li key={pedidoPlato.id}>
              {pedidoPlato.id} - {pedidoPlato.pedido_id} - {pedidoPlato.plato_id}
              <button onClick={() => handleUpdatePedidoPlato(pedidoPlato)}>Update</button>
              <button onClick={() => handleDeletePedidoPlato(pedidoPlato.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => handleAddPedidoPlato({id: 123, pedido_id: 456, plato_id: 789})}>Add PedidoPlato</button>
    </div>
  );
};

export default PedidoPlatos;