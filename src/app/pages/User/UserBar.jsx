"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UserBar() {
  const [topics, setTopics] = useState([]);
  const router = useRouter();

  // Function to fetch topics from the API
  const getTopics = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch topics");
      }

      const data = await res.json();
      return data.topics || [];
    } catch (error) {
      console.log("Error loading topics: ", error);
      return [];
    }
  };

  // Fetch topics when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const topicsData = await getTopics();
      setTopics(topicsData);
    };

    fetchData();
  }, []);

  const handleStatusChange = async (id, newTodo) => {
    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTodo }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {topics.map((topic) => (
        <div
          key={topic._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start w-1/2"
        >
          <div>
            <h2 className="font-bold text-2xl">{topic.title}</h2>
            <div>{topic.description}</div>
          </div>
          <div>
            <select
              defaultValue={topic.todo || ""}
              className="border border-slate-300 p-2 rounded"
              onChange={(e) => handleStatusChange(topic._id, e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="InProgress">In Progress</option>
              <option value="InReview">In Review</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>
      ))}
    </>
  );
}
