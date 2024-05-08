import { fetchEntityById } from "@/actions/actions";
import { FormPedidoBebida } from "@/components/forms/form-pedidoBebida";
import { PedidoBebida } from "@/interfaces/interfaces";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const pedidoBebida = await fetchEntityById<PedidoBebida>('pedidoBebidas', id);
  return <FormPedidoBebida pedidoBebida={pedidoBebida} />;
}
