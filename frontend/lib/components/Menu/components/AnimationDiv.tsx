import { motion } from "framer-motion";

import { useMenuContext } from "@/lib/context/MenuProvider/hooks/useMenuContext";

type AnimatedDivProps = {
  children: React.ReactNode;
};
export const AnimatedDiv = ({ children }: AnimatedDivProps): JSX.Element => {
  const { isOpened } = useMenuContext();
  const OPENED_MENU_WIDTH = 260;

  return (
    <motion.div
      initial={{
        width: isOpened ? OPENED_MENU_WIDTH : "0px",
      }}
      animate={{
        width: isOpened ? OPENED_MENU_WIDTH : 0,
        opacity: isOpened ? 1 : 0.5,
        boxShadow: isOpened
          ? "10px 10px 16px rgba(0, 0, 0, 0)"
          : "10px 10px 16px rgba(0, 0, 0, 0.5)",
      }}
      className={"overflow-hidden flex flex-col flex-1 bg-grey"}
    >
      {children}
    </motion.div>
  );
};
