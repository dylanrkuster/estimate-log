import { db } from '@/db';
import { notFound } from 'next/navigation';
import EstimateActualsForm from './actuals-form';

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
    const sanitizedId = Number(id);

    if (!sanitizedId || sanitizedId <= 0) {
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

    return (
        <EstimateActualsForm
            id={estimate.id}
            actualMinutes={
                estimate.actualMinutes == null
                    ? ''
                    : String(estimate.actualMinutes)
            }
            actualReasoning={estimate.actualReasoning ?? ''}
            date={estimate.date.toISOString().slice(0, 10)}
            name={estimate.name}
            projectedMinutes={estimate.projectedMinutes}
            projectedReasoning={estimate.projectedReasoning ?? ''}
        />
    );
}
