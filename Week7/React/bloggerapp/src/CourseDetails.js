function CourseDetails() {

  const courses = [
    "React",
    "Angular",
    "Spring Boot"
  ];

  return (
    <div>
      <h2>Course Details</h2>

      <ul>
        {courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </div>
  );
}

export default CourseDetails;