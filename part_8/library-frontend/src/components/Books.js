import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result?.data?.allBooks || []

  console.log(books.length);

  return (
    <div>
      <h2>books</h2>

      { books.length > 0
        ?
        <table>
          <tbody>
          <tr>
            <th>Name</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author?.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
          </tbody>
        </table>
        :
        <p>No data</p>
      }




    </div>
  )
}

export default Books
