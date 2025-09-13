import { useState } from "react";
import {  Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { usePasswords } from "../context/PasswordContext";

export const PasswordItem = ({ password }) => {
  const { deletePassword, openEditModal } = usePasswords();
  const [showPassword, setShowPassword] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this password?')) {
      deletePassword(password.id);
    }
  };

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-200">
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="card-title text-primary mb-2">
              {password.title}
            </h3>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-base-content/70">Password:</span>
              <div className="flex items-center gap-2">
                <code className="text-sm bg-base-200 px-2 py-1 rounded">
                  {showPassword ? password.password : '•'.repeat(password.password.length)}
                </code>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn btn-ghost btn-xs btn-square"
                >
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </button>
              </div>
            </div>
            
            <div className="badge badge-outline badge-sm">
              {password.updatedAt && password.updatedAt !== password.createdAt 
                ? `Updated on ${password.updatedAt}` 
                : `Added on ${password.createdAt}`}
              {password.importedAt && (
                <span className="ml-2 text-info">📥 Imported</span>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => openEditModal(password)}
              className="btn btn-primary btn-sm btn-outline"
              title="Edit password"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-sm btn-outline"
              title="Delete password"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};