interface LoaderProps {
  color?: string;
}
const Loader: React.FC<LoaderProps> = ({ color }) => {
  return (
    <div
      className={`w-4 h-4 border-2 ${
        color ? `border-[${color}]` : "border-orangeColor"
      } border-t-transparent rounded-full animate-spin`}
      role="status"
    ></div>
  );
};

export default Loader;
