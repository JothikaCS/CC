import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

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

export default async function TopicsList() {
  const { topics } = await getTopics();

  return (
    <>
      {topics.map((t) => (
        <>
          <div
            key={t._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 w-1/3 rounded"
          >
            <div>
              <h2 className="font-semibold mb-2">{t.title}</h2>
              <div className="text-gray-600 text-sm">{t.description}</div>
              <p className="text-blue-800"> {t.todo}</p>
            </div>

            <div className="">
              <RemoveBtn id={t._id} />
              <Link href={`/editTopic/${t._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        </>
      ))}
    </>
  );
}
