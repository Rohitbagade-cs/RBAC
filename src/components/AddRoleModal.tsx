import React, { useState } from 'react';
import { Shield, Plus } from 'lucide-react';
import { Permission, NewRole } from '../types/auth';

interface AddRoleModalProps {
  permissions: Permission[];
  onClose: () => void;
  onAdd: (newRole: NewRole) => void;
  existingRoles: string[];
}

export function AddRoleModal({ permissions, onClose, onAdd, existingRoles }: AddRoleModalProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = (formData.get('name') as string).toLowerCase();
    
    if (existingRoles.includes(name)) {
      setError('A role with this name already exists');
      return;
    }

    const newRole: NewRole = {
      name,
      description: formData.get('description') as string,
      permissions: selectedPermissions,
    };
    onAdd(newRole);
  };

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-semibold">Add New Role</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Role Name</label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter role name"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter role description"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
            <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-3">
              {permissions.map((permission) => (
                <label key={permission.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes(permission.id)}
                    onChange={() => togglePermission(permission.id)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{permission.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Add Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}