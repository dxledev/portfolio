import "../../css/Header.css";
import Nav from '../widgets/Nav.tsx';
import ThemePicker from '../widgets/ThemePicker.tsx';

function Header() {
  return (
    <div className="Header">
      <Nav />
      <ThemePicker />
    </div>
  );
}

export default Header;
