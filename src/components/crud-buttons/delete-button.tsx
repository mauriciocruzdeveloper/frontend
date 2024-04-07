'use client'

import { TrashIcon } from "@heroicons/react/24/outline";
import { ButtonProps } from "./buttons";

interface DeleteButtonProps extends ButtonProps {
    onClick: Exclude<ButtonProps['onClick'], undefined>;
}

export function DeleteButton({
  id,
  text='Delete',
  onClick,
}: DeleteButtonProps) {
  if (!id) return null;

  const deleteWithId = onClick.bind(null, id);
 
  return (
    <form action={deleteWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">{text}</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}