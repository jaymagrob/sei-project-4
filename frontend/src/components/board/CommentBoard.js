import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'
import axios from 'axios'

const CommentBoard = ({modal, handleChangeComment, comment, comments, handleModal, handleDelete, handleAddComment} = this.props) => (
    
  <div className={`modal ${modal ? 'is-active' : null}`}>
    <div className="modal-background"></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Project Comments</p>
        <button onClick={handleModal} className="delete" aria-label="close"></button>
      </header>
      <section className="modal-card-body">
        {comments.map(comment => (
              <article key={comment.id} className="media">
              <div className="media-content">
                <div className="content">
                  <p className="has-text-black">
                    <strong>{comment.owner.name}</strong>
                    <br/>
                    {comment.comment}
                  </p>
                </div>
                  
              </div>
              <div className="media-right">
                <button
                  onClick={handleDelete}
                  id={comment.id}
                  className="delete">                
                </button>
              </div>
            </article>
        ))}

        <article class="media">          
          <div class="media-content">
            <form
              onSubmit={handleAddComment}
            >
            <div class="field">
              <p class="control">
                <textarea
                  class="textarea"
                  value={comment}
                  onChange={handleChangeComment}>
                  ></textarea>
              </p>
            </div>
            <nav class="level">
              <div class="level-left">
                <div class="level-item">
                  <button class="button is-info">Submit</button>
                </div>
              </div>                          
            </nav>
            </form>
          </div>
        </article>
        




      </section>
      <footer className="modal-card-foot">
        <button onClick={handleModal} className="button">Close</button>
      </footer>
    </div>
  </div>
    )
export default CommentBoard