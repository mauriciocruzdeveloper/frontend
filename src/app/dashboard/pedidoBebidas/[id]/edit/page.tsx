import { fetchEntityById } from "@/actions/actions";
import { FormPedidoBebida } from "@/components/forms/form-pedidoBebida";
import { PedidoBebida } from "@/interfaces/interfaces";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const { entity: pedidoBebida, error } = await fetchEntityById<PedidoBebida>('pedidoBebidas', id);

  if (error) return (<div>Error: {error.status}</div>);

  return <FormPedidoBebida pedidoBebida={pedidoBebida} />;
}
