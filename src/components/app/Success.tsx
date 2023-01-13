import { motion } from "framer-motion";
import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function Sucess() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      {(ref) => (
        <div ref={ref}>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <motion.div
                className="h-44 w-44"
                animate={{
                  scale: [1, 2, 2, 1, 1],
                  rotate: [0, 0, 180, 180, 0],
                  borderRadius: ["0%", "0%", "50%", "50%", "0%"],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.5, 0.8, 1],
                }}
                onAnimationComplete={() => setIsOpen(false)}
              >
                <CheckCircleIcon className="text-secondary" />
                &nbsp;
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </Transition.Root>
  );
}
