import { fetchEntityById } from "@/actions/actions";
import { FormMoso } from "@/components/forms/form-moso";
import { Moso } from "@/interfaces/interfaces";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const moso = await fetchEntityById<Moso>('mosos', id);
  return <FormMoso moso={moso} />;
}
