/**
 * Serviço de API
 * Configuração base para requisições HTTP
 */

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = 'https://api.sosmanutenção.com') {
    this.baseURL = baseURL;
  }

  /**
   * Realizar uma chamada GET
   */
  async get(endpoint: string, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        ...options,
      });
      return await response.json();
    } catch (error) {
      console.error('GET Error:', error);
      throw error;
    }
  }

  /**
   * Realizar uma chamada POST
   */
  async post(endpoint: string, data?: any, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      });
      return await response.json();
    } catch (error) {
      console.error('POST Error:', error);
      throw error;
    }
  }

  /**
   * Realizar uma chamada PUT
   */
  async put(endpoint: string, data?: any, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      });
      return await response.json();
    } catch (error) {
      console.error('PUT Error:', error);
      throw error;
    }
  }

  /**
   * Realizar uma chamada DELETE
   */
  async delete(endpoint: string, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        ...options,
      });
      return await response.json();
    } catch (error) {
      console.error('DELETE Error:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
