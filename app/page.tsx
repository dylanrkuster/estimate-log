export const dynamic = "force-dynamic";

import { db } from "@/db";

export default async function EventsPage() {
  const estimates = await db.estimate.findMany();

  const renderedEstimates = estimates.map((estimate) => (
    <div key={estimate.id}>{estimate.name}</div>
  ));

  return (
    <div className="pt-48 flex justify-center items-center">
      <h1 className="text-black text-6xl">Estimates</h1>
      {renderedEstimates}
    </div>
  );
}
