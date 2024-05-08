"use client";

import { PedidoBebida } from "@/interfaces/interfaces";
import { addEntity, updateEntity } from "@/actions/actions";
import { object, string, number, boolean, ValidationError } from "yup";
import { useState } from "react";
import { AplInputField } from "../apl-input-field/apl-input-field";
import { FormErrors } from "@/types/common.types";

interface FormPedidoBebidaProps {
  pedidoBebida?: PedidoBebida;
}

type PedidoBebidaErrors = FormErrors<Omit<PedidoBebida, "id">>;

export function FormPedidoBebida({ pedidoBebida }: FormPedidoBebidaProps) {
  const [errors, setErrors] = useState<PedidoBebidaErrors>({});
  
  const pedidoBebidaSchema = object().shape({
    pedido_id: number().required(),
bebida_id: number().required(),
  });

  async function handleFormAction(formData: any) {
    const newPedidoBebida: Omit<PedidoBebida, "id"> = {
      pedido_id: formData.get("pedido_id"),
bebida_id: formData.get("bebida_id"),
    };
    try {
      // TODO: Validar cuando hago onChange. Meter el onChange en el input
      await pedidoBebidaSchema.validate(newPedidoBebida);
      setErrors({});
    } catch (err: any) {
      if (err instanceof ValidationError && err.path) {
        const value = err.path;
        setErrors((prev) => ({ [value]: err.message.toString() }));
      }
      return;
    }
    if (pedidoBebida) {
      await updateEntity<PedidoBebida>('pedidoBebidas', {
        id: pedidoBebida.id,
        ...newPedidoBebida,
      });
    } else {
      await addEntity<PedidoBebida>('pedidoBebidas', newPedidoBebida);
    }
  }

  return (
    <form className="flex flex-col h-full" action={handleFormAction}>
      <div className="flex justify-between p-2 mb-2 bg-gray-100 rounded-md">
        <h1 className="py-2">PedidoBebidas</h1>
        <button
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          type="submit"
        >
          Save
        </button>
      </div>
      <div className="p-2 bg-gray-100 flex flex-col flex-1 rounded-md grid-cols-3">
        <AplInputField
  labelText="Pedido ID"
  name="pedido_id"
  value={pedidoBebida?.pedido_id}
  type="number"
  errors={errors}
/>
<AplInputField
  labelText="Bebida ID"
  name="bebida_id"
  value={pedidoBebida?.bebida_id}
  type="number"
  errors={errors}
/>
      </div>
    </form>
  );
}
