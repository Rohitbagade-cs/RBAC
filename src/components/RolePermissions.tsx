import React from 'react';
import { Shield, Plus } from 'lucide-react';
import { Permission, RoleDefinition } from '../types/auth';

interface RolePermissionsProps {
  roles: RoleDefinition[];
  permissions: Permission[];
  onAddRole: () => void;
}

export function RolePermissions({ roles, permissions, onAddRole }: RolePermissionsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-semibold">Role Permissions</h2>
        </div>
        <button
          onClick={onAddRole}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          <Plus className="w-4 h-4" />
          Add Role
        </button>
      </div>
      <div className="space-y-6">
        {roles.map((role) => (
          <div key={role.name} className="border rounded-lg p-4">
            <h3 className="text-lg font-medium capitalize mb-2">{role.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{role.description}</p>
            <div className="flex flex-wrap gap-2">
              {role.permissions.map((permId) => {
                const permission = permissions.find((p) => p.id === permId);
                return (
                  <span
                    key={permId}
                    className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800"
                  >
                    {permission?.name}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}