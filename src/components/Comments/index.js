import {Component} from 'react'

import './index.css'

import {v4 as uuidv4} from 'uuid'

import {formatDistanceToNow} from 'date-fns'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {commentsList: [], name: '', comment: '', commentsCount: 0}

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment, commentsList} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: uuidv4(),
      name,
      comment,
      date: formatDistanceToNow(new Date()),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))

    this.setState(prevState => ({commentsCount: prevState.commentsCount + 1}))
  }

  toggleLikeBtn = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(each => {
        if (id === each.id) {
          return {...each, isLiked: !each.isLiked}
        }
        return each
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    const filterComments = commentsList.filter(each => each.id !== id)
    this.setState({commentsList: filterComments})
    this.setState(prevState => ({commentsCount: prevState.commentsCount - 1}))
  }

  render() {
    const {name, comment, commentsList, commentsCount} = this.state
    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="heading">Comments</h1>
          <div className="inputs-container">
            <form onSubmit={this.onAddComment} className="form-container">
              <p className="description">
                Say something about 4.0 Technologies
              </p>
              <input
                className="name-input"
                type="text"
                value={name}
                onChange={this.onChangeName}
                placeholder="Your Name"
              />
              <textarea
                className="textarea-comment"
                placeholder="Your Comment"
                value={comment}
                onChange={this.onChangeComment}
                rows="6"
                cols="60"
              />
              <button className="add-comment-btn" type="submit">
                Add Comment
              </button>
            </form>
            <img
              className="comments-img"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
          <hr className="hr-line" />
          <div className="comments-count-container">
            <p className="comments-count">{commentsCount}</p>
            <p className="comments">comments</p>
          </div>
          <ul className="comments-unorder-list">
            {commentsList.map(each => (
              <CommentItem
                commentDetails={each}
                key={each.id}
                deleteComment={this.deleteComment}
                toggleLikeBtn={this.toggleLikeBtn}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Comments
