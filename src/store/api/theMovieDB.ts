import { IPersonDetails } from 'models/personDetails.interface'
import { ICast, ICastResponse, ICastResponseCard } from 'models/cast.interface'
import { IVideo, IVideoResponse } from 'models/video.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IDetails } from 'models/details.interface'
import { IGenres, IGenresResponse } from 'models/genre.interface'
import { IMovieCard, IMovieResponse } from 'models/movie.interface'
import { MOVIE_API_KEY, MOVIE_URL } from 'utils/constants'
import { ISearch, ISearchResponse } from 'models/search.interface'

export const theMovieDB = createApi({
  reducerPath: 'theMovieDB',
  baseQuery: fetchBaseQuery({
    baseUrl: MOVIE_URL
  }),
  endpoints: (build) => ({
    // search
    getSearch: build.query<ISearch[], { search: string; lang: string | undefined }>({
      query: ({ search, lang }) => ({
        url: `/search/multi?api_key=${MOVIE_API_KEY}&query=${search}&language=${lang}`
      }),
      transformResponse: (response: ISearchResponse<ISearch>) => response.results
    }),
    // genres list
    getGenresList: build.query<IGenres[], { media: string; lang: string | undefined }>({
      query: ({ media, lang }) => ({
        url: `/genre/${media}/list?api_key=${MOVIE_API_KEY}&language=${lang}`
      }),
      transformResponse: (response: IGenresResponse<IGenres>) => response.genres
    }),
    // popular
    getPopular: build.query<IMovieCard[], { media: string; lang: string | undefined }>({
      query: ({ media, lang }) => ({
        url: `/${media}/popular?api_key=${MOVIE_API_KEY}&language=${lang}`
      }),
      transformResponse: (response: IMovieResponse<IMovieCard>) => response.results
    }),
    // trend
    getTrending: build.query<IMovieCard[], { media: string; lang: string | undefined }>({
      query: ({ media, lang }) => ({
        url: `/trending/${media}/week?api_key=${MOVIE_API_KEY}&language=${lang}`
      }),
      transformResponse: (response: IMovieResponse<IMovieCard>) => response.results
    }),
    // // upcoming
    getUpcomingMovie: build.query<IMovieCard[], string | undefined>({
      query: (lang) => ({
        url: `/movie/upcoming?api_key=${MOVIE_API_KEY}&language=${lang}`
      }),
      transformResponse: (response: IMovieResponse<IMovieCard>) => response.results
    }),
    // details
    getDetailsMovie: build.query<IDetails, { id: string | string[] | undefined; lang: string | undefined }>({
      query: ({ id, lang }) => ({
        url: `/movie/${id}?api_key=${MOVIE_API_KEY}&language=${lang}`
      })
    }),
    getDetailsTV: build.query<IDetails, { id: string | string[] | undefined; lang: string | undefined }>({
      query: ({ id, lang }) => ({
        url: `/tv/${id}?api_key=${MOVIE_API_KEY}&language=${lang}`
      })
    }),
    // video
    getVideo: build.query<IVideo[], { media: string; id: string }>({
      query: ({ media, id }) => ({
        url: `/${media}/${id}/videos?api_key=${MOVIE_API_KEY}`
      }),
      transformResponse: (response: IVideoResponse<IVideo>) => response.results
    }),
    // // recommendations
    getRecommendations: build.query<IMovieCard[], { media: string; id: string; lang: string | undefined }>({
      query: ({ media, id, lang }) => ({
        url: `/${media}/${id}/recommendations?api_key=${MOVIE_API_KEY}&language=${lang}`
      }),
      transformResponse: (response: IMovieResponse<IMovieCard>) => response.results
    }),
    // credits
    getCredits: build.query<ICast[], { media: string; id: string }>({
      query: ({ media, id }) => ({
        url: `/${media}/${id}/credits?api_key=${MOVIE_API_KEY}`
      }),
      transformResponse: (response: ICastResponse<ICast>) => response.cast
    }),
    // person details
    getPersonDetails: build.query<IPersonDetails, { id: string; lang: string | undefined }>({
      query: ({ id, lang }) => ({
        url: `/person/${id}?api_key=${MOVIE_API_KEY}&language=${lang}`
      })
    }),
    // person movies
    getPersonFilmography: build.query<IMovieCard[], { media: string; id: string; lang: string | undefined }>({
      query: ({ media, id, lang }) => ({
        url: `/person/${id}/${media}_credits?api_key=${MOVIE_API_KEY}&language=${lang}`
      }),
      transformResponse: (response: ICastResponseCard<IMovieCard>) => response.cast
    }),
    // movie/tv genres list
    getDiscoverList: build.query<
      IMovieCard[],
      { media: string; id: string | string[] | undefined; lang: string | undefined }
    >({
      query: ({ media, id, lang }) => ({
        url: `/discover/${media}?api_key=${MOVIE_API_KEY}&with_genres=${id}&language=${lang}`
      }),
      transformResponse: (response: IMovieResponse<IMovieCard>) => response.results
    })
  })
})

export const {
  useGetGenresListQuery,
  useGetSearchQuery,
  useGetPopularQuery,
  useGetTrendingQuery,
  useGetUpcomingMovieQuery,
  useGetDetailsMovieQuery,
  useGetDetailsTVQuery,
  useGetVideoQuery,
  useGetRecommendationsQuery,
  useGetCreditsQuery,
  useGetPersonDetailsQuery,
  useGetPersonFilmographyQuery,
  useGetDiscoverListQuery
} = theMovieDB
