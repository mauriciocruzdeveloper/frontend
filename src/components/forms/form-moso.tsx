"use client";

import { Moso } from "@/interfaces/interfaces";
import { addEntity, updateEntity } from "@/actions/actions";
import { object, string, number, ValidationError } from "yup";
import { useState } from "react";
import { AplInputField } from "../apl-input-field/apl-input-field";
import { FormErrors } from "@/types/common.types";

interface FormMosoProps {
  moso?: Moso;
}

type MosoErrors = FormErrors<Omit<Moso, "id">>;

export function FormMoso({ moso }: FormMosoProps) {
  const [errors, setErrors] = useState<MosoErrors>({});
  
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
      // TODO: Validar cuando hago onChange. Meter el onChange en el input
      await mosoSchema.validate(newMoso);
      setErrors({});
    } catch (err: any) {
      if (err instanceof ValidationError && err.path) {
        const value = err.path;
        setErrors((prev) => ({ [value]: err.message.toString() }));
      }
      return;
    }
    if (moso) {
      await updateEntity<Moso>('mosos', {
        id: moso.id,
        ...newMoso,
      });
    } else {
      await addEntity<Moso>('mosos', newMoso);
    }
  }

  return (
    <form className="flex flex-col h-full" action={handleFormAction}>
      <div className="flex justify-between p-2 mb-2 bg-gray-100 rounded-md">
        <h1 className="py-2">Mosos</h1>
        <button
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          type="submit"
        >
          Save
        </button>
      </div>
      <div className="p-2 bg-gray-100 flex flex-col flex-1 rounded-md grid-cols-3">
        <AplInputField
          labelText="Nombre"
          name="nombre"
          value={moso?.nombre}
          type="text"
          errors={errors}
        />
        <AplInputField
          labelText="Apellido"
          name="apellido"
          value={moso?.apellido}
          type="text"
          errors={errors}
        />
        <AplInputField
          labelText="Ventas total"
          name="ventas_total"
          value={moso?.ventas_total}
          type="number"
          errors={errors}
        />
      </div>
    </form>
  );
}
