import { User } from '../types/auth.types';


export enum StorageType {
  LOCAL = 'localStorage',
  SESSION = 'sessionStorage'
}

export const getUserFromStorage = (storageType: StorageType = StorageType.LOCAL): User | null => {
  try {
    const storage = storageType === StorageType.LOCAL ? localStorage : sessionStorage;
    const userData = storage.getItem("user");
    
    if (!userData) {
      return null;
    }
    
    return JSON.parse(userData) as User;
  } catch (error) {
    console.error('Error retrieving user from storage:', error);
    return null;
  }
};

export const saveUserToStorage = (user: User, storageType: StorageType = StorageType.LOCAL): boolean => {
  try {
    const storage = storageType === StorageType.LOCAL ? localStorage : sessionStorage;
    
    storage.setItem("user", JSON.stringify(user));
    return true;
  } catch (error) {
    console.error('Error saving user to storage:', error);
    return false;
  }
};

export const removeUserFromStorage = (): void => {
  try {
    sessionStorage.removeItem("user");
    localStorage.removeItem("user");
  } catch (error) {
    console.error('Error removing user from storage:', error);
  }
};

export const getUserFromAnyStorage = (): User | null => {
  let user = getUserFromStorage(StorageType.LOCAL);
  if (user) {
    return user;
  }
  
  user = getUserFromStorage(StorageType.SESSION);
  return user;
};