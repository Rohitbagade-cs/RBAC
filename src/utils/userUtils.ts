import { User } from '../types/auth';

export function generateUserId(): string {
  return Math.random().toString(36).substr(2, 9);
}