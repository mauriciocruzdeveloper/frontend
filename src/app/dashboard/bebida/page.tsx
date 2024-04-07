'use client'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllBebidas,
  fetchBebidas,
  addBebida,
  updateBebida,
  deleteBebida,
  Bebida,
} from '@/slices/bebida';
import { AppDispatch } from "@/store/store";

const Bebidas = () => {
  const dispatch = useDispatch<AppDispatch>();
  const bebidas = useSelector(selectAllBebidas);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchBebidas())
      .then(() => setLoading(false))
      .catch((error: any) => {
        setLoading(false);
        setError(error);
      });
  }, [dispatch]);

  const handleAddBebida = (bebida: Bebida) => {
    dispatch(addBebida(bebida));
  };

  const handleUpdateBebida = (bebida: Bebida) => {
    dispatch(updateBebida(bebida));
  };

  const handleDeleteBebida = (id: number) => {
    dispatch(deleteBebida(id));
  };

  return (
    <div>
      <h1>Bebidas</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {bebidas.map((bebida) => (
            <li key={bebida.id}>
              {bebida.id} - {bebida.descripcion} - {bebida.precio}
              <button onClick={() => handleUpdateBebida(bebida)}>Update</button>
              <button onClick={() => handleDeleteBebida(bebida.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => handleAddBebida({
  id: 123,
  descripcion: 'Café Americano',
  precio: 2.99,
  disponibilidad: true
})}>Add Bebida</button>
    </div>
  );
};

export default Bebidas;