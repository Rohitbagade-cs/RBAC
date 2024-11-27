import React from 'react';
import { User } from '../types/auth';
import { Users, UserPlus, Pencil, Trash2 } from 'lucide-react';

interface UserListProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  onAddUser: () => void;
}

export function UserList({ users, onEditUser, onDeleteUser, onAddUser }: UserListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Users</h2>
        </div>
        <button
          onClick={onAddUser}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>
      <div className="divide-y divide-gray-200">
        {users.map((user) => (
          <div key={user.id} className="py-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                {user.role}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => onEditUser(user)}
                  className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                  title="Edit user"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteUser(user)}
                  className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                  title="Delete user"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}