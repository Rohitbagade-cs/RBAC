import { Permission, RoleDefinition, User } from '../types/auth';

export const users: User[] = [
  { id: '1', name: 'John Admin', email: 'john@example.com', role: 'admin' },
  { id: '2', name: 'Sarah Manager', email: 'sarah@example.com', role: 'manager' },
  { id: '3', name: 'Mike User', email: 'mike@example.com', role: 'user' },
];

export const permissions: Permission[] = [
  { id: 'create_user', name: 'Create User', description: 'Can create new users' },
  { id: 'edit_user', name: 'Edit User', description: 'Can edit existing users' },
  { id: 'delete_user', name: 'Delete User', description: 'Can delete users' },
  { id: 'view_reports', name: 'View Reports', description: 'Can view reports' },
  { id: 'manage_roles', name: 'Manage Roles', description: 'Can manage roles and permissions' },
];

export const roleDefinitions: RoleDefinition[] = [
  {
    name: 'admin',
    permissions: ['create_user', 'edit_user', 'delete_user', 'view_reports', 'manage_roles'],
    description: 'Full system access',
  },
  {
    name: 'manager',
    permissions: ['create_user', 'edit_user', 'view_reports'],
    description: 'Can manage users and view reports',
  },
  {
    name: 'user',
    permissions: ['view_reports'],
    description: 'Basic user access',
  },
];