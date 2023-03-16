import { motion, useMotionValue, useTransform, Variants } from "framer-motion";

interface IMailIconProps {
  strokeWidth?: number;
  duration?: number;
}

export default function MailIconAnimated({
  strokeWidth = 10,
  duration = 2,
}: IMailIconProps) {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0, 0.5], [0, 1]);
  return (
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 139.7">
      <motion.path
        style={{
          fill: "none",
          opacity,
        }}
        variants={checkMarkVariants}
        stroke="#5dc5a9"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        transition={{
          type: "spring",
          duration,
        }}
        d="M74,104.71l25.72,27,46.38-51.86"
      />
      <motion.path
        style={{
          fill: "#3b3bf1",
          opacity,
        }}
        d="M139.33,3.51A9.91,9.91,0,0,0,131.82,0H10.73A9.89,9.89,0,0,0,3.22,3.51,11.72,11.72,0,0,0,0,11.7v99a11.71,11.71,0,0,0,3.22,8.18,9.89,9.89,0,0,0,7.51,3.51h54.6A.84.84,0,0,0,66,121l-8.07-8.8a4.6,4.6,0,0,0-3.37-1.48H15.14a4.42,4.42,0,0,1-4.41-4.41V23.37a.4.4,0,0,1,.62-.33l56.16,39.3a6.41,6.41,0,0,0,7.34,0L131.2,23a.4.4,0,0,1,.62.33v45.4a.84.84,0,0,0,1.46.57l8.06-8.78a4.55,4.55,0,0,0,1.21-3.09V11.7A11.76,11.76,0,0,0,139.33,3.51ZM69.82,52.27,12.7,12.57A.48.48,0,0,1,13,11.7H129.39a.48.48,0,0,1,.27.87L72.54,52.27A2.41,2.41,0,0,1,69.82,52.27Z"
      />
    </motion.svg>
  );
}

const checkMarkVariants: Variants = {
  initial: {
    opacity: 0,
    pathLength: 0,
  },
  animate: {
    opacity: 1,
    pathLength: 1,
  },
  exit: {
    opacity: 0,
    pathLength: 0,
  },
};
