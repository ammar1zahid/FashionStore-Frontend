import { useState, useEffect } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";

interface ArrowProps {
  direction: "left" | "right";
}

interface WrapperProps {
  slideIndex: number;
}

interface SlideProps {
  bg: string;
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div<ArrowProps>`
  width: 50px;
  height: 50px;
  background-color: rgba(0, 128, 128, 0.8); /* Teal background */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  ${(props) => props.direction === "left" && "left: 20px;"}
  ${(props) => props.direction === "right" && "right: 20px;"}
  transform: translateY(-50%);
  cursor: pointer;
  opacity: 0.7;
  transition: background-color 0.3s ease, opacity 0.3s ease;
  z-index: 2;

  &:hover {
    background-color: teal;
    opacity: 1;
  }
`;

const Wrapper = styled.div<WrapperProps>`
  height: 100%;
  display: flex;
  transition: transform 1.5s ease-in-out;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div<SlideProps>`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #fff; /* White background */
  position: relative;
  overflow: hidden;
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 80%;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  text-align: left;
  color: #000; /* Teal text color */
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 64px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #000; /* Teal for title */
`;

const Desc = styled.p`
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 2px;
  margin-bottom: 20px;
  color: teal; /* Teal for description */
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #005f5f;
    transform: scale(1.05);
  }
`;

const Slider: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const autoplay = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex < sliderItems.length - 1 ? prevIndex + 1 : 0));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(autoplay); // Cleanup on unmount
  }, []);

  const handleClick = (direction: "left" | "right") => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
    } else {
      setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined style={{ color: "white" }} />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined style={{ color: "white" }} />
      </Arrow>
    </Container>
  );
};

export default Slider;
