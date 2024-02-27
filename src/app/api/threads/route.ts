import connectToMongoDB from "@/lib/db/connectToMongoDB";
import ThreadModel from "@/lib/models/thread.model";
import UserModel from "@/lib/models/user.model";
import { queryParamsToObject } from "@/lib/utils";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectToMongoDB();
  const params = queryParamsToObject(req.url);

  const pageNumber: number = params.pageNumber || 1;
  const pageSize: number = params.pageSize || 5;

  const skipNumberOfThreads = (pageNumber - 1) * pageSize;

  const threadsQuery = ThreadModel.find({
    parentId: { $in: [null, undefined] },
  })
    .skip(skipNumberOfThreads)
    .limit(pageSize)
    .sort({ createdAt: "descending" })
    .populate({ path: "author", model: UserModel })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: UserModel,
        select: "_id name parentId image createdAt",
      },
    });

  const totalThreadsCount: number = await ThreadModel.countDocuments({
    parentId: { $in: [null, undefined] },
  });
  const threads = await threadsQuery.exec();

  const isNextPage = !(
    totalThreadsCount - 1 <
    skipNumberOfThreads + threads.length
  );

  const res = { threads, isNextPage, totalThreadsCount };

  return NextResponse.json(res);
}
