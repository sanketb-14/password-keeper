import { createContext, useContext, useState, useEffect } from "react";

const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [passwords, setPasswords] = useState(() => {
    try {
      const savedPasswords = localStorage.getItem("passwordKeeperData");
      return savedPasswords ? JSON.parse(savedPasswords) : [];
    } catch (error) {
      console.error("Error loading passwords from localStorage:", error);
      return [];
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPassword, setEditingPassword] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("passwordKeeperData", JSON.stringify(passwords));
    } catch (error) {
      console.error("Error saving passwords to localStorage:", error);
    }
  }, [passwords]);

 

const filteredPasswords = searchQuery.trim() 
  ? passwords.filter(
      (password) =>
        password.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        password.password.toLowerCase().includes(searchQuery.toLowerCase().trim())
    )
  : passwords;


  



  const addPassword = (passwordData) => {
    const newPassword = {
      id: Date.now(),
      ...passwordData,
      createdAt: new Date().toLocaleDateString(),
      
      updatedAt: new Date().toLocaleDateString(),
    };
    setPasswords((prev) => {
      const updated = [...prev, newPassword];
      return updated;
    });
  };

  const updatePassword = (id, updatedData) => {
    setPasswords((prev) => {
      const updated = prev.map((pass) =>
        pass.id === id
          ? {
              ...pass,
              ...updatedData,
              updatedAt: new Date().toLocaleDateString(),
            }
          : pass
      );
      return updated;
    });
  };

  const deletePassword = (id) => {
    setPasswords((prev) => {
      const updated = prev.filter((pass) => pass.id !== id);
      return updated;
    });
  };

  const clearAllPasswords = () => {
    setPasswords([]);
    try {
      localStorage.removeItem("passwordKeeperData");
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  const openAddModal = () => {
    setEditingPassword(null);
    setIsModalOpen(true);
  };

  const openEditModal = (password) => {
    setEditingPassword(password);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPassword(null);
  };

  return (
    <PasswordContext.Provider
      value={{
        passwords,
        isModalOpen,
        editingPassword,
        addPassword,
        filteredPasswords,
        updatePassword,
        deletePassword,
        clearAllPasswords,
        setSearchQuery,
        searchQuery,
        openAddModal,
        openEditModal,
        closeModal,
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
};

export const usePasswords = () => {
  const context = useContext(PasswordContext);
  if (!context) {
    throw new Error("usePasswords must be used within PasswordProvider");
  }
  return context;
};
