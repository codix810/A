import connectDB from "../../../../../lib/db";
import Review from "../../../../../models/Review";
import { NextResponse } from "next/server";

export async function DELETE(
  req:Request,
  {params}:{params:{id:string}}
){
  await connectDB();
  await Review.findByIdAndDelete(params.id);
  return NextResponse.json({success:true});
}