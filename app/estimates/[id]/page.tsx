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

  // lets make sure the id is a number
  const sanitizedId = parseInt(id);

  if (!sanitizedId) {
    return notFound(); // in the future, we'll return an error page here instead
  }

  // fetch an estimate from our db
  const estimate = await db.estimate.findUnique({
    where: { id: sanitizedId },
  });

  // if we can't find one, redirect the user to our custom not found page
  if (!estimate) {
    return notFound();
  }

  // display the fetched estimate's name
  return <div>{estimate.name}</div>;
}
