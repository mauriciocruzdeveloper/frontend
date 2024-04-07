'use client'

import { getColumnsAndDataSource } from "@/helpers/get-table-from-entity";
import { Entity } from "@/types/strapi.type";
import { Table } from "antd";
import React from "react";
import { ButtonsTable } from "./buttons-table";

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

// Can entry the entities. Olso can entry the defaultHeaders.
export interface AplTableProps {
  entities: Entity[];
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
  console.log('$$$RENDERIZA AplTable');

  const { columns, dataSource } = getColumnsAndDataSource(entities);

  if (defaultHeaders) {
    for (let i = 0; i < columns.length; i++) {
      columns[i].title = defaultHeaders[i];
    }
  }

  const renderButtons = (record: any) => <ButtonsTable
        id={record.key}
        onDelete={handleDelete}
        onEdit={handleUpdate}
     />;

  if (handleUpdate || handleDelete) {
    columns.push({
      title: "Actions",
      key: "actions",
      render: renderButtons,
    });
  }

  return (
    <div className="flex flex-col">
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          total: pagination.total,
          pageSize: pagination.pageSize,
          defaultCurrent: pagination.defaultCurrent,
        }}
      />
    </div>
  );
}
