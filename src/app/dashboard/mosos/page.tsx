import { fetchMosos, deleteMoso } from "@/actions/actions";
import { CreateButton } from "../../../components/crud-buttons/buttons";
import { redirect } from "next/navigation";
import { AplTable } from "@/components/apl-table/apl-table";

const Mosos = async () => {
  console.log("$$$RENDERIZA Mosos");

  const mosos = await fetchMosos();

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
        defaultHeaders={defaultHeaders}
        handleDelete={handleOnDelete}
        handleUpdate={handleOnUpdate}
      />
    </div>
  );
};

export default Mosos;
