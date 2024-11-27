import React from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteConfirmationModalProps {
  userName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmationModal({ userName, onConfirm, onCancel }: DeleteConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center gap-2 mb-4">
          <Trash2 className="w-5 h-5 text-red-600" />
          <h2 className="text-xl font-semibold">Delete User</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <span className="font-semibold">{userName}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
}