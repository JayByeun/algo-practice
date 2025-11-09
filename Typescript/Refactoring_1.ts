/**
 * Difference between interface and type:
 * 1. extends
 *  - interface: with "extends", an interface can be extended (multiple possible)
 *  - type: with "&"
 * 2. declaration and merge
 *  - interface: if same interfaces are declared twice, they will be merged
 *  - type: impossible
 * 3. Scope
 *  - interface: when structured like objects
 *  - type: general. all types can be defined.
 * 4. Class
 *  - interface/type: cna be applied with "implements"
 */

type EventType = "payment_succeeded" | "payment_failed" | "refund";

interface PaymentType {
    type: EventType;
    u: string;
    amt: number;
}

interface WebhookResult {
    ok: boolean;
    msg?: string;
}

async function saveToDb(user: string, amount: number, status: string) {
    console.log("saving...");
}

function notify(user: string, msg: string) {
    console.log("notify", user, msg);
}

const handlers: Record<EventType, (ev: PaymentType) => Promise<WebhookResult>> = {
    payment_succeeded: async (ev) => {
        await saveToDb(ev.u, ev.amt, "success");
        notify(ev.u, "Payment successful!");
        return {ok: true};
    },
    payment_failed: async (ev) => {
        await saveToDb(ev.u, ev.amt, "failed");
        notify(ev.u, "Payment failed...");
        return {ok: true}
    },
    refund: async (ev) => {
        await saveToDb(ev.u, ev.amt, "refund");
        notify(ev.u, "Refund processed");
        return {ok: true};
    }
}

export async function processWebhook(event: PaymentType) {
    const handler = handlers[event.type];
    if (!handler) {
        return {
            ok: false,
            msg: "unknown event type",
        }
    }
    return handler(event);
}


// export async function processWebhook(event: any) {
//   if (event.type === "payment_succeeded") {
//     await saveToDb(event.u, event.amt, "success");
//     notify(event.u, "Payment successful!");
//     return { ok: true };
//   }

//   if (event.type === "payment_failed") {
//     await saveToDb(event.u, event.amt, "fail");
//     notify(event.u, "Payment failed...");
//     return { ok: true };
//   }

//   if (event.type === "refund") {
//     await saveToDb(event.u, event.amt, "refund");
//     notify(event.u, "Refund processed");
//     return { ok: true };
//   }

//   console.log("unknown");
//   return { ok: false };
// }

// async function saveToDb(u: any, a: any, s: any) {
//   console.log("saving...");
// }

// function notify(user: any, msg: any) {
//   console.log("notify", user, msg);
// }
