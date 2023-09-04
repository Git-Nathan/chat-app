export class Fetch {
  private config?: RequestInit
  private baseUrl: string

  constructor(baseUrl: string, config?: RequestInit) {
    if (config) {
      this.config = config
    }
    this.baseUrl = baseUrl
  }

  static create(baseUrl: string, config?: RequestInit) {
    return new Fetch(baseUrl, config)
  }

  async get(url: string, config?: RequestInit) {
    const response = await fetch(this.baseUrl + url, {
      method: 'GET',
      ...this.config,
      ...config,
    })
    return response.json()
  }

  async put(url: string, data: { [key: string]: any }, config?: RequestInit) {
    const response = await fetch(this.baseUrl + url, {
      method: 'PUT',
      body: typeof data === 'object' ? JSON.stringify(data) : data,
      ...this.config,
      ...config,
    })
    return response.json()
  }

  async patch(url: string, data: { [key: string]: any }, config?: RequestInit) {
    const response = await fetch(this.baseUrl + url, {
      method: 'PATCH',
      body: typeof data === 'object' ? JSON.stringify(data) : data,
      ...this.config,
      ...config,
    })
    return response.json()
  }

  async post(url: string, data: { [key: string]: any }, config?: RequestInit) {
    const response = await fetch(this.baseUrl + url, {
      method: 'POST',
      body: typeof data === 'object' ? JSON.stringify(data) : data,
      ...this.config,
      ...config,
    })
    return response.json()
  }

  postRes(url: string, data: { [key: string]: any }, config?: RequestInit) {
    return fetch(this.baseUrl + url, {
      method: 'POST',
      body: typeof data === 'object' ? JSON.stringify(data) : data,
      ...this.config,
      ...config,
    })
  }

  async delete(url: string, config?: RequestInit) {
    const response = await fetch(this.baseUrl + url, {
      method: 'DELETE',
      ...this.config,
      ...config,
    })
    return response.json()
  }
}
