"use client";

import { Pedido } from "@/interfaces/interfaces";
import { addEntity, updateEntity } from "@/actions/actions";
import { object, string, number, boolean, ValidationError } from "yup";
import { useState } from "react";
import { AplInputField } from "../apl-input-field/apl-input-field";
import { FormErrors } from "@/types/common.types";

interface FormPedidoProps {
  pedido?: Pedido;
}

type PedidoErrors = FormErrors<Omit<Pedido, "id">>;

export function FormPedido({ pedido }: FormPedidoProps) {
  const [errors, setErrors] = useState<PedidoErrors>({});
  
  const pedidoSchema = object().shape({
    fecha_hora: number().required(),
moso_id: number().required(),
cliente_id: number().required(),
mesa_id: number().required(),
  });

  async function handleFormAction(formData: any) {
    const newPedido: Omit<Pedido, "id"> = {
      fecha_hora: formData.get("fecha_hora"),
moso_id: formData.get("moso_id"),
cliente_id: formData.get("cliente_id"),
mesa_id: formData.get("mesa_id"),
    };
    try {
      // TODO: Validar cuando hago onChange. Meter el onChange en el input
      await pedidoSchema.validate(newPedido);
      setErrors({});
    } catch (err: any) {
      if (err instanceof ValidationError && err.path) {
        const value = err.path;
        setErrors((prev) => ({ [value]: err.message.toString() }));
      }
      return;
    }
    if (pedido) {
      await updateEntity<Pedido>('pedidos', {
        id: pedido.id,
        ...newPedido,
      });
    } else {
      await addEntity<Pedido>('pedidos', newPedido);
    }
  }

  return (
    <form className="flex flex-col h-full" action={handleFormAction}>
      <div className="flex justify-between p-2 mb-2 bg-gray-100 rounded-md">
        <h1 className="py-2">Pedidos</h1>
        <button
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          type="submit"
        >
          Save
        </button>
      </div>
      <div className="p-2 bg-gray-100 flex flex-col flex-1 rounded-md grid-cols-3">
        <AplInputField
  labelText="Fecha y Hora"
  name="fecha_hora"
  value={pedido?.fecha_hora}
  type="number"
  errors={errors}
/>
<AplInputField
  labelText="Moso ID"
  name="moso_id"
  value={pedido?.moso_id}
  type="number"
  errors={errors}
/>
<AplInputField
  labelText="Cliente ID"
  name="cliente_id"
  value={pedido?.cliente_id}
  type="number"
  errors={errors}
/>
<AplInputField
  labelText="Mesa ID"
  name="mesa_id"
  value={pedido?.mesa_id}
  type="number"
  errors={errors}
/>
      </div>
    </form>
  );
}
