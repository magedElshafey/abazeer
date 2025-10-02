interface BackdropProps {
  onClick: () => void;
  aria: string;
  isOpen: boolean;
}
const Backdrop: React.FC<BackdropProps> = ({ onClick, aria, isOpen }) => {
  return (
    <div
      className={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClick}
      role="button"
      aria-label={aria}
    />
  );
};

export default Backdrop;
