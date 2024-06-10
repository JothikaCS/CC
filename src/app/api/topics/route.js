import connectMongoDB from "@/app/libs/mongodb";
import Topic from "@/app/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description, todo } = await request.json();
  console.log("Received data:", { title, description, todo });
  console.log("Topic saved to database");
  await connectMongoDB();
  await Topic.create({ title, description, todo });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find();
  return NextResponse.json({ topics });
}


export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
