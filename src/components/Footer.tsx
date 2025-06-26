import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center px-5 md:px-30  backdrop-blur-md  border-b border-white/20 bg-white/15">
      <div className="w-full grid md:grid-cols-4 gap-8 px-6 py-12">
        <div
          className="flex flex-col items-start   gap-6 max-w-60 mt-0 top-0  "
          // style={{ backgroundColor: "red" }}
        >
          <div className="flex items-center gap-3">
            <div className=" flex items-center justify-center">
              <Image
                src="/HeaderLogo.png"
                width="35"
                height="35"
                style={{ borderRadius: "50%" }}
                alt="logo"
                className="gradient-icon "
              />{" "}
            </div>
            <span className="text-white font-semibold text-lg ">AIAssist</span>
          </div>
          <h6>
            Your intelligent AI assistant for productivity and organization.
          </h6>
        </div>
        <div>
          <h4 className="text-white font-semibold text-lg mb-4">Product</h4>
          <ul className="space-y-3">
            <li className="text-white/80 hover:text-white transition-colors">
              <Link href="#">Features</Link>
            </li>
            <li className="text-white/80 hover:text-white transition-colors">
              <Link href="#">Pricing</Link>
            </li>
            <li className="text-white/80 hover:text-white transition-colors">
              <Link href="#">API</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-lg mb-4">Support</h4>
          <ul className="space-y-3">
            <li className="text-white/80 hover:text-white transition-colors">
              <Link href="#">Help Center</Link>
            </li>
            <li className="text-white/80 hover:text-white transition-colors">
              <Link href="#">Contact</Link>
            </li>
            <li className="text-white/80 hover:text-white transition-colors">
              <Link href="#">Status</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-lg mb-4">Company</h4>
          <ul className="space-y-3">
            <li className="text-white/80 hover:text-white transition-colors">
              <Link href="#">About Us</Link>
            </li>
            <li className="text-white/80 hover:text-white transition-colors">
              <Link href="#">Blog</Link>
            </li>
            <li className="text-white/80 hover:text-white transition-colors">
              <Link href="#">Careers</Link>
            </li>
          </ul>
        </div>
      </div>

      <button className="flex md:hidden cursor-pointer bg-white/20 hover:bg-white/30 border border-white/30 text-white px-5 py-2 rounded-lg text-sm transition-all hover:scale-105">
        Get Started
      </button>
    </footer>
  );
};

export default Footer;
