import ZignedLogo from "~/components/ZignedLogo";
import Particles from "~/components/particle-background";
import BigButton from "~/components/big-button";
import { motion } from "framer-motion";
import { MdArrowForward } from "react-icons/md";

export default function Index() {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: {
          opacity: 0,
          transition: {
            duration: 0.5,
            type: "spring",
            staggerChildren: 0.1,
          },
        },
      }}
      transition={{
        duration: 1,
        type: "spring",
        staggerChildren: 0.1,
      }}
      style={{
        background:
          "linear-gradient(154deg, var(--primary-color), rgb(6 9 112))",
        width: "100%",
        height: "100%",
      }}
      className="flex flex-column"
    >
      <motion.header
        variants={framerVariants(300)}
        transition={transition}
        className="index-header"
      >
        <ZignedLogo
          style={{ maxWidth: "10rem", height: "4rem" }}
          iconFill="var(--primary-color)"
          backGroundFill="white"
        />
      </motion.header>
      <main className="index-main">
        <div className="index-titles">
          <motion.h1 variants={framerVariants(200)} transition={transition}>
            Gissa hur många bollar det är i kupolen
          </motion.h1>
          <motion.h2 variants={framerVariants(300)} transition={transition}>
            Vinn Netflix gratis i upp till 6 månader
          </motion.h2>
        </div>
        <motion.div variants={framerVariants(500)} transition={transition}>
          <BigButton to={"/guess"} label={<MdArrowForward />} />
        </motion.div>
      </main>
      <motion.footer
        variants={framerVariants(500)}
        transition={transition}
        className="flex align-items-center justify-content-center"
      >
        <img
          style={{
            maxWidth: 200,
            padding: "3rem 0",
            opacity: 0.8,
          }}
          src="./assets/connect_logo_white.svg"
        />
      </motion.footer>
      <Particles />
    </motion.div>
  );
}

const framerVariants = (distance: number = 100) => {
  return {
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.5,
        type: "spring",
      },
    },
  };
};

const transition = { duration: 2, type: "spring" };
