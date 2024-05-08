import { fetchEntityById } from "@/actions/actions";
import { FormPedidoPlato } from "@/components/forms/form-pedidoPlato";
import { PedidoPlato } from "@/interfaces/interfaces";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const pedidoPlato = await fetchEntityById<PedidoPlato>('pedidoPlatos', id);
  return <FormPedidoPlato pedidoPlato={pedidoPlato} />;
}
