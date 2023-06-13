const storage = {
    getToken: () => {
      return JSON.parse(
        window.localStorage.getItem('_auth') as string
      )
    },
    setToken: (token: string) => {
      window.localStorage.setItem(
        '_auth',
        JSON.stringify(token)
      )
    },
    clearToken: () => {
      window.localStorage.removeItem('_auth')
    }
  }
  
  export default storage