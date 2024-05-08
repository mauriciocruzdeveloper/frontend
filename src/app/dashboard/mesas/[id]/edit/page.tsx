import { fetchEntityById } from "@/actions/actions";
import { FormMesa } from "@/components/forms/form-mesa";
import { Mesa } from "@/interfaces/interfaces";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const mesa = await fetchEntityById<Mesa>('mesas', id);
  return <FormMesa mesa={mesa} />;
}
