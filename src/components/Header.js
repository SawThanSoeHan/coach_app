import Link from "next/link";
import React from "react";

export default function Header({ session }) {
  return (
    <div className="flex flex-row justify-between">
      <h1>Coach App</h1>
      <div className="flex flex-row space-x-3">
        <Link href={"/events"}>Events</Link>
        <Link href={"/clients"}>Clients</Link>
      </div>
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
        <span className="text-sm font-medium leading-none text-white">
          {session.user.email.substring(0, 3)}
        </span>
      </span>
    </div>
  );
}
