import img from "../../../assets/auth-bg.png";
const BgImg = () => {
  return (
    <figure className={`w-full  h-[40vh] md:h-screen `}>
      <img
        src={img}
        alt="Background decorative"
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover`}
      />
    </figure>
  );
};

export default BgImg;
