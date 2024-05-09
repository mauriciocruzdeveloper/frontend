import { fetchEntityById } from "@/actions/actions";
import { FormPlato } from "@/components/forms/form-plato";
import { Plato } from "@/interfaces/interfaces";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const { entity: plato, error } = await fetchEntityById<Plato>('platos', id);

  if (error) return (<div>Error: {error.status}</div>);

  return <FormPlato plato={plato} />;
}
