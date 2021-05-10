import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'

import { Home, Products, SingleProduct, About, Cart, Error, Checkout, PrivateRoute } from './pages'
import AuthWrapper from './pages/AuthWrapper'
function App() {
  return (
    <>
      <AuthWrapper>
        <Router>
          <Navbar />
          <Sidebar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/products' component={Products} />

            <PrivateRoute exact path='/checkout'>
              <Checkout />
            </PrivateRoute>
            <Route exact path='/products/:id' children={<SingleProduct />} />
            <Route path='*' component={Error} />
          </Switch>
          <Footer />
        </Router>
      </AuthWrapper>
    </>
  )


}

export default App
