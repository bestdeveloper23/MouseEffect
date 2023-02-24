import logo from './logo.svg';
import './App.css';
import { Canvas } from 'react-three-fiber';
import NoiseEffect from './mouseeffect';

function App() {
  return (
    <div className="App">
      <section className='App-header'>
        <Canvas>
          <NoiseEffect posotion={[-1.2,0,0]}/>
          {/* <Cylinder3d posotion={[1.2,0,0]}/> */}
          <pointLight position={[10, 10, 10]} />
          <ambientLight />
        </Canvas>

      </section>
    </div>
  );
}

export default App;
