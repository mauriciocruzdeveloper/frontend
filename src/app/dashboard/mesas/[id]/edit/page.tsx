import { fetchEntityById } from "@/actions/actions";
import { FormMesa } from "@/components/forms/form-mesa";
import { Mesa } from "@/interfaces/interfaces";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const { entity: mesa, error } = await fetchEntityById<Mesa>('mesas', id);

  if (error) return (<div>Error: {error.status}</div>);

  return <FormMesa mesa={mesa} />;
}
