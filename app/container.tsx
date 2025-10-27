// Container component to standardize layout margins
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large" | "full";
}

export default function Container({
  children,
  className = "",
  size = "medium",
}: ContainerProps) {
  const maxWidthClasses = {
    small: "max-w-3xl",
    medium: "max-w-6xl",
    large: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <div className={`mx-auto ${maxWidthClasses[size]} ${className}`}>
      {children}
    </div>
  );
}
