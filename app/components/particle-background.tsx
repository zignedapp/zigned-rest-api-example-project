import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Engine } from "tsparticles-engine";
import { dots, stars } from "~/utils/particles";

function Particle() {
  const customInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  return <Particles init={customInit} options={dots} />;
}

export default Particle;
