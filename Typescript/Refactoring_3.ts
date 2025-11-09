type DelayJob = {
    type: "delay";
    ms: number;
}

type ComputeJob = {
    type: "compute";
    numbers: number[];
}

type UnknownJob = {
    type: string;
}

type Job = DelayJob | ComputeJob | UnknownJob;

const jobHandler = {
    delay: async(job: DelayJob) => {
        await new Promise((r) => setTimeout(r, job.ms));
        return true;
    },
    compute: async(job: ComputeJob) => {
        if (!Array.isArray(job.numbers)) {
            throw new Error("Invalid compute job input");
        }
        return job.numbers.reduce((a: number, b: number) => a + b, 0);
    }
}

export async function processQueue(jobs: Job[]) {
    const results = [];
    for (const job of jobs) {
        const handler = (jobHandler as any)[job.type]
        if (!handler) {
            results.push(null);
            continue;
        }
        results.push(await handler(job));
    }
    return results;
}

// export async function processQueue(jobs: any[]) {
//   const results = [];

//   for (let i = 0; i < jobs.length; i++) {
//     let job = jobs[i];

//     if (job.type === "delay") {
//       await new Promise((r) => setTimeout(r, job.ms));
//       results.push(true);
//     } else if (job.type === "compute") {
//       const sum = job.numbers.reduce((a: any, b: any) => a + b);
//       results.push(sum);
//     } else {
//       results.push(null);
//     }
//   }

//   return results;
// }