import { Link, useOutlet, useLocation } from "@remix-run/react";
import GuessRoutesStyles from "~/styles/guess-routes-layout.css";
import ZignedLogo from "~/components/ZignedLogo";
import { motion, AnimatePresence } from "framer-motion";

export function links() {
  return [{ rel: "stylesheet", href: GuessRoutesStyles }];
}

export default function GuessLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  return (
    <motion.div
      style={{ height: "100%", width: "100%" }}
      className="flex flex-column align-items-center justify-content-center"
    >
      <header
        className="guess-routes-header"
        style={{ position: "absolute", top: 0, left: 0, right: 0 }}
      >
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            initial: { opacity: 0, y: 100 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -50 },
          }}
          transition={{ duration: 2, type: "spring" }}
          className="flex align-items-center justify-content-center"
          style={{ width: "100%", height: "100%" }}
        >
          <Link to={"/"} style={{ height: "2rem" }}>
            <ZignedLogo />
          </Link>
        </motion.div>
      </header>
      <AnimatePresence exitBeforeEnter>
        <motion.main
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.2,
            type: "spring",
            staggerChildren: 0.1,
          }}
          className="guess-routes-main"
        >
          {outlet}
        </motion.main>
      </AnimatePresence>
    </motion.div>
  );
}
