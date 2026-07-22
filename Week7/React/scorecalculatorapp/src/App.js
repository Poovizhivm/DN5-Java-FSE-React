import CalculateScore from './CalculateScore';

function App() {
  return (
    <div>
      <CalculateScore
        name="Poovizhi"
        school="ABC School"
        mark1={85}
        mark2={90}
        mark3={95}
      />
    </div>
  );
}

export default App;