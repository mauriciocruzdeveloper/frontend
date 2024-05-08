"use client";

import { Bebida } from "@/interfaces/interfaces";
import { addEntity, updateEntity } from "@/actions/actions";
import { object, string, number, boolean, ValidationError } from "yup";
import { useState } from "react";
import { AplInputField } from "../apl-input-field/apl-input-field";
import { FormErrors } from "@/types/common.types";

interface FormBebidaProps {
  bebida?: Bebida;
}

type BebidaErrors = FormErrors<Omit<Bebida, "id">>;

export function FormBebida({ bebida }: FormBebidaProps) {
  const [errors, setErrors] = useState<BebidaErrors>({});
  
  const bebidaSchema = object().shape({
    descripcion: string().required(),
precio: number().required(),
disponibilidad: boolean().required(),
  });

  async function handleFormAction(formData: any) {
    const newBebida: Omit<Bebida, "id"> = {
      descripcion: formData.get("descripcion"),
precio: formData.get("precio"),
disponibilidad: formData.get("disponibilidad"),
    };
    try {
      // TODO: Validar cuando hago onChange. Meter el onChange en el input
      await bebidaSchema.validate(newBebida);
      setErrors({});
    } catch (err: any) {
      if (err instanceof ValidationError && err.path) {
        const value = err.path;
        setErrors((prev) => ({ [value]: err.message.toString() }));
      }
      return;
    }
    if (bebida) {
      await updateEntity<Bebida>('bebidas', {
        id: bebida.id,
        ...newBebida,
      });
    } else {
      await addEntity<Bebida>('bebidas', newBebida);
    }
  }

  return (
    <form className="flex flex-col h-full" action={handleFormAction}>
      <div className="flex justify-between p-2 mb-2 bg-gray-100 rounded-md">
        <h1 className="py-2">Bebidas</h1>
        <button
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          type="submit"
        >
          Save
        </button>
      </div>
      <div className="p-2 bg-gray-100 flex flex-col flex-1 rounded-md grid-cols-3">
        <AplInputField
  labelText="Descripción"
  name="descripcion"
  value={bebida?.descripcion}
  type="text"
  errors={errors}
/>
<AplInputField
  labelText="Precio"
  name="precio"
  value={bebida?.precio}
  type="number"
  errors={errors}
/>
<AplInputField
  labelText="Disponibilidad"
  name="disponibilidad"
  value={bebida?.disponibilidad}
  type="checkbox"
  errors={errors}
/>
      </div>
    </form>
  );
}
