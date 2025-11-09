const SCRIPTPATTERN = /<script.*?>.*?<\/script>/gi;
const STYLEPATTERN = /<style.*?>.*?<\/style>/gi;
const TAGSPATTERN = /<[^>]+>/g;
const MAX_LENGTH = 500;

const sanitize = (input: string) => {
    let result = "";
    result = input.replace(SCRIPTPATTERN, "");
    result = input.replace(STYLEPATTERN, "");
    result = input.replace(TAGSPATTERN, "");

    return result.trim();
}

export function parseHtml(input: string) {
    const replaced = sanitize(input);
    return replaced.length > MAX_LENGTH ? replaced.substring(0, MAX_LENGTH) : replaced;
}

// export function parseHtml(input: any) {
//   let cleaned = input.replace(/<script.*?>.*?<\/script>/gi, "");
//   cleaned = cleaned.replace(/<style.*?>.*?<\/style>/gi, "");
//   cleaned = cleaned.replace(/<[^>]+>/g, "");

//   cleaned = cleaned.trim();

//   if (cleaned.length > 500) {
//     return cleaned.substring(0, 500);
//   }

//   return cleaned;
// }