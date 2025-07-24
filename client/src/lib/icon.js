import { Icon } from "@iconify/react";

export const AppIcon = ({ icon, size, className = "", ...props }) => {
  return (
    <Icon
      icon={icon}
      width={size}
      height={size}
      className={`flex justify-center items-center ${className}`}
      {...props}
    />
  );
};
