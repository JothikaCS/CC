import React from "react";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function TaskManager() {
  const { topics } = await getTopics();
  return (
    <div className="p-4">
      <table className="min-w-1/5 bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="w-1/3 py-2 px-4 border-b">Title</th>
            <th className="w-1/3 py-2 px-4 border-b">Description</th>
            <th className="w-1/3 py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((topic) => (
            <tr key={topic.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{topic.title}</td>
              <td className="py-2 px-4 border-b">{topic.description}</td>
              <td className="py-2 px-4 border-b">{topic.todo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
