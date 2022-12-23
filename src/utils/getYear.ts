export const getYear = (data: string | undefined): string => {
  return data ? data.split('-')[0] : ''
}
