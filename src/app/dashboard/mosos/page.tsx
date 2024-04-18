import { deleteMoso, fetchEntities } from "@/actions/actions";
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

  const { entities: mosos, total } = await fetchEntities('mosos', page, PAGE_SIZE);

  console.log('!!!mosos: ', mosos);

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
    await deleteMoso('mosos', id);
  };

  const handleOnUpdate = async (id: number) => {
    "use server";
    redirect(`/dashboard/mosos/${id}/edit`);
  };

  return (
    <div>
      <div className="flex justify-between p-2 mb-2 bg-gray-200 rounded-md">
        <h1 className="py-2">Mosos</h1>
        <CreateButton href="/dashboard/mosos" />
      </div>
      <AplTable
        entities={mosos}
        page={page}
        pagination={
          {
            total,
            pageSize: PAGE_SIZE,
            defaultCurrent: page,
          }
        }
        defaultHeaders={defaultHeaders}
        handleDelete={handleOnDelete}
        handleUpdate={handleOnUpdate}
      />
    </div>
  );
};

export default Mosos;
