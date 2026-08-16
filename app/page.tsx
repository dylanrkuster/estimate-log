export const dynamic = "force-dynamic";

import { db } from "@/db";

export default async function EventsPage() {
  const estimates = await db.estimate.findMany();

  const renderedEstimates = estimates.map((estimate) => (
    <div key={estimate.id}>{estimate.name}</div>
  ));

  return <div>{renderedEstimates}</div>;
}
