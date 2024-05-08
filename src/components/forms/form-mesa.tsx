"use client";

import { Mesa } from "@/interfaces/interfaces";
import { addEntity, updateEntity } from "@/actions/actions";
import { object, string, number, boolean, ValidationError } from "yup";
import { useState } from "react";
import { AplInputField } from "../apl-input-field/apl-input-field";
import { FormErrors } from "@/types/common.types";

interface FormMesaProps {
  mesa?: Mesa;
}

type MesaErrors = FormErrors<Omit<Mesa, "id">>;

export function FormMesa({ mesa }: FormMesaProps) {
  const [errors, setErrors] = useState<MesaErrors>({});

  const mesaSchema = object().shape({
    numero: string().required(),
    capacidad: number().required(),
    moso_id: number().required(),
  });

  async function handleFormAction(formData: any) {
    const newMesa: Omit<Mesa, "id"> = {
      numero: formData.get("numero"),
      capacidad: formData.get("capacidad"),
      moso: formData.get("moso_id"),
    };
    try {
      // TODO: Validar cuando hago onChange. Meter el onChange en el input
      await mesaSchema.validate(newMesa);
      setErrors({});
    } catch (err: any) {
      if (err instanceof ValidationError && err.path) {
        const value = err.path;
        setErrors((prev) => ({ [value]: err.message.toString() }));
      }
      return;
    }
    if (mesa) {
      await updateEntity<Mesa>("mesas", {
        id: mesa.id,
        ...newMesa,
      });
    } else {
      await addEntity<Mesa>("mesas", newMesa);
    }
  }

  return (
    <form className="flex flex-col h-full" action={handleFormAction}>
      <div className="flex justify-between p-2 mb-2 bg-gray-100 rounded-md">
        <h1 className="py-2">Mesas</h1>
        <button
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          type="submit"
        >
          Save
        </button>
      </div>
      <div className="p-2 bg-gray-100 flex flex-col flex-1 rounded-md grid-cols-3">
        <AplInputField
          labelText="Número"
          name="numero"
          value={mesa?.numero}
          type="text"
          errors={errors}
        />
        <AplInputField
          labelText="Capacidad"
          name="capacidad"
          value={mesa?.capacidad}
          type="number"
          errors={errors}
        />
        <input
          className="h-10 px-3 py-2 border border-gray-300 rounded-md"
          type=""
          id="moso_id"
          name="moso_id"
          defaultValue={mesa?.moso.id}
        />
        {/* <AplInputField
          labelText="Moso ID"
          name="moso_id"
          value={mesa?.moso}
          type="number"
          errors={errors}
        /> */}
      </div>
    </form>
  );
}
