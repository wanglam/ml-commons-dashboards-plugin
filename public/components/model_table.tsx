import React from 'react';
import { EuiBasicTable } from '@elastic/eui';

export function ModelTable() {
  const columns = [
    {
      field: 'id',
      name: 'ID',
    },
    {
      field: 'name',
      name: 'Name',
    },
    {
      field: 'algorithm',
      name: 'Algorithm',
    },
  ];

  const pagination = {
    pageIndex: 0,
    pageSize: 30,
    totalItemCount: 100,
    pageSizeOptions: [30, 0],
    showPerPageOptions: true,
  };

  return <EuiBasicTable columns={columns} items={[]} pagination={pagination} onChange={() => {}} />;
}
