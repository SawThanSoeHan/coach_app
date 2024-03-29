import React from "react";

export default function LoadingModal() {
  return (
    <div class="w-80 mx-auto mt-5 p-7">
      <p class="text-2xl font-medium text-gray-800">
        Click here to open to the modal
      </p>
      <button
        class="bg-green-500 text-white rounded-md px-8 py-2 text-base font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        id="open-btn"
      >
        Open Modal
      </button>
    </div>
  );
}
