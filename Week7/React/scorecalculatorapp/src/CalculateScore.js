function CalculateScore(props) {

    const average =
        (props.mark1 +
         props.mark2 +
         props.mark3) / 3;

    return (
        <div>
            <h1>Student Details</h1>

            <h3>Name : {props.name}</h3>
            <h3>School : {props.school}</h3>

            <h2>Total Marks :
                {props.mark1 +
                 props.mark2 +
                 props.mark3}
            </h2>

            <h2>Average : {average}</h2>
        </div>
    );
}

export default CalculateScore;