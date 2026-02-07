import {Link} from 'react-router-dom'

function BlogCard({
     title, content, author, createdAt, updatedAt, status, category, slug,
}) {
  return (
    <div className='border px-4 py-1 my-4 rounded relative shadow-md'>
      <h2>{title}</h2>                
        <div className='flex items-center gap-4 my-2'>
          <span className='flex items-center justify-center font-semibold w-12.5 h-12.5 bg-blue-300 rounded-full text-white text-2xl '>
            {author.name.substring(0,1)}
          </span>{" "}
          <div>
            <p>{author.name}</p>
            <p>{author.email}</p>
          </div>
        </div>
      <p className='text-sm mt-2'>Published On: {new Date(createdAt).toLocaleDateString()}</p>
      <span className='absolute top-1 right-1 bg-gray-200 px-2 py-1 rounded text-xs font-semibold'>{category}</span>

      {status === "draft" && (
        <span className='absolute top-1 right-26 bg-yellow-300 text-red-500 px-2 py-1 rounded text-xs font-semibold'>Draft</span>
      )}

      {status === "Published" ? (
        <Link className='bg-gray-400 cursor-pointer text-white px-3 py-1 rounded font-semibold absolute bottom-2 right-2' 
          to = {`/blog/${slug}`}>
          Read More
        </Link>
      ): (
        <Link className='bg-gray-400 cursor-pointer text-white px-3 py-1 rounded font-semibold absolute bottom-2 right-2' 
          to = {`/edit/${slug}`}>
          Edit
        </Link>
      )}
        
    </div>
  )
}

export default BlogCard
