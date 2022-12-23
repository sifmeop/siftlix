export const handlerData = (data: string): string => {
  if (data) {
    return new Intl.DateTimeFormat('ru-RU').format(new Date(data))
  } else {
    return '-'
  }
}
