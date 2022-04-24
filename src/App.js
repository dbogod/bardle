import useBardle from './hooks/useBardle';
import './App.scss';

const App = () => {
  const { gameNumber, solution } = useBardle();
  return (
    <>
      <h1>Bardle</h1>
      <p>
        This is game number {gameNumber}
      </p>
      <p>
        The solution is {solution}
      </p>
    </>
  );
};

export default App;
