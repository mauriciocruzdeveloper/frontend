import { fetchMosoById } from "@/actions/actions";
import { FormMoso } from "@/components/form-moso";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const moso = await fetchMosoById(id);
  return <FormMoso moso={moso} />;
}
