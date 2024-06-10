import React from "react";
import TopicsList from "@/app/components/TopicsList";
import UserBar from "@/app/pages/User/UserBar";
import Link from "next/link";
import TaskManager from "@/app/components/TaskManager";

const page = () => {
  return (
    <div>
      <nav className="flex justify-between items-center bg-slate-800 px-8 py-3">
        <Link className="bg-white p-2" href={"/addTopic"}>
          Add Issue
        </Link>
      </nav>
      <TopicsList />
      <UserBar />
      {/* <TaskManager /> */}
    </div>
  );
};

export default page;
