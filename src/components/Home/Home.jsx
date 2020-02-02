import React, { useEffect, useState } from "react";
import ThreeContainer from "../ThreeContainer/ThreeContainer";
import log from "../../logs/log";
import HomeStyles from "./HomeStyles";
import Graph from "../Graph/Graph";

function Home() {
  const [cords, setCords] = useState({ count: 0, x: 0, y: 0, z: 0 });

  useEffect(() => {
    let count = 0;
    const sto = setInterval(() => {
      count++;
      const c = log[count];
      if (count === 2000 || !c) clearInterval(sto);
      if (c) setCords({ count: count, ...c });
    }, 2);
  }, []);

  return (
    <HomeStyles>
      <div className="grid-container">
        <div className="Header">
          <h1>Hardware Prototype</h1>
        </div>
        <div className="Content">
          <div className="three">
            <ThreeContainer x={cords.x} y={cords.y} z={cords.z} />
          </div>
          <div className="Graphs">
            <Graph count={cords.count} x={cords.x} y={cords.y} z={cords.z} />
          </div>
        </div>
      </div>
    </HomeStyles>
  );
}

export default Home;
