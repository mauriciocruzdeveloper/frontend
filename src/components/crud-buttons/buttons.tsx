import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export interface ButtonProps {
  id?: number;
  text?: string;
  href?: string;
  onClick?: (id: number) => Promise<void>;
}

export function CreateButton({ text = "Create", href = "#" }: ButtonProps) {
  return (
    <Link
      href={`${href}/create`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      {text && <span className="hidden md:block">{text}</span>}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateButton({ id, text = "Update", href = "#" }: ButtonProps) {
  console.log('!!!UPDATE BUTTON', id)
  return (
    <Link
      href={`${href}/${id}/edit`}
      className="bg-[#0071bc] hover:bg-[#005ca3] text-white font-bold py-2 px-4 rounded uppercase text-xs"
    >
      <div className="flex items-center">
        {text && <span className="hidden md:block">{text}</span>}
        <PencilIcon className="w-5" />
      </div>
    </Link>
  );
}
