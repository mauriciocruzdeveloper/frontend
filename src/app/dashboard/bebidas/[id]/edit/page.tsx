import { fetchEntityById } from "@/actions/actions";
import { FormBebida } from "@/components/forms/form-bebida";
import { Bebida } from "@/interfaces/interfaces";

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const bebida = await fetchEntityById<Bebida>('bebidas', id);
  return <FormBebida bebida={bebida} />;
}
