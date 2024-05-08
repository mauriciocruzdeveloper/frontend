import { fetchEntityById } from "@/actions/actions";
import { FormPlato } from "@/components/forms/form-plato";
import { Plato } from "@/interfaces/interfaces";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const plato = await fetchEntityById<Plato>('platos', id);
  return <FormPlato plato={plato} />;
}
