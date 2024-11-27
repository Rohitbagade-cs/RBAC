import React, { useState } from 'react';
import { UserList } from './components/UserList';
import { RolePermissions } from './components/RolePermissions';
import { EditUserModal } from './components/EditUserModal';
import { AddUserModal } from './components/AddUserModal';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
import { AddRoleModal } from './components/AddRoleModal';
import { User, RoleDefinition, NewRole } from './types/auth';
import { users, permissions, roleDefinitions as initialRoleDefinitions } from './data/mockData';
import { Layout } from 'lucide-react';
import { generateUserId } from './utils/userUtils';

function App() {
  const [usersList, setUsersList] = useState<User[]>(users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [roleDefinitions, setRoleDefinitions] = useState<RoleDefinition[]>(initialRoleDefinitions);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsersList(usersList.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setSelectedUser(null);
  };

  const handleAddUser = () => {
    setIsAddingUser(true);
  };

  const handleAddUserSubmit = (newUser: Omit<User, 'id'>) => {
    const userWithId: User = {
      ...newUser,
      id: generateUserId(),
    };
    setUsersList([...usersList, userWithId]);
    setIsAddingUser(false);
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      setUsersList(usersList.filter((u) => u.id !== userToDelete.id));
      setUserToDelete(null);
    }
  };

  const handleAddRole = () => {
    setIsAddingRole(true);
  };

  const handleAddRoleSubmit = (newRole: NewRole) => {
    const roleDefinition: RoleDefinition = {
      name: newRole.name,
      permissions: newRole.permissions,
      description: newRole.description,
    };
    setRoleDefinitions([...roleDefinitions, roleDefinition]);
    setIsAddingRole(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Layout className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">RBAC Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <UserList 
            users={usersList} 
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
            onAddUser={handleAddUser}
          />
          <RolePermissions 
            roles={roleDefinitions} 
            permissions={permissions}
            onAddRole={handleAddRole}
          />
        </div>
      </main>

      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={handleSaveUser}
          availableRoles={roleDefinitions.map(role => role.name)}
        />
      )}

      {isAddingUser && (
        <AddUserModal
          onClose={() => setIsAddingUser(false)}
          onAdd={handleAddUserSubmit}
          availableRoles={roleDefinitions.map(role => role.name)}
        />
      )}

      {userToDelete && (
        <DeleteConfirmationModal
          userName={userToDelete.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setUserToDelete(null)}
        />
      )}

      {isAddingRole && (
        <AddRoleModal
          permissions={permissions}
          onClose={() => setIsAddingRole(false)}
          onAdd={handleAddRoleSubmit}
          existingRoles={roleDefinitions.map(role => role.name)}
        />
      )}
    </div>
  );
}

export default App;