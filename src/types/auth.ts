export type Role = string;

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface RoleDefinition {
  name: Role;
  permissions: string[];
  description: string;
}

export interface NewRole {
  name: string;
  description: string;
  permissions: string[];
}