"use client";

import { getColumnsAndDataSource } from "@/helpers/get-table-from-entity";
import { Pagination, Table } from "antd";
import React, { useEffect, useState } from "react";
import { AplButtonsTable } from "./apl-buttons-table";
import { AplSkeleton } from "../apl-skeleton/apl-skeleton";
import { Entity } from "@/types/strapi.types";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Search from "./search";

const DEFAULT_PAGE_SIZE = 3;
const DEFAULT_CURRENT = 1;

export interface PaginationTable {
  total: number;
  pageSize: number;
  defaultCurrent: number;
}

export interface Column {
  title: string;
  dataIndex: string;
  key: string;
}

export interface AplTableProps {
  entities: Entity[];
  page: number;
  defaultHeaders?: string[];
  handleUpdate?: (id: number) => void;
  handleDelete?: (id: number) => void;
  pagination?: PaginationTable;
}

export function AplTable({
  entities,
  defaultHeaders,
  handleUpdate,
  handleDelete,
  pagination = {
    total: entities.length,
    pageSize: DEFAULT_PAGE_SIZE,
    defaultCurrent: DEFAULT_CURRENT,
  },
}: AplTableProps) {
  console.log("$$$RENDERIZA AplTable");

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { columns, dataSource } = getColumnsAndDataSource(entities);

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Detecta cuando el componente está hidratado
    setIsHydrated(true);
  }, []);

  if (defaultHeaders) {
    for (let i = 0; i < columns.length; i++) {
      columns[i].title = defaultHeaders[i];
    }
  }

  const renderButtons = (record: any) => (
    <AplButtonsTable
      id={record.key}
      onDelete={handleDelete}
      onEdit={handleUpdate}
    />
  );

  if (handleUpdate || handleDelete) {
    if (columns.length) {
      columns.push({
        title: "Actions",
        key: "actions",
        render: renderButtons,
      });
    }
  }

  const createPageURL = (pageNumber: number | string): string => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleOnChange = (page: number, pageSize: number) => {
    router.push(createPageURL(page));
  };

  if (!isHydrated) {
    return <AplSkeleton />; // No renderiza nada hasta que esté hidratado
  }

  let fields: string[] = [];
  if (entities.length) {
    fields = Object.keys(entities[0]);
  }

  return (
    <div className="flex flex-col">
      <div className="mb-2">
        <Search placeholder="Search..." />
      </div>
      <div className="mb-2">
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
      <div>
        <Pagination
          pageSize={pagination.pageSize}
          total={pagination.total}
          current={pagination.defaultCurrent}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
}
