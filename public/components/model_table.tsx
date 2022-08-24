import React, { useMemo, useCallback } from 'react';
import { EuiBasicTable } from '@elastic/eui';

import { ModelSearchItem } from '../services/model_service';

export function ModelTable(props: {
  models: ModelSearchItem[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalRecords: number | undefined;
  };
}) {
  const columns = useMemo(
    () => [
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
    ],
    []
  );

  const pagination = useMemo(
    () => ({
      pageIndex: props.pagination.currentPage,
      pageSize: props.pagination.pageSize,
      totalItemCount: props.pagination.totalRecords || 0,
      pageSizeOptions: [15, 30, 50, 100],
      showPerPageOptions: true,
    }),
    [props.pagination]
  );

  const handleChange = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <EuiBasicTable
      columns={columns}
      items={props.models}
      pagination={pagination}
      onChange={handleChange}
    />
  );
}
