import Blog from './Blog';

const BlogList = ({ blogs, updateBlogs, user}) => {

  return (
    <div >
      {
        blogs
          .sort((a,b) => b.likes - a.likes)
          .map(blog => <Blog key={blog.id} blog={blog} blogs={blogs} updateBlogs={updateBlogs} user={user} />)
      }
    </div>
  )
}

export default BlogList
