'use client'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllMesas,
  fetchMesas,
  addMesa,
  updateMesa,
  deleteMesa,
  Mesa,
} from '@/slices/mesa';
import { AppDispatch } from "@/store/store";

const Mesas = () => {
  const dispatch = useDispatch<AppDispatch>();
  const mesas = useSelector(selectAllMesas);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchMesas())
      .then(() => setLoading(false))
      .catch((error: any) => {
        setLoading(false);
        setError(error);
      });
  }, [dispatch]);

  const handleAddMesa = (mesa: Mesa) => {
    dispatch(addMesa(mesa));
  };

  const handleUpdateMesa = (mesa: Mesa) => {
    dispatch(updateMesa(mesa));
  };

  const handleDeleteMesa = (id: number) => {
    dispatch(deleteMesa(id));
  };

  return (
    <div>
      <h1>Mesas</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {mesas.map((mesa) => (
            <li key={mesa.id}>
              {mesa.id} - {mesa.numero} - {mesa.capacidad}
              <button onClick={() => handleUpdateMesa(mesa)}>Update</button>
              <button onClick={() => handleDeleteMesa(mesa.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => handleAddMesa({
  id: 1,
  numero: "A1",
  capacidad: 4,
  moso_id: 10
})}>Add Mesa</button>
    </div>
  );
};

export default Mesas;