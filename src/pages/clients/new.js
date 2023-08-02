import { supabase } from "@/utils/SupabaseClient";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

export default function New() {
  const router = useRouter();
  const [name, setName] = useState();
  const [loading, setLoading] = useState(false);

  const saveNewClient = async () => {
    // let { data, error1 } = await supabase
    // .from('profiles')
    // .select('id')

    // console.log("profile_data",data)
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("clients")
        .insert([{ name: name }])
        .select();
      if (error) throw error;
      if (data) router.push("/clients");
    } catch (error) {
        console.log("error",error);
    } finally {
      setLoading(false);
    }

    // console.log("error",error)
  };

  return (
    <div className="p-4">
      <h1>New Client</h1>
      <div className="space-y-4">
        <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
          <label
            htmlFor="name"
            className="block text-xs font-medium text-gray-900"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Jane Smith"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => saveNewClient()}
        >
          Save
        </button>
      </div>
    </div>
  );
}
