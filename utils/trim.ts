export function trim(str: string, chars?: string): string {
  if (chars === undefined) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  }

  const escaped = chars.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
  const regex = new RegExp(`^[${escaped}]+|[${escaped}]+$`, "g");
  return str.replace(regex, "");
}
