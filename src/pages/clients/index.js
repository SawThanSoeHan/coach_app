import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { supabase } from "@/utils/SupabaseClient";
import { useEffect } from "react";

export default function Clients() {
  const router = useRouter();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const deleteClient = async (id) => {
    try {
      console.log("id",id)
      setLoading(true);

      const {data, error } = await supabase
        .from("clients")
        .delete()
        .eq("id", id);
        if(error) throw error
        setClients(clients.filter(x=> x.id!=id))

    } catch (error) {
      console.log("error",error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      setLoading(true);
      let { data: clients, error } = await supabase.from("clients").select();
      if(error) throw error;
      if (clients) {
        setClients(clients);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between p-4">
        <h1>Client List</h1>
        <button
          type="button"
          className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => router.push("/clients/new")}
        >
          New
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul role="list" className="space-y-3">
          {clients.map((item) => (
            <li
              key={item.id}
              className="overflow-hidden rounded-md bg-white px-6 py-4 shadow"
            >
              <div>{item.name}</div>
              <div>
                <button
                  type="button"
                  className="rounded bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => deleteClient(item.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
