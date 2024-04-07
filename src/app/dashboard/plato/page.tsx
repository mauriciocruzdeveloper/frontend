'use client'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllPlatos,
  fetchPlatos,
  addPlato,
  updatePlato,
  deletePlato,
  Plato,
} from '@/slices/plato';
import { AppDispatch } from "@/store/store";

const Platos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const platos = useSelector(selectAllPlatos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchPlatos())
      .then(() => setLoading(false))
      .catch((error: any) => {
        setLoading(false);
        setError(error);
      });
  }, [dispatch]);

  const handleAddPlato = (plato: Plato) => {
    dispatch(addPlato(plato));
  };

  const handleUpdatePlato = (plato: Plato) => {
    dispatch(updatePlato(plato));
  };

  const handleDeletePlato = (id: number) => {
    dispatch(deletePlato(id));
  };

  return (
    <div>
      <h1>Platos</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {platos.map((plato) => (
            <li key={plato.id}>
              {plato.id} - {plato.descripcion} - {plato.precio}
              <button onClick={() => handleUpdatePlato(plato)}>Update</button>
              <button onClick={() => handleDeletePlato(plato.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => handleAddPlato({
  id: 123,
  descripcion: 'Paella Valenciana',
  precio: 15.99,
  disponibilidad: true
})}>Add Plato</button>
    </div>
  );
};

export default Platos;