import { useState } from 'react'

const Blog = ({blog}) => {
  const [visible, toggleVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button
          onClick={() => toggleVisible(!visible)}
          style={{marginLeft: '10px'}}
          type="button"
        >{visible ? 'Hide' : 'View'}</button>
      </div>
      {visible &&
        <div>
          <span>{blog.url}</span>
          <div>
            <span>likes {blog.likes}</span>
            <button type="button" style={{marginLeft: '10px'}}>Like</button>
          </div>
          <span>{blog.author}</span>
        </div>
      }
    </div>
  )
}

export default Blog
