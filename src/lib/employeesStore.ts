import type { Employee } from '@/lib/employees';
import { getEmployeesFromFile, saveEmployeesToFile } from '@/lib/fileStorage';

// Cache for performance - avoid reading file on every request
let employeesCache: Employee[] | null = null;
let lastCacheUpdate = 0;
const CACHE_DURATION = 5000; // 5 seconds cache

export async function getEmployeesStore(): Promise<Employee[]> {
  const now = Date.now();

  // Return cached data if it's still fresh
  if (employeesCache && now - lastCacheUpdate < CACHE_DURATION) {
    return employeesCache;
  }

  // Load from file and update cache
  employeesCache = await getEmployeesFromFile();
  lastCacheUpdate = now;

  return employeesCache;
}

export async function setEmployeesStore(
  newEmployees: Employee[]
): Promise<void> {
  // Update cache
  employeesCache = newEmployees;
  lastCacheUpdate = Date.now();

  // Save to file
  await saveEmployeesToFile(newEmployees);
}

// Clear cache (useful for testing or manual cache invalidation)
export function clearEmployeesCache(): void {
  employeesCache = null;
  lastCacheUpdate = 0;
}
