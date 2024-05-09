import { fetchEntityById } from "@/actions/actions";
import { FormCliente } from "@/components/forms/form-cliente";
import { Cliente } from "@/interfaces/interfaces";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const { entity: cliente, error } = await fetchEntityById<Cliente>('clientes', id);

  if (error) return (<div>Error: {error.status}</div>);

  return <FormCliente cliente={cliente} />;
}
