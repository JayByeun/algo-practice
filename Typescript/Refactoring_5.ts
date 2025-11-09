type ApiName = "google" | "apple" | "github";

interface NormalizedUser {
    name: string;
    email: string;
    picture: null | string;
    ok: boolean;
}

type GoogleData = NormalizedUser;
type AppleData = {
    fullName: string;
    mail: string;
    ok: boolean;
}
type GithubData = {
    u: string;
    m: string;
    avatar: string;
    ok: boolean;
}

const normalizer = {
    google: (d: GoogleData) => d,
    apple: (d: AppleData) => ({
        name: d.fullName,
        email: d.mail,
        pic: null,
        ok: true,
    }),
    github: (d: GithubData) => ({
        name: d.u,
        email: d.m,
        pic: d.avatar ?? null,
        ok: true,
    })
}

type Provider =  keyof typeof normalizer;

export async function normalizeResponse(provider: Provider, data: GoogleData | AppleData | GithubData) {
    const handler = normalizer[provider];
    if (!handler) {
        return {ok: false};
    }
    return handler(data as any);
}

// export async function normalizeResponse(apiName: string, data: any) {
//   if (apiName === "google") {
//     return {
//       name: data.n,
//       email: data.e,
//       picture: data.p,
//       ok: true
//     };
//   }

//   if (apiName === "apple") {
//     return {
//       name: data.fullName,
//       email: data.mail,
//       picture: null,
//       ok: true
//     };
//   }

//   if (apiName === "github") {
//     let pic;
//     if (data.avatar) pic = data.avatar;
//     else pic = null;

//     return {
//       name: data.u,
//       email: data.m,
//       picture: pic,
//       ok: true
//     };
//   }

//   return { ok: false };
// }