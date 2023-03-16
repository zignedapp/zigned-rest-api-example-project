import { Link, useNavigate, Links } from "@remix-run/react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import EmailIcon from "~/components/mail-icon";
import ThankYouRouteStyles from "~/styles/thank-you-page.css";
export function links() {
  return [{ rel: "stylesheet", href: ThankYouRouteStyles }];
}

export default function ThankYou() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 30000);
  }, []);

  return (
    <motion.div
      className="flex flex-column thank-you-wrapper"
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
    >
      <motion.div
        variants={framerVariants(1, 300)}
        transition={framerTransition(1)}
        className="flex flex-column"
        style={{
          width: "6rem",
          marginBottom: "3rem",
        }}
      >
        <EmailIcon strokeWidth={12} duration={2.5} />
      </motion.div>
      <motion.h1
        variants={framerVariants(1, 300)}
        transition={framerTransition(1)}
      >
        Kolla din inkorg
      </motion.h1>
      <motion.ol
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
      >
        <motion.li
          key="first-point"
          variants={framerVariants(1, 300)}
          transition={framerTransition(1)}
        >
          <span className="number">1</span>
          <span>Öppna mailet från Zigned</span>
        </motion.li>
        <motion.li
          variants={framerVariants(1, 300)}
          transition={framerTransition(1)}
          key="second-point"
        >
          <span className="number">2</span>
          <span>Klicka på länken för att besöka signeringsrummet</span>
        </motion.li>
        <motion.li
          key="third-point"
          variants={framerVariants(1, 300)}
          transition={framerTransition(1)}
        >
          <span className="number">3</span>
          <span>Signera din gissning med Mobilt BankID</span>
        </motion.li>
        <motion.li
          key="fourth-point"
          className="last-point"
          variants={framerVariants(1, 300)}
          transition={framerTransition(1)}
        >
          <motion.span
            className="zigned-pro-api-notice"
            variants={framerVariants(1, 300)}
            transition={framerTransition(1)}
          >
            Du har nu testat Zigned Pro API
          </motion.span>
          <motion.div
            className="back-to-start"
            variants={framerVariants(1, 300)}
            transition={framerTransition(1)}
          >
            <Link to="/">Tillbaka till start</Link>
          </motion.div>
        </motion.li>
      </motion.ol>
    </motion.div>
  );
}

const framerVariants = (dir: number = 1, distance: number = 100) => {
  return {
    initial: { opacity: 0, y: distance * dir },
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

const framerTransition = (duration: number = 2) => {
  return { duration, type: "spring" };
};
