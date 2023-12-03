import axios from 'axios'

const API_END_POINT = import.meta.env.VITE_API_END_POINT
const API_KEY = import.meta.env.VITE_API_KEY

interface RequestBody {
  movieName: string
  page: number
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  id: string
  plot: 'short' | 'full'
}

export const request = async (req: Partial<RequestBody>) => {
  const { movieName = '', page = 1, method = 'GET', id = '', plot = '' } = req

  try {
    const { data: responseValue } = await axios({
      url: `${API_END_POINT}?apikey=${API_KEY}&${
        movieName.length
          ? `${'s=' + movieName}&${'page=' + page}`
          : `${'i=' + id}&${'plot=' + plot}`
      }
      `,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return responseValue
  } catch (e) {
    throw new Error('API 오류')
  }
}
