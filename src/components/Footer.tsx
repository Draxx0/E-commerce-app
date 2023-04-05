import Image from "next/image";
import Logo from "../assets/logo/logo.webp";

const Footer = () => {
  return (
    <footer>
      <div className="column">
        <Image src={Logo} alt="logo" className="logo" />
        <p>
          copyrigth 2021 - <span>healthe-e commerce</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
