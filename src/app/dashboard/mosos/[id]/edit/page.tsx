import { fetchEntityById } from "@/actions/actions";
import { FormMoso } from "@/components/forms/form-moso";
import { Moso } from "@/interfaces/interfaces";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const { entity: moso, error } = await fetchEntityById<Moso>('mosos', id);

  if (error) return (<div>Error: {error.status}</div>);

  return <FormMoso moso={moso} />;
}
