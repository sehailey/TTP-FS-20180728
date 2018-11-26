import React from 'react'
import { Navbar, Footer } from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main role="main" className="container">
        <Routes />
      </main>
      <footer className="footer bg-dark">
        <Footer />
      </footer>
    </div>
  )
}

export default App
