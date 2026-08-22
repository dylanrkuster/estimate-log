'use client';

import { useState } from 'react';
import { saveEstimateActuals } from './actions';
import { REASONING_MAX } from './limits';

type EstimateActualsFormProps = {
    id: number;
    name: string;
    date: string;
    projectedMinutes: number;
    projectedReasoning: string;
    actualMinutes: string;
    actualReasoning: string;
};

const lockedInputClass =
    'w-full cursor-not-allowed rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-zinc-700';
const editableInputClass =
    'w-full rounded-md border border-zinc-300 bg-white px-3 py-2';

export default function EstimateActualsForm({
    id,
    name,
    date,
    projectedMinutes,
    projectedReasoning,
    actualMinutes,
    actualReasoning,
}: EstimateActualsFormProps) {
    const [reasoning, setReasoning] = useState(actualReasoning);
    const remaining = REASONING_MAX - reasoning.length;

    return (
        <form
            action={saveEstimateActuals}
            className="flex max-w-xl flex-col gap-6"
        >
            <input name="id" type="hidden" value={id} />
            <h1 className="text-2xl font-semibold tracking-tight">
                Edit Estimate
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
                        className={lockedInputClass}
                        id="name"
                        name="name"
                        readOnly
                        value={name}
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
                        className={lockedInputClass}
                        id="date"
                        name="date"
                        readOnly
                        type="date"
                        value={date}
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
                        className={lockedInputClass}
                        id="projectedMinutes"
                        name="projectedMinutes"
                        readOnly
                        type="number"
                        value={projectedMinutes}
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
                        className={lockedInputClass}
                        id="projectedReasoning"
                        name="projectedReasoning"
                        readOnly
                        value={projectedReasoning}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        className="text-sm font-medium text-zinc-700"
                        htmlFor="actualMinutes"
                    >
                        Actual Minutes
                    </label>
                    <input
                        className={editableInputClass}
                        defaultValue={actualMinutes}
                        id="actualMinutes"
                        name="actualMinutes"
                        type="number"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        className="text-sm font-medium text-zinc-700"
                        htmlFor="actualReasoning"
                    >
                        Actual Reasoning
                    </label>
                    <textarea
                        className={editableInputClass}
                        id="actualReasoning"
                        maxLength={REASONING_MAX}
                        name="actualReasoning"
                        onChange={(event) => setReasoning(event.target.value)}
                        value={reasoning}
                    />
                    <p className="text-sm text-zinc-500">
                        {remaining} characters remaining
                    </p>
                </div>
            </div>
            <button
                className="w-fit cursor-pointer rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
                type="submit"
            >
                Save
            </button>
        </form>
    );
}
