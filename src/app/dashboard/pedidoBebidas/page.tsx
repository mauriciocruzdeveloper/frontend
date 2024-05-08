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

const PedidoBebidas = async ({ searchParams }: SearchParams) => {
  console.log("$$$RENDERIZA PedidoBebidas", searchParams);
  const page = Number(searchParams?.page ?? 1);
  const query = searchParams?.query ?? "";

  const { entities: pedidoBebidas, total } = await fetchEntities(
    "pedidobebidas",
    page,
    PAGE_SIZE,
    query,
  );

  const defaultHeaders = [
    "Pedido Id",
"Bebida Id",
    "Fecha 1",
    "Fecha 2",
    "Fecha 3",
  ];

  const handleOnDelete = async (id: number) => {
    "use server";
    await deleteEntity("pedidoBebidas", id);
  };

  const handleOnUpdate = async (id: number) => {
    "use server";
    redirect(`/dashboard/pedidoBebidas/${id}/edit`);
  };

  return (
    <div>
      <div className="flex justify-between p-2 mb-2 bg-gray-200 rounded-md">
        <h1 className="py-2">PedidoBebidas</h1>
        <CreateButton href="/dashboard/pedidoBebidas" />
      </div>
      <div>
        <AplTable
          entities={pedidoBebidas}
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

export default PedidoBebidas;
