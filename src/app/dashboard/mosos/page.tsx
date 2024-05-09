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

const Mosos = async ({ searchParams }: SearchParams) => {
  console.log("$$$RENDERIZA Mosos", searchParams);
  const page = Number(searchParams?.page ?? 1);
  const query = searchParams?.query ?? "";

  const { entities: mosos, total, error } = await fetchEntities(
    "mosos",
    page,
    PAGE_SIZE,
    query,
  );

  const defaultHeaders = [
    "Nombre",
"Apellido",
"Ventas Total",
    "Fecha 1",
    "Fecha 2",
    "Fecha 3",
  ];

  const handleOnDelete = async (id: number) => {
    "use server";
    await deleteEntity("mosos", id);
  };

  const handleOnUpdate = async (id: number) => {
    "use server";
    redirect(`/dashboard/mosos/${id}/edit`);
  };

  console.log('!!!error: ', error);

  if (error) return (<div>Error: {error.status}</div>);

  return (
    <div>
      <div className="flex justify-between p-2 mb-2 bg-gray-200 rounded-md">
        <h1 className="py-2">Mosos</h1>
        <CreateButton href="/dashboard/mosos" />
      </div>
      <div>
        <AplTable
          entities={mosos}
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

export default Mosos;
