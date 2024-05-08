import { fetchEntityById } from "@/actions/actions";
import { FormCliente } from "@/components/forms/form-cliente";
import { Cliente } from "@/interfaces/interfaces";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const cliente = await fetchEntityById<Cliente>('clientes', id);
  return <FormCliente cliente={cliente} />;
}
