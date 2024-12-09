import { NavigateFunction } from 'react-router-dom'

// Global object to hold the navigate function, allowing navigation from anywhere in the application

const globalRouter = { navigate: null } as {
  navigate: NavigateFunction | null
}

export default globalRouter
