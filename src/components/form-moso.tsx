'use client'

import { Moso } from "@/interfaces/interfaces";
import {
  addMoso,
  updateMoso,
 } from "@/actions/actions";
 import {
    object,
    string,
    number,
    ValidationError,
 } from 'yup';

interface FormMosoProps {
  moso?: Moso;
}

export function FormMoso({ moso }: FormMosoProps) {
  console.log('!!!CREATE MOSO', moso);
  const mosoSchema = object().shape({
    nombre: string().required(),
    apellido: string().required(),
    ventas_total: number().required(),
  });

  async function handleFormAction(formData: any) {
    const newMoso: Omit<Moso, "id"> = {
      nombre: formData.get("nombre"),
      apellido: formData.get("apellido"),
      ventas_total: formData.get("ventas_total"),
    };
    try {
      await mosoSchema.validate(newMoso);
    } catch (err: any) {
      if (err instanceof ValidationError) {
        console.error('Validation Error:', err.path);
      }
      return;
    }
    if (moso) {
      await updateMoso({
        id: moso.id,
        ...newMoso,
      });
    } else {
      await addMoso(newMoso);
    }
  }

  return (
    <form action={handleFormAction}>
      <div className="inputField">
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          defaultValue={moso?.nombre}
        />
      </div>
      <div className="inputField">
        <label htmlFor="apellido">Apellido</label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          defaultValue={moso?.apellido}
        />
      </div>
      <div className="inputField">
        <label htmlFor="ventas_total">Ventas total</label>
        <input
          type="number"
          id="ventas_total"
          name="ventas_total"
          defaultValue={moso?.ventas_total}
        />
      </div>
      <div>
        <button type="submit">Create Moso</button>
      </div>
    </form>
  );
}
