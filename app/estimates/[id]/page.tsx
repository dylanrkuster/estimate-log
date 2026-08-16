import { db } from "@/db";
import { notFound } from "next/navigation";

interface ViewAnEstimagePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ViewAnEstimatePage(
  props: ViewAnEstimagePageProps,
) {
  // asynchronously grab the id from the url params
  const { id } = await props.params;

  // fake delay to test the loading page
  await new Promise((r) => setTimeout(r, 500));

  // fetch an estimate from our db
  const estimate = await db.estimate.findFirst({
    where: { id: parseInt(id) },
  });

  // if we can't find one, redirect the user to our custom not found page
  if (!estimate) {
    return notFound();
  }

  // display the fetched estimate's name
  return <div>{estimate.name}</div>;
}
