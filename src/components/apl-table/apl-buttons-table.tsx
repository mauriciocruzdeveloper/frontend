'use client';

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

export interface ButtonsProps {
  id: number;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
}

export const AplButtonsTable = ({ id, onDelete, onEdit }: ButtonsProps) => {
  const handleOnEdit = () => {
    if (onEdit) {
      onEdit(id);
    }
  }
  const handleOnDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  }

  return (
    <>
      <button className="p-2 hover:bg-gray-100" onClick={handleOnEdit}>
        <span className="sr-only">Delete</span>
        <PencilIcon className="w-4" />
      </button>
      <button className="p-2 hover:bg-gray-100" onClick={handleOnDelete}>
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </>
  );
};
