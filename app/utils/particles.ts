import { RecursivePartial, IOptions } from "tsparticles-engine";

export const stars: RecursivePartial<IOptions> = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: true,
        value_area: 1500,
      },
    },
    line_linked: {
      enable: false,
      opacity: 0.03,
    },
    move: {
      direction: "right",
      speed: 0.05,
    },
    size: {
      value: 1,
    },
    opacity: {
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.05,
      },
    },
  },
  retina_detect: true,
};

export const dots: RecursivePartial<IOptions> = {
  backgroundMode: {
    enable: true,
    zIndex: 0,
  },
  fpsLimit: 60,
  interactivity: {
    detectsOn: "window",
    events: {
      onHover: {
        enable: true,
        mode: "bubble",
        parallax: { enable: false, force: 2, smooth: 10 },
      },
      resize: false,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 0.3,
        opacity: 1,
        size: 4,
      },
      grab: { distance: 400, line_linked: { opacity: 0.5 } },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
      repulse: { distance: 200, duration: 0.4 },
    },
  },
  particles: {
    color: { value: "#fff" },
    links: {
      color: "#ffffff",
      distance: 500,
      enable: false,
      opacity: 0.4,
      width: 2,
    },
    move: {
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
      direction: "none",
      enable: true,
      outMode: "out",
      random: false,
      size: true,
      speed: 0.4,
      straight: false,
    },
    number: { density: { enable: false, area: 800 }, value: 120 },
    opacity: {
      random: true,
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 4,
    },
  },
  detectRetina: true,
};
