"use client";

import { Moso } from "@/interfaces/interfaces";
import { object, string, number, ValidationError } from "yup";
import { useState } from "react";
import { AplInputField } from "../apl-input-field/apl-input-field";
import { FormErrors } from "@/types/common.types";
import { Entity } from "@/types/strapi.types";

interface FormEntityProps<T extends Entity> {
  entity?: T;
  updateEntity: (entity: T) => void;
  addEntity: (entity: Omit<T, "id">) => void;
}

export function FormEntity<T extends Entity>({
  entity,
  updateEntity,
  addEntity,
}: FormEntityProps<T>) {
  type Atributes = Omit<T, "id">;
  type CustomErrors = FormErrors<Omit<T, "id">>;

  const [errors, setErrors] = useState<CustomErrors>({});
  
  const entitySchema = object().shape({
    nombre: string().required(),
    apellido: string().required(),
    ventas_total: number().required(),
  });

  async function handleFormAction(formData: any) {
    const newEntity: Atributes = {
      nombre: formData.get("nombre"),
      apellido: formData.get("apellido"),
      ventas_total: formData.get("ventas_total"),
    };
    try {
      // TODO: Validar cuando hago onChange. Meter el onChange en el input
      await entitySchema.validate(newEntity);
      setErrors({});
    } catch (err: any) {
      if (err instanceof ValidationError && err.path) {
        const value = err.path;
        console.log("&&&Validation Error:", err.errors);
        setErrors((prev) => ({ [value]: err.message.toString() }));
      }
      return;
    }
    if (entity) {
      await updateEntity({
        id: entity.id,
        ...newEntity,
      });
    } else {
      await addEntity(newEntity);
    }
  }

  console.log("&&&errors: ", errors);

  return (
    <form className="flex flex-col h-full" action={handleFormAction}>
      <div className="flex justify-between p-2 mb-2 bg-gray-100 rounded-md">
        <h1 className="py-2">Entitys</h1>
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
          value={entity?.nombre}
          type="text"
          errors={errors}
        />
        <AplInputField
          labelText="Apellido"
          name="apellido"
          value={entity?.apellido}
          type="text"
          errors={errors}
        />
        <AplInputField
          labelText="Ventas total"
          name="ventas_total"
          value={entity?.ventas_total}
          type="number"
          errors={errors}
        />
      </div>
    </form>
  );
}
