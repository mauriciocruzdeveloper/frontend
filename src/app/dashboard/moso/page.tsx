import { fetchMosos, deleteMoso } from "@/actions/actions";
import { CreateButton } from "../../../components/crud-buttons/buttons";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "antd";
import { AplTable } from "@/components/apl-table/apl-table";

const Mosos = async () => {
  console.log('$$$RENDERIZA Mosos');

  const mosos = await fetchMosos();

  const loading = false;
  const error = false;

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
    await deleteMoso(id);
  };

  const handleOnUpdate = async (id: number) => {
    "use server";
    redirect(`/moso/${id}/edit`);
  };

  return (
    <div>
      <h1>Mosos</h1>
      <CreateButton href="/moso" />

      <Suspense fallback={<Skeleton />}>
        <AplTable
          entities={mosos}
          defaultHeaders={defaultHeaders}
          handleDelete={handleOnDelete}
          handleUpdate={handleOnUpdate}
        />
      </Suspense>
    </div>
  );
};

export default Mosos;
