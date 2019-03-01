import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'
import Context from '../Context';
import config from '../config';

export default class AddNote extends Component {
  static defaultProps = {
    folders: [],
  };
  
  static contextType = Context;

  state = {
    error: null
  };

  handleSubmit = e => {
    e.preventDefault();
    const {name, modified, folderId, content} = e.target;
    const note = {
      name: name.value,
      modified: modified.value,
      folderId: folderId.value,
      content: content.value
    };
    this.setState({error: null});
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      body: JSON.stringify(note),
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
      modified.value = ''
      folderId.value = ''
      content.value = ''
      this.context.addNote(data)
    })
    .catch(error => {
      this.setState({error})
    })
}

  render() {
    const { folders } = this.props
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' />
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select'>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit' onSubmit={this.handleSubmit}>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
