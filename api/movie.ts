import axios from 'axios'
import { VercelRequest, VercelResponse } from '@vercel/node'

const { API_END_POINT, API_KEY } = process.env

interface RequestBody {
  movieName: string
  page: number
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  id: string
  plot: 'short' | 'full'
}

export default async function (req: VercelRequest, res: VercelResponse) {
  const requestBody: Partial<RequestBody> = req.body || {}
  const {
    movieName = '',
    page = 1,
    method = 'GET',
    id = '',
    plot = ''
  } = requestBody

  try {
    const { data: responseValue } = await axios({
      url: `${API_END_POINT}?apikey=${API_KEY}&${
        movieName !== ''
          ? `${'s=' + movieName}&${'page=' + page}`
          : `${'i=' + id}&${'plot=' + plot}`
      }
      `,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    res.status(200).json(responseValue)
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in serverless API:', error.message)
      res.status(500).json({ error: '서버리스 API 오류!' })
    }
  }
}
