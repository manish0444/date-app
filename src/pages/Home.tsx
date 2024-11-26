import { useState } from "react";
import "./Home.css";
import Header from "../components/Header";
import Image from "../components/Image";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
function Home() {
  const [x, setX] = useState(-1);
  const [y, setY] = useState(-1);
  const [clickedYes, setClickedYes] = useState(false);
  const [clickedNo, setClickedNo] = useState(false);

  const handleNoClick = () => {
    console.log("Click No");
    const vw =
      Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      ) - 50;
    const vh =
      Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      ) - 50;

    const getRandomInt = (max: number) => {
      return Math.floor(Math.random() * max);
    };

    setX(getRandomInt(vw));
    setY(getRandomInt(vh));
    setClickedNo(true);
  };
  const navigate = useNavigate();
  const handleYesClick = () => {
    const path = `/yes`;
    navigate(path);
    setClickedYes(true);
    console.log("Click Yes");
  };
  return (
    <div className="app">
      {clickedYes ? (
        <div>Cool!</div>
      ) : (
        <div>
          <Header />
          <Image />
          <div className="buttons">
            <Button text="Yes" handleClick={handleYesClick} x={-1} y={-1} />
            <Button text="No" handleClick={handleNoClick} x={x} y={y} />
            {clickedNo ? <div className="placeholder"></div> : <div></div>}
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Home;
