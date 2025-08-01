import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    x: -300,
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: 300,
  },
};

/* const pageTransition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.5,
  
};
 */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}