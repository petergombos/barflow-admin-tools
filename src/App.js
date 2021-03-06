import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

import MeasureView from './components/Measure/MeasureView'
import SelectorView from './components/Selector/SelectorView'
import TypeView from './components/Type/TypeView'
import LeadsView from './components/Leads/LeadsView'

import './App.css'

const apiUrl = 'https://api.barflow.io/v1'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: localStorage.getItem('token') || '',
      show: 'leads'
    }
    this.login = this.login.bind(this)
  }

  login () {
    const req = new Request(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.state.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    return fetch(req)
      .then((res) => res.json())
      .then(json => {
        this.setState({
          token: json.token
        })
        localStorage.setItem('token', json.token)
      })
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href='#'>BarFlow - Admin</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem onClick={() => this.setState({ show: 'leads' })}>Leads</NavItem>
                <NavItem onClick={() => this.setState({ show: 'measure' })}>Measure</NavItem>
                <NavItem onClick={() => this.setState({ show: 'selector' })}>Selector</NavItem>
                <NavItem onClick={() => this.setState({ show: 'type' })}>Types</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          {!this.state.token &&
            <div>
              <input type='text' onChange={(e) => this.setState({
                email: e.currentTarget.value
              })} />
              <input type='password' onChange={(e) => this.setState({
                password: e.currentTarget.value
              })} />
              <button onClick={this.login}>Log-in</button>
            </div>
          }
          {this.state.token && this.state.show === 'measure' &&
            <MeasureView token={this.state.token} />
          }
          {this.state.token && this.state.show === 'selector' &&
            <SelectorView token={this.state.token} />
          }
          {this.state.token && this.state.show === 'type' &&
            <TypeView token={this.state.token} />
          }
          {this.state.token && this.state.show === 'leads' &&
            <LeadsView token={this.state.token} />
          }
        </div>
      </div>
    )
  }
}

export default App
