function ListofPlayers() {

    const players = [
        "Virat Kohli",
        "Rohit Sharma",
        "MS Dhoni",
        "Hardik Pandya",
        "Jasprit Bumrah"
    ];

    return (
        <div>
            <h1>Indian Cricket Players</h1>

            <ul>
                {
                    players.map((player, index) => (
                        <li key={index}>
                            {player}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default ListofPlayers;