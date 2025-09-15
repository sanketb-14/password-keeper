import { useState, useEffect } from "react";
import { Key, Eye, EyeOff } from 'lucide-react';
import { Portal } from "./Portal";
import { usePasswords } from "../context/PasswordContext";

export const PasswordForm = () => {
  const { editingPassword, addPassword, updatePassword, closeModal, isModalOpen } = usePasswords();
  const [formData, setFormData] = useState({
    title: editingPassword?.title || '',
    password: editingPassword?.password || ''
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (editingPassword) {
      setFormData({
        title: editingPassword.title,
        password: editingPassword.password
      });
    } else {
      setFormData({ title: '', password: '' });
    }
  }, [editingPassword]);

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.password.trim()) return;

    if (editingPassword) {
      updatePassword(editingPassword.id, formData);
    } else {
      addPassword(formData);
    }
    
    closeModal();
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Portal isOpen={isModalOpen}>
      <div className="modal modal-open">
        <div className="modal-box relative max-w-lg">
          
          <div className="flex items-center gap-3 mb-6">
            <Key className="w-6 h-6 text-primary" />
            <h3 className="font-bold text-2xl text-base-content">
              {editingPassword ? 'Update Password' : 'Add New Password'}
            </h3>
          </div>
          
          <button 
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal}
            type="button" 
          >
            ✕
          </button>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
            
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Gmail, Facebook, Work Email"
                  className="input input-bordered w-full focus:input-primary"
            
                />
              </div>

             
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="input input-bordered w-full pr-12 focus:input-primary"
                   
                  />
                  <button
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-ghost btn-sm absolute right-1 top-1 h-10 w-10 p-0"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="modal-action">
              <button 
                className="btn btn-ghost"
                onClick={closeModal}
                type="button" 
              >
                Cancel
              </button>
            
              <button 
                className="btn btn-primary"
                type="submit"
                disabled={!formData.title.trim() || !formData.password.trim()}
              >
                {editingPassword ? 'Update Password' : 'Save Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
};