"use client";

import { useState } from "react";
import { LuSearch, LuUsers } from "react-icons/lu";
import ClientPreview from "./ClientPreview";
import type { IClientPreview } from "@/interfaces/clients/IClient";
import SearchBar from "@/components/UI/input/SearchBar";

export default function ClientsList({ clients }: { clients: string }) {
  const [searchValue, setSearchValue] = useState("");
  const clientsList: IClientPreview[] = JSON.parse(clients);
  const searchedClients = clientsList.filter((client) =>
    client.userName.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center gap-12 w-full max-w-7xl mx-auto px-4 py-8">
      <div className="w-full max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <LuUsers className="text-blue-400" />
          Your Clients
        </h1>
        <p className="text-gray-400 mb-8">
          Manage and track your clients progress all in one place
        </p>
        <div className="relative w-full group">
          <SearchBar
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.currentTarget.value)
            }
            placeholder="Search clients by name..."
          />
          <LuSearch
            className="absolute left-5 top-1/2 transform -translate-y-1/2 
                     text-gray-500 h-5 w-5 transition-colors duration-300 
                     group-focus-within:text-blue-500"
          />
        </div>
      </div>

      <div className="w-full">
        {searchedClients.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {searchedClients.map((client) => (
              <ClientPreview client={client} key={client._id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No clients found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
