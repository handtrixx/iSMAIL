'use server';

import alasql from 'alasql/dist/alasql.min.js';

// Define a type for query parameters that can be various data types
type QueryParameter = string | number | boolean | Date | null | undefined | Record<string, unknown> | unknown[];

export async function queryData(query: string, ...data: QueryParameter[]) {
  try {
    const params = data.map(d => (Array.isArray(d) ? d : [d]));
    return alasql(query, params);
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
}