import { db } from "@/db";
import { redirect } from "next/navigation";

export default function CreateEstimatePage() {
  async function createEstimate(formData: FormData) {
    // specify the function as a server action (and give us access to the formData prop)
    "use server";

    const name = formData.get("name") as string;
    const date = new Date(formData.get("date") as string);
    const projectedMinutes = parseInt(
      formData.get("projectedMinutes") as string,
    );
    const projectedReasoning = formData.get("projectedReasoning") as string;

    if (!name || !date || !projectedMinutes) {
      // validate our required fields are specified
      return; // should return a custom error page eventually maybe?
    }

    // create a new record in our db
    await db.estimate.create({
      data: {
        date,
        name,
        projectedMinutes,
        projectedReasoning,
      },
    });

    // redirect to the home page after create
    redirect("/");
  }

  return (
    <form action={createEstimate}>
      <h3 className="font-bold m-3">Create an Estimate</h3>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <div className="flex gap-4">
            <label className="w-36" htmlFor="name">
              Name
            </label>
            <input
              className="border rounded p-2 w-full"
              id="name"
              name="name"
              required
            />
          </div>

          <div className="flex gap-4">
            <label className="w-24" htmlFor="date">
              Date
            </label>
            <input
              className="border rounded p-2 w-full"
              id="date"
              name="date"
              required
              type="date"
            />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex gap-4">
            <label className="w-36" htmlFor="projectedMinutes">
              Projected Minutes
            </label>
            <input
              className="border rounded p-2 w-full"
              id="projectedMinutes"
              name="projectedMinutes"
              required
              type="number"
            />
          </div>

          <div className="flex gap-4">
            <label className="w-24" htmlFor="projectedReasoning">
              Projected Reasoning
            </label>
            <textarea
              name="projectedReasoning"
              className="border rounded p-2 w-full"
              id="projectedReasoning"
            />
          </div>
        </div>
      </div>
      <button className="rounded p-2 bg-blue-200" type="submit">
        Create
      </button>
    </form>
  );
}
