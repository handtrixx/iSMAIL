import * as React from 'react';
import { Crud } from '@toolpad/core/Crud';
import {
  employeesDataSource,
  Employee,
  employeesCache,
} from '@/lib/employees';

export default function EmployeesCrudPage() {
  return (
    <Crud<Employee>
      dataSource={employeesDataSource}
      dataSourceCache={employeesCache}
      rootPath="/dashboard/employees"
      initialPageSize={25}
      defaultValues={{ itemCount: 1 }}
    />
  );
}

