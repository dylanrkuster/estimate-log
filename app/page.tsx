export const dynamic = 'force-dynamic';

import { db } from '@/db';
import Link from 'next/link';

export default async function EventsPage() {
    const estimates = await db.estimate.findMany();

    const renderedEstimates = estimates.map((estimate, i) => (
        <tr
            className={i % 2 == 0 ? 'bg-white' : 'bg-zinc-50'}
            key={estimate.id}
        >
            <td className="px-3 py-2 align-top whitespace-normal wrap-break-words">
                {estimate.date.toDateString()}
            </td>
            <td className="px-3 py-2 align-top whitespace-normal wrap-break-words">
                {estimate.name}
            </td>
            <td className="px-3 py-2 align-top text-right tabular-nums">
                {estimate.projectedMinutes}
            </td>
            <td className="px-3 py-2 align-top whitespace-normal wrap-break-words">
                {estimate.projectedReasoning}
            </td>
            <td className="px-3 py-2 align-top text-right tabular-nums">
                {estimate.actualMinutes}
            </td>
            <td className="px-3 py-2 align-top whitespace-normal wrap-break-words">
                {estimate.actualReasoning}
            </td>
            <td className="px-3 py-2 align-top whitespace-nowrap">
                <Link
                    className="font-medium text-zinc-900 underline underline-offset-2"
                    href={`/estimates/${estimate.id}`}
                >
                    Edit
                </Link>
            </td>
        </tr>
    ));

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Estimate Log
                </h1>
                <Link
                    className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
                    href="/estimates/new"
                >
                    Create New
                </Link>
            </div>
            <table className="w-full table-fixed border-collapse text-sm">
                <thead>
                    <tr className="border-b border-zinc-200 text-left text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                        <th className="px-3 py-2 font-semibold">Date</th>
                        <th className="px-3 py-2 font-semibold">Name</th>
                        <th className="px-3 py-2 text-right font-semibold">
                            Projected Minutes
                        </th>
                        <th className="px-3 py-2 font-semibold">
                            Projected Reasoning
                        </th>
                        <th className="px-3 py-2 text-right font-semibold">
                            Actual Minutes
                        </th>
                        <th className="px-3 py-2 font-semibold">
                            Actual Reasoning
                        </th>
                        <th className="px-3 py-2 font-semibold"></th>
                    </tr>
                </thead>
                <tbody>{renderedEstimates}</tbody>
            </table>
        </div>
    );
}
