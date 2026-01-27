import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleLikeBtn, deleteComment} = props
  const {id, name, comment, isLiked, initialClassName, date} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likeTextClassName = isLiked ? 'button active' : 'button'
  const likeBtn = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const onClickLikeBtn = () => {
    toggleLikeBtn(id)
  }
  const onDelete = () => {
    deleteComment(id)
  }

  return (
    <li className="list-item">
      <div className="profile-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="username-time-container">
            <p className="name">{name}</p>
            <p className="date">{date} ago</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="icons-container">
        <div className="like-container">
          <img src={likeBtn} alt="like" className="like-img" />
          <button
            type="button"
            className={likeTextClassName}
            onClick={onClickLikeBtn}
          >
            Like
          </button>
        </div>
        <button
          type="button"
          className="button"
          onClick={onDelete}
          data-testid="delete"
        >
          <img
            className="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="hr-line" />
    </li>
  )
}
export default CommentItem
