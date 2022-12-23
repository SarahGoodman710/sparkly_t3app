import classNames from "classnames";
import { PropsWithChildren } from "react";

interface SectionContainerProps {
  className?: string;
}

const SectionContainer = ({
  children,
  className,
}: PropsWithChildren<SectionContainerProps>) => (
  <div
    className={classNames(
      `sm:py-18 container relative mx-auto px-6 py-16 md:py-14 lg:px-16 lg:py-14 xl:px-20`,
      className
    )}
  >
    {children}
  </div>
);

export default SectionContainer;
