import axios from 'axios'

import { API_KEY } from './config.js'

axios.defaults.headers.common['Authorization'] = `Token ${API_KEY}` // for all requests


var requests = {
  pullWorkouts: `https://wger.de/api/v2/exerciseinfo/?limit=500`
}

export default requests;