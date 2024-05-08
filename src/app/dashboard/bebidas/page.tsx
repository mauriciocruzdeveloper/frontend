import { deleteEntity, fetchEntities } from "@/actions/actions";
import { CreateButton } from "../../../components/crud-buttons/buttons";
import { redirect } from "next/navigation";
import { AplTable } from "@/components/apl-table/apl-table";

const PAGE_SIZE = 3;

interface SearchParams {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

const Bebidas = async ({ searchParams }: SearchParams) => {
  console.log("$$$RENDERIZA Bebidas", searchParams);
  const page = Number(searchParams?.page ?? 1);
  const query = searchParams?.query ?? "";

  const { entities: bebidas, total } = await fetchEntities(
    "bebidas",
    page,
    PAGE_SIZE,
    query,
  );

  const defaultHeaders = [
    "Descripcion",
"Precio",
"Disponibilidad",
    "Fecha 1",
    "Fecha 2",
    "Fecha 3",
  ];

  const handleOnDelete = async (id: number) => {
    "use server";
    await deleteEntity("bebidas", id);
  };

  const handleOnUpdate = async (id: number) => {
    "use server";
    redirect(`/dashboard/bebidas/${id}/edit`);
  };

  return (
    <div>
      <div className="flex justify-between p-2 mb-2 bg-gray-200 rounded-md">
        <h1 className="py-2">Bebidas</h1>
        <CreateButton href="/dashboard/bebidas" />
      </div>
      <div>
        <AplTable
          entities={bebidas}
          page={page}
          pagination={{
            total,
            pageSize: PAGE_SIZE,
            defaultCurrent: page,
          }}
          defaultHeaders={defaultHeaders}
          handleDelete={handleOnDelete}
          handleUpdate={handleOnUpdate}
        />
      </div>
    </div>
  );
};

export default Bebidas;
