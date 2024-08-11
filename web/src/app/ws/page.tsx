"use client";
import React, { useEffect, useState } from "react";

const WebSocketDisplay: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Create a WebSocket connection
    const socket = new WebSocket("ws://localhost:8000/your_websocket_port"); // Replace with your WebSocket server URL

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      // Update the messages state with the new data
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
      setIsConnected(false);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-4">
      <h2 className="text-2xl mb-4 text-blue-400">WebSocket Messages</h2>
      {isConnected ? (
        <div className="text-green-400">Connected to WebSocket server</div>
      ) : (
        <div className="text-red-400">Disconnected from WebSocket server</div>
      )}
      <div
        className="bg-gray-800 text-white p-3 rounded-lg border border-gray-700 overflow-auto"
        style={{ maxHeight: "300px" }}
      >
        <ul>
          {messages.length === 0 ? (
            <li>No messages received yet.</li>
          ) : (
            messages.map((msg, index) => <li key={index}>{msg}</li>)
          )}
        </ul>
      </div>
    </div>
  );
};

export default WebSocketDisplay;
