export const formatTimestampToDate = (timestamp: any): string => {
    if (!timestamp || isNaN(Number(timestamp))) {
      return String(timestamp || '');
    }
  
    const date = new Date(Number(timestamp));
    if (isNaN(date.getTime())) {
      return String(timestamp);
    }
  
    return date.toISOString().split('T')[0];
  };
  
  export const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };