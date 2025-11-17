import { motion } from "framer-motion";
import { ReactElement } from "react";

const OpacityAnimation = ({ children }: { children: ReactElement }) => {
  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1.5 }}
      // className="lg:h-full"
    >
      {children}
    </motion.div>
  );
};

export default OpacityAnimation;
