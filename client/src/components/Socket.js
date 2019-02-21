import React, { Component } from 'react'

const url = 'https://ws-api.iextrading.com/1.0/tops'
//Import socket.io with a connection to a channel (i.e. tops)
const socket = require('socket.io-client')(url)
let counter = 0
socket.on('message', message => {
  counter++
  console.log(counter)
  console.log(message)
})
// Connect to the channel
socket.on('connect', () => {
  // Subscribe to topics (i.e. appl,fb,aig+)
  socket.emit('subscribe', 'aapl,googl,ba')
  // Listen to the channel's messages
})

// Disconnect from the channel
socket.on('disconnect', () => console.log('Disconnected.'))

class SockeT extends Component {
  componentWillMount() {
    console.log('COMPONENT WILL MOUNT')
  }

  componentDidMount() {
    console.log('COMPONENT DID MOUNT')
  }

  componentWillUnmount() {
    socket.emit('disconnect')
  }
  render() {
    return (
      <div>
        {' '}
        <button
          type="button"
          onClick={() => {
            console.log('CLICK')
            socket.emit('subcribe', 'aapl,googl,ba')
          }}
        >
          Refresh
        </button>
      </div>
    )
  }
}

socket.connect()
export default SockeT
