import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import type { Employee } from '@/lib/employees';

const EMPLOYEES_FILE_PATH = path.join(process.cwd(), 'data', 'employees.yaml');

// Ensure the data directory exists
async function ensureDataDirectory() {
  const dataDir = path.dirname(EMPLOYEES_FILE_PATH);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Initialize with default data if file doesn't exist
async function initializeEmployeesFile() {
  const defaultEmployees: Employee[] = [
    {
      id: 1,
      name: 'Edward Perry',
      age: 25,
      joinDate: new Date().toISOString(),
      role: 'Finance',
    },
    {
      id: 2,
      name: 'Josephine Drake',
      age: 36,
      joinDate: new Date().toISOString(),
      role: 'Market',
    },
    {
      id: 3,
      name: 'Cody Phillips',
      age: 19,
      joinDate: new Date().toISOString(),
      role: 'Development',
    },
  ];

  await ensureDataDirectory();

  try {
    await fs.access(EMPLOYEES_FILE_PATH);
  } catch {
    // File doesn't exist, create it with default data
    const yamlContent = yaml.dump(defaultEmployees, {
      indent: 2,
      lineWidth: -1, // Prevent line wrapping
    });
    await fs.writeFile(EMPLOYEES_FILE_PATH, yamlContent, 'utf8');
  }
}

export async function getEmployeesFromFile(): Promise<Employee[]> {
  await initializeEmployeesFile();

  try {
    const fileContent = await fs.readFile(EMPLOYEES_FILE_PATH, 'utf8');
    const employees = yaml.load(fileContent) as Employee[];
    return employees || [];
  } catch (error) {
    console.error('Error reading employees file:', error);
    return [];
  }
}

export async function saveEmployeesToFile(
  employees: Employee[]
): Promise<void> {
  await ensureDataDirectory();

  try {
    const yamlContent = yaml.dump(employees, {
      indent: 2,
      lineWidth: -1, // Prevent line wrapping
    });
    await fs.writeFile(EMPLOYEES_FILE_PATH, yamlContent, 'utf8');
  } catch (error) {
    console.error('Error saving employees file:', error);
    throw new Error('Failed to save employees data');
  }
}
