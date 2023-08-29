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

  get(url: string, config?: RequestInit) {
    return fetch(this.baseUrl + url, {
      method: 'GET',
      ...this.config,
      ...config,
    })
  }

  put(url: string, data: { [key: string]: any }, config?: RequestInit) {
    return fetch(this.baseUrl + url, {
      method: 'PUT',
      body: typeof data === 'object' ? JSON.stringify(data) : data,
      ...this.config,
      ...config,
    })
  }

  patch(url: string, data: { [key: string]: any }, config?: RequestInit) {
    return fetch(this.baseUrl + url, {
      method: 'PATCH',
      body: typeof data === 'object' ? JSON.stringify(data) : data,
      ...this.config,
      ...config,
    })
  }

  post(url: string, data: { [key: string]: any }, config?: RequestInit) {
    return fetch(this.baseUrl + url, {
      method: 'POST',
      body: typeof data === 'object' ? JSON.stringify(data) : data,
      ...this.config,
      ...config,
    })
  }

  delete(url: string, config?: RequestInit) {
    return fetch(this.baseUrl + url, {
      method: 'DELETE',
      ...this.config,
      ...config,
    })
  }
}
