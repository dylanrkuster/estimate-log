import { db } from '@/db';
import { redirect } from 'next/navigation';

export default function CreateEstimatePage() {
    async function createEstimate(formData: FormData) {
        // specify the function as a server action (and give us access to the formData prop)
        'use server';

        const name = formData.get('name') as string;
        const date = new Date(formData.get('date') as string);
        const projectedMinutes = parseInt(
            formData.get('projectedMinutes') as string,
        );
        const projectedReasoning = formData.get('projectedReasoning') as string;

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
                projectedReasoning: projectedReasoning
                    ? projectedReasoning
                    : null,
            },
        });

        // redirect to the home page after create
        redirect('/');
    }

    return (
        <form action={createEstimate} className="flex max-w-xl flex-col gap-6">
            <h1 className="text-2xl font-semibold tracking-tight">
                Create an Estimate
            </h1>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label
                        className="text-sm font-medium text-zinc-700"
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <input
                        className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2"
                        id="name"
                        name="name"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        className="text-sm font-medium text-zinc-700"
                        htmlFor="date"
                    >
                        Date
                    </label>
                    <input
                        className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2"
                        id="date"
                        name="date"
                        required
                        type="date"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        className="text-sm font-medium text-zinc-700"
                        htmlFor="projectedMinutes"
                    >
                        Projected Minutes
                    </label>
                    <input
                        className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2"
                        id="projectedMinutes"
                        name="projectedMinutes"
                        required
                        type="number"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        className="text-sm font-medium text-zinc-700"
                        htmlFor="projectedReasoning"
                    >
                        Projected Reasoning
                    </label>
                    <textarea
                        name="projectedReasoning"
                        className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2"
                        id="projectedReasoning"
                    />
                </div>
            </div>
            <button
                className="w-fit cursor-pointer rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
                type="submit"
            >
                Create
            </button>
        </form>
    );
}
