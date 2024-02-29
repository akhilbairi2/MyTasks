import './index.css'

const TagItem = props => {
  const {tagDetails, onTagBtn, isActive} = props
  const {displayText, optionId} = tagDetails
  const onTag = () => {
    onTagBtn(optionId)
  }
  const btnStyle = isActive ? 'btn1' : ''
  return (
    <li>
      <button type="button" className={`btn ${btnStyle}`} onClick={onTag}>
        {displayText}
      </button>
    </li>
  )
}
export default TagItem
