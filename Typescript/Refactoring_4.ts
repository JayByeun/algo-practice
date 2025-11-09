type User = {
    role?: "admin" | "tester";
    age?: number;
    subscription?: string;
    region?: string;
    locale?: string;
}

type FlagType = "beta-dashboard" | "new-audio-engine" | "promo-banner";

type Rule = (u: User) => boolean;

const rules: Record<FlagType, Rule[]> = {
    "beta-dashboard": [
        (u) => u.role === "admin",
        (u) => u.role === "tester",
        (u) => (u.age ?? 0) > 25,
    ],
    "new-audio-engine": [
        (u) => u.subscription === "premium",
    ],
    "promo-banner": [
        (u) => u.region === "us",
        (u) => u.locale === "en",
    ]
}

export function isFeatureEnabled(flag: FlagType, user:User) {
    const flagRules = rules[flag];
    if (!flagRules) {
        return false;
    }
    return flagRules.some((rule) => rule(user));
}


// export function isFeatureEnabled(flag: string, user: any) {
//   if (flag === "beta-dashboard") {
//     if (user.role === "admin") return true;
//     if (user.role === "tester") return true;
//     if (user.age && user.age > 25) return true;
//     return false;
//   }

//   if (flag === "new-audio-engine") {
//     if (user.subscription === "premium") return true;
//     return false;
//   }

//   if (flag === "promo-banner") {
//     if (user.region && user.region === "us") return true;
//     if (user.locale && user.locale === "en") return true;
//     return false;
//   }

//   return false;
// }