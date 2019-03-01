import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddFolder.css'
import Context from '../Context';
import config from '../config';

export default class AddFolder extends Component {
  static contextType = Context;

  state = {
    error: null
  };

  handleSubmit = e => {
    e.preventDefault();
    const {name} = e.target; //what about id
    const folder = {name: name.value};
    this.setState({error: null});
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      body: JSON.stringify(folder),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if(!res.ok){
          return res.json().then(error => {
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        name.value = ''
        this.context.addFolder(data)
      })
      .catch(error => {
        this.setState({error})
      })
  }
  
  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' />
          </div>
          <div className='buttons'>
            <button type='submit' onSubmit={this.handleSubmit}>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
