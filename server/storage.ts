// Storage interface for future backend implementation
// Currently not used by the frontend-only video generator

export interface IStorage {
  // Add storage methods here when backend is implemented
}

export class MemStorage implements IStorage {
  constructor() {
    // Initialize storage
  }
}

export const storage = new MemStorage();
