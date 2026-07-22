import BookDetails from "./BookDetails";
import BlogDetails from "./BlogDetails";
import CourseDetails from "./CourseDetails";

function App() {

  const showBooks = true;
  const showBlogs = true;
  const showCourses = true;

  return (
    <div>

      <h1>Blogger App</h1>

      {showBooks && <BookDetails />}

      <hr />

      {showBlogs && <BlogDetails />}

      <hr />

      {showCourses && <CourseDetails />}

    </div>
  );
}

export default App;