import { fetchEntityById } from "@/actions/actions";
import { FormPedido } from "@/components/forms/form-pedido";
import { Pedido } from "@/interfaces/interfaces";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const pedido = await fetchEntityById<Pedido>('pedidos', id);
  return <FormPedido pedido={pedido} />;
}
