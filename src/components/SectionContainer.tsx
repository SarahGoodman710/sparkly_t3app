import classNames from "classnames";
import { PropsWithChildren } from "react";

interface SectionContainerProps {
  className?: string;
  children?: React.ReactNode
}

const SectionContainer = ({
  children,
  className,
}: PropsWithChildren<SectionContainerProps>) => (
  <div
    className={classNames(
      `sm:py-16 container relative mx-auto px-4 py-14 md:py-12 lg:px-14 lg:py-12 xl:px-18`,
      className
    )}
  >
    {children}
  </div>
);

export default SectionContainer;
