export function mergeResTemplate({
  code = 200,
  message = 'success',
  data = null,
}: {
  code?: number;
  message?: string;
  data?: null | unknown;
}) {
  return {
    data,
    message,
    code,
  };
}
