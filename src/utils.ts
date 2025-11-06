// Utility functions

export function showMessage(message: string, type: 'success' | 'error' = 'success'): void {
  // This could be enhanced with a toast notification system
  console.log(`[${type.toUpperCase()}] ${message}`);
}

