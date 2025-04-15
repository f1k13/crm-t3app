export function phoneMask(value: string): string {
  let cleanValue = value.replace(/\D/g, "");

  if (cleanValue.length > 11) {
    cleanValue = cleanValue.slice(0, 11);
  }

  if (cleanValue.length === 0) return "";

  if (cleanValue.length === 1) {
    return `+7 ${cleanValue}`;
  } else if (cleanValue.length <= 4) {
    return `+7 (${cleanValue.slice(1)}`;
  } else if (cleanValue.length <= 7) {
    return `+7 (${cleanValue.slice(1, 4)}) ${cleanValue.slice(4)}`;
  } else {
    return `+7 (${cleanValue.slice(1, 4)}) ${cleanValue.slice(
      4,
      7,
    )}-${cleanValue.slice(7, 9)}-${cleanValue.slice(9, 11)}`;
  }
}
