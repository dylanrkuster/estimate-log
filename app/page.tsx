export const dynamic = 'force-dynamic';

import { db } from '@/db';
import Link from 'next/link';

export default async function EventsPage() {
    const cellClass = 'border p-2';
    const estimates = await db.estimate.findMany();

    const renderedEstimates = estimates.map((estimate, i) => (
        <tr className={i % 2 == 0 ? 'bg-gray-200' : ''} key={estimate.id}>
            <td className={cellClass}>{estimate.date.toDateString()}</td>
            <td className={cellClass}>{estimate.name}</td>
            <td className={cellClass}>{estimate.projectedMinutes}</td>
            <td className={cellClass}>{estimate.projectedReasoning}</td>
            <td className={cellClass}>{estimate.actualMinutes}</td>
            <td className={cellClass}>{estimate.actualReasoning}</td>
            <td className={cellClass}>
                <Link
                    className="font-bold underline"
                    href={`/estimates/${estimate.id}`}
                >
                    Edit
                </Link>
            </td>
        </tr>
    ));

    return (
        <div className="flex flex-col gap-5 m-2">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-3xl font-bold">Estimate Log</h1>
                <Link className="font-bold underline" href="/estimates/new">
                    Create New
                </Link>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th className={cellClass}>Date</th>
                        <th className={cellClass}>Name</th>
                        <th className={cellClass}>Projected Minutes</th>
                        <th className={cellClass}>Projected Reasoning</th>
                        <th className={cellClass}>Actual Minutes</th>
                        <th className={cellClass}>Actual Reasoning</th>
                        <th className={cellClass}></th>
                    </tr>
                    {renderedEstimates}
                </tbody>
            </table>
        </div>
    );
}
