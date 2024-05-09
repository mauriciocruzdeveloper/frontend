import { fetchEntityById } from "@/actions/actions";
import { FormBebida } from "@/components/forms/form-bebida";
import { Bebida } from "@/interfaces/interfaces";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const { entity: bebida, error} = await fetchEntityById<Bebida>('bebidas', id);

  if (error) return (<div>Error: {error.status}</div>);
  
  return <FormBebida bebida={bebida} />;
}
