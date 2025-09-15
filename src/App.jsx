import React from "react";
import { PlusCircle, Key, Search } from "lucide-react";
import { usePasswords } from "./context/PasswordContext";
import { PasswordForm } from "./components/PasswordForm";
import { PasswordItem } from "./components/PasswordItem";
import { PasswordSearchBar } from "./components/PasswordSearchBar";

const App = () => {
  const {
    passwords,
    filteredPasswords,
    searchQuery,
    openAddModal,
    clearAllPasswords,
  } = usePasswords();

  const handleClearAll = () => {
    if (
      window.confirm(
        "⚠️ Are you sure you want to delete ALL passwords? This action cannot be undone!"
      )
    ) {
      {
        clearAllPasswords();
        alert("All passwords have been cleared from storage.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="hero bg-base-100 rounded-2xl shadow-lg mb-8">
          <div className="hero-content text-center py-12">
            <div className="max-w-md">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Key className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-5xl font-bold text-primary mb-4">
                Password Keeper
              </h1>
              <p className="text-lg text-base-content/70">
                Securely store and manage all your passwords in one place
              </p>
              <div className="badge badge-info mt-2">
                💾 Auto-saves to Local Storage
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={openAddModal}
            className="btn btn-primary btn-lg gap-2"
          >
            <PlusCircle className="w-6 h-6" />
            Add New Password
          </button>

          {passwords.length > 0 && (
            <>
              <button
                onClick={handleClearAll}
                className="btn btn-error btn-lg gap-2"
                title="Clear all passwords"
              >
                🗑️ Clear All
              </button>
            </>
          )}
        </div>

        {/* Storage Status */}
        {passwords.length > 0 && (
          <div className="alert alert-success mb-6">
            <div className="flex items-center gap-2">
              <span className="text-lg">💾</span>
              <div>
                <div className="font-semibold">LocalStorage Active</div>
                <div className="text-sm opacity-70">
                  {passwords.length} passwords safely stored in your browser
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        {passwords.length > 0 && <PasswordSearchBar />}

        {/* Password List */}
        <div className="space-y-4">
          {passwords.length === 0 ? (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center py-16">
                <Key className="w-20 h-20 text-base-300 mx-auto mb-4" />
                <h3 className="card-title text-2xl justify-center mb-2 text-base-content/70">
                  No passwords saved yet
                </h3>
                <p className="text-base-content/50 mb-4">
                  Click "Add New Password" to get started securing your accounts
                </p>
                <div className="text-sm text-base-content/40">
                  🔒 All data will be stored locally in your browser
                </div>
              </div>
            </div>
          ) : filteredPasswords.length === 0 && searchQuery ? (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center py-16">
                <Search className="w-20 h-20 text-base-300 mx-auto mb-4" />
                <h3 className="card-title text-2xl justify-center mb-2 text-base-content/70">
                  No passwords found
                </h3>
                <p className="text-base-content/50 mb-4">
                  No passwords match your search for "{searchQuery}"
                </p>
               
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-base-content">
                  {searchQuery ? "Search Results" : "Your Passwords"}
                </h2>
                <div className="badge badge-primary badge-lg">
                  {filteredPasswords.length}{" "}
                  {filteredPasswords.length === 1 ? "Password" : "Passwords"}
                  {searchQuery &&
                    filteredPasswords.length !== passwords.length && (
                      <span className="ml-1 opacity-70">
                        of {passwords.length}
                      </span>
                    )}
                </div>
              </div>

              <div className="grid gap-4">
                {filteredPasswords.map((password) => (
                  <PasswordItem key={password.id} password={password} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal Portal */}
      <PasswordForm />
    </div>
  );
};

export default App;
