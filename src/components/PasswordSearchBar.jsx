import { usePasswords } from "../context/PasswordContext";
import { Search } from 'lucide-react';

export const PasswordSearchBar = () => {
  const { searchQuery, setSearchQuery, passwords, filteredPasswords } = usePasswords();

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="form-control">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-base-content/40" />
          </div>
          <input
            type="text"
            placeholder="Search passwords by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full pl-10 pr-10 focus:input-primary"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-error transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      
      {/* Search Results Info */}
      {passwords.length > 0 && (
        <div className="flex items-center justify-between mt-2 text-sm text-base-content/60">
          <span>
            {searchQuery ? (
              filteredPasswords.length === 0 ? (
                <>🔍 No passwords found for "{searchQuery}"</>
              ) : (
                <>🔍 Found {filteredPasswords.length} of {passwords.length} passwords</>
              )
            ) : (
              <>📁 Showing all {passwords.length} passwords</>
            )}
          </span>
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="btn btn-ghost btn-xs text-primary hover:text-primary-focus"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
};