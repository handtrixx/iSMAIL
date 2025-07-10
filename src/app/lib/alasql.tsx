'use server';

import alasql from 'alasql/dist/alasql.min.js';

export async function queryData(query: string, ...data: any[]) {
  try {
    const params = data.map(d => (Array.isArray(d) ? d : [d]));
    return alasql(query, params);
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
}