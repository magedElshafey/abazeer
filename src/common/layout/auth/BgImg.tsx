const BgImg = () => {
  return (
    <figure className={`w-full  h-[40vh] md:h-screen `}>
      <img
        src="/images/auth-bg.png"
        alt="Background decorative"
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover`}
      />
    </figure>
  );
};

export default BgImg;
