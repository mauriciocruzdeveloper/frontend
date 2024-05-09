import { fetchEntityById } from "@/actions/actions";
import { FormPedidoPlato } from "@/components/forms/form-pedidoPlato";
import { PedidoPlato } from "@/interfaces/interfaces";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const { entity: pedidoPlato, error } = await fetchEntityById<PedidoPlato>('pedidoPlatos', id);

  if (error) return (<div>Error: {error.status}</div>);

  return <FormPedidoPlato pedidoPlato={pedidoPlato} />;
}
