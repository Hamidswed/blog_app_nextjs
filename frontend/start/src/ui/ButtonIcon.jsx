const btnType = {
  primary:
    "bg-primary-100 text-primary-700 hover:bg-primary-900 hover:text-white",
  secondary:
    "bg-secondary-200  text-secondary-500 hover:bg-secondary-500 hover:text-secondary-0",
  outline:
    "border border-secondary-200 text-secondary-500 hover:bg-secondary-200",
  red: "bg-red-100  text-red-500 hover:bg-red-500 hover:text-white",
  danger: "border border-red-100 text-red-500",
};

function ButtonIcon({ children, onClick, className, variant, ...rest }) {
  return (
    <button
      onClick={onClick}
      className={`
      ${btnType[variant]}
      ${className} flex items-center justify-center gap-x-1 rounded-md p-0.5
      [&>svg]:w-4  [&>svg]:h-4 [&>svg]:text-inherit
      text-xs lg:text-sm
      transition-all duration-300 ease-out"`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default ButtonIcon;

// [&>svg]:w-5  [&>svg]:h-5 [&>svg]:text-inherit => with this properties we dont need to add width and height for each btn icon
// [&>svg]: This is a CSS selector that targets SVG elements that are direct children of the element that this utility class is applied to.
// The & symbol is a reference to the parent element, and >svg means "direct child SVG elements".
