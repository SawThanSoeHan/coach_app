import { supabase } from "@/utils/SupabaseClient";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";

export default function Events() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState();

  const deleteEvent = async (id) => {
    try {
      console.log("id", id);
      setLoading(true);

      const { data, error } = await supabase
        .from("events")
        .delete()
        .eq("id", id);

      setEvents(events.filter((x) => x.id != id));
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      let { data: events, error } = await supabase.from("events").select(`*,
        clients(name)
      `);

      if (events) {
        setEvents(events);
        console.log("events", events);
      } else if (error) throw error;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between p-4">
        <h1>Event List</h1>
        <button
          type="button"
          className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => router.push("/events/new")}
        >
          New
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul role="list" className="space-y-3">
          {events.map((item) => (
            <li
              key={item.id}
              className="overflow-hidden rounded-md bg-white px-6 py-4 shadow"
            >
              <div>
                {item.date} ( {item.clients.name} )
              </div>
              <div>
                <button
                  type="button"
                  className="rounded bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => deleteEvent(item.id)}
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
