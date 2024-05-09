import { fetchEntityById } from "@/actions/actions";
import { FormPedido } from "@/components/forms/form-pedido";
import { Pedido } from "@/interfaces/interfaces";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const { entity: pedido, error } = await fetchEntityById<Pedido>('pedidos', id);

  if (error) return (<div>Error: {error.status}</div>);

  return <FormPedido pedido={pedido} />;
}
