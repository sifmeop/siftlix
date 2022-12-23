export const checkTypeMedia = (media: string) => {
  console.log(media)
  switch (media) {
    case 'movie':
      return 'movie'
    case 'tv':
      return 'tv'
  }
}
