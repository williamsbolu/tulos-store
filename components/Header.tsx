import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";

const Header = () => {
  return (
    <header className="border-b border-b-gray-400 py-5">
      <Container classname="flex items-center justify-between gap-7 text-lightColor">
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center justify-center gap-2.5">
          <MobileMenu />
          <Logo>Tulos</Logo>
        </div>
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <div className="">
            <button className="text-sm font-semibold hover:text-darkColor hoverEffect">
              Login
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
