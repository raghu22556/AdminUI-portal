const Footer = () => {
  const style = {
    fontSize: "10px",
  };
  return (
    <footer className="flex justify-between items-center w-full">
      <p className="lg:text-[9px]" style={style}>
        Copyright &copy; 2022 Maiden Cube Pvt Ltd. All rights reserved.
      </p>

      <p className=" lg:text-[12px]" style={style}>
        Privacy Policy Terms &amp; Conditions
      </p>
    </footer>
  );
};

export default Footer;
