import React, { useState } from "react";

function CreateRoomModal({ isOpen, closeModal, createRoom }) {
  const [roomName, setRoomName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (roomName.trim() === "") {
      alert("Please enter a valid room name!");
      return;
    }
    // Call the createRoom function passed as prop
    createRoom(roomName);
    closeModal(); // Close the modal after creation
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
        <div className="bg-neutral-800 p-8 rounded-xl w-96">
          <h3 className="text-2xl font-semibold text-white mb-4">Create Private Room</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="bg-neutral-800 text-green-400 rounded-lg pl-10 pr-4 py-2 border border-neutral-700 focus:outline-none focus:border-green-400"
              placeholder="Enter Room Name"
            />
            <div className="flex justify-between">
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-2 bg-neutral-700 text-neutral-400 rounded-lg font-medium hover:bg-neutral-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-neutral-900 rounded-lg font-medium hover:bg-green-400"
              >
                Create Room
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default CreateRoomModal;
