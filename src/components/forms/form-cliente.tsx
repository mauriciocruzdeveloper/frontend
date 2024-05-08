"use client";

import { Cliente } from "@/interfaces/interfaces";
import { addEntity, updateEntity } from "@/actions/actions";
import { object, string, number, boolean, ValidationError } from "yup";
import { useState } from "react";
import { AplInputField } from "../apl-input-field/apl-input-field";
import { FormErrors } from "@/types/common.types";

interface FormClienteProps {
  cliente?: Cliente;
}

type ClienteErrors = FormErrors<Omit<Cliente, "id">>;

export function FormCliente({ cliente }: FormClienteProps) {
  const [errors, setErrors] = useState<ClienteErrors>({});
  
  const clienteSchema = object().shape({
    nombre: string().required(),
apellido: string().required(),
  });

  async function handleFormAction(formData: any) {
    const newCliente: Omit<Cliente, "id"> = {
      nombre: formData.get("nombre"),
apellido: formData.get("apellido"),
    };
    try {
      // TODO: Validar cuando hago onChange. Meter el onChange en el input
      await clienteSchema.validate(newCliente);
      setErrors({});
    } catch (err: any) {
      if (err instanceof ValidationError && err.path) {
        const value = err.path;
        setErrors((prev) => ({ [value]: err.message.toString() }));
      }
      return;
    }
    if (cliente) {
      await updateEntity<Cliente>('clientes', {
        id: cliente.id,
        ...newCliente,
      });
    } else {
      await addEntity<Cliente>('clientes', newCliente);
    }
  }

  return (
    <form className="flex flex-col h-full" action={handleFormAction}>
      <div className="flex justify-between p-2 mb-2 bg-gray-100 rounded-md">
        <h1 className="py-2">Clientes</h1>
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
  value={cliente?.nombre}
  type="text"
  errors={errors}
/>
<AplInputField
  labelText="Apellido"
  name="apellido"
  value={cliente?.apellido}
  type="text"
  errors={errors}
/>
      </div>
    </form>
  );
}
