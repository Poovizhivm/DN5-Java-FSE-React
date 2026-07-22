function App() {

  const office = {
    name: "Regus Office",
    rent: 65000,
    address: "Chennai"
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Office Space Rental App</h1>

      <h2>Name : {office.name}</h2>

      <h2 style={{
        color: office.rent < 60000 ? "red" : "green"
      }}>
        Rent : {office.rent}
      </h2>

      <h2>Address : {office.address}</h2>

    </div>
  );
}

export default App;