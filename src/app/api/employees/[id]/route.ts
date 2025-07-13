// src/app/api/employees/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getEmployeesStore, setEmployeesStore } from '@/lib/employeesStore';
import type { Employee } from '@/lib/employees';
import type { OmitId } from '@toolpad/core/Crud';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: employeeId } = await params;

    const employeesStore = await getEmployeesStore();

    const employeeToShow = employeesStore.find(
      employee => employee.id === Number(employeeId)
    );

    if (!employeeToShow) {
      return NextResponse.json(
        { error: 'Employee not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(employeeToShow);
  } catch (error) {
    console.error('Error in GET /api/employees/[id]:', error);
    return NextResponse.json(
      { error: 'Failed to fetch employee' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body: Partial<OmitId<Employee>> = await req.json();
    const { id: employeeId } = await params;

    const employeesStore = await getEmployeesStore();

    let updatedEmployee: Employee | null = null;

    const updatedEmployees = employeesStore.map(employee => {
      if (employee.id === Number(employeeId)) {
        updatedEmployee = { ...employee, ...body };
        return updatedEmployee;
      }
      return employee;
    });

    if (!updatedEmployee) {
      return NextResponse.json(
        { error: 'Employee not found' },
        { status: 404 }
      );
    }

    await setEmployeesStore(updatedEmployees);
    return NextResponse.json(updatedEmployee);
  } catch (error) {
    console.error('Error in PUT /api/employees/[id]:', error);
    return NextResponse.json(
      { error: 'Failed to update employee' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: employeeId } = await params;

    const employeesStore = await getEmployeesStore();

    const filteredEmployees = employeesStore.filter(
      employee => employee.id !== Number(employeeId)
    );

    await setEmployeesStore(filteredEmployees);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/employees/[id]:', error);
    return NextResponse.json(
      { error: 'Failed to delete employee' },
      { status: 500 }
    );
  }
}
