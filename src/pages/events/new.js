import { supabase } from "@/utils/SupabaseClient";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function New() {
  const [clients, setClients] = useState([]);
  const [clientId,setClientId] = useState();
  const [loading, setLoading] = useState(false);
  const [newDate,setNewDate] = useState();
  const router = useRouter();

  const saveNewEvent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .insert([{ date: newDate, client_id: clientId }])
        .select();

        if(error) throw error;

        router.push('/events')
    } catch (error) {
      console.log("saveNewEvent Error", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      setLoading(true);

      let { data, error } = await supabase.from("clients").select("id,name");

      if (data) {
        setClients(data);
        setClientId(data[0].id);
        console.log("clients", clients);
      }
     
      if (error) throw error;
    } catch (error) {
      console.log("fetch clients error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="p-4">
      <h1>New Event</h1>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="client"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Location({clientId})
          </label>
          <select
            id="client"
            name="client"
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue="Select Client"
            value={clientId}
            onChange={(e)=>setClientId(e.target.value)}
          >
            
            {clients.map((client,i) => (
              <option key={i} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        <input type="datetime-local" id="event_time" name="event_time" onChange={(e)=> setNewDate(e.target.value)}></input>

        <button
          type="button"
          className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => saveNewEvent()}
        >
          Save
        </button>
      </div>
    </div>
  );
}
