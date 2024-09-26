/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const data = [
    { headding: 'AirPods Pro' },
    { headding: 'Active Noise Cancellation for immersive sound.' },
    { headding: 'Transparency mode for hearing what’s happening around you.' },
    { headding: 'A customizable fit for all-day comfort.' }
];

const useElementPosition = (
    element: React.RefObject<HTMLDivElement>,
    frames: number,
    initialValue: number
) => {
    const [position, setPosition] = useState<number>(initialValue || 1);

    useEffect(() => {
        window.addEventListener('scroll', getFrameRates);
        return () => window.removeEventListener('scroll', getFrameRates);
    });

    function getFrameRates() {
        if (element.current) {
            const rect = element.current.getBoundingClientRect();
            const mainVal = rect.top <= 0 ? Math.abs(rect.top) : 0;
            const height = rect.height - window.innerHeight;
            const finalPercentage = Math.floor((frames * mainVal) / height);
            setPosition(finalPercentage <= frames ? finalPercentage : frames);
        }
    }

    return position || 1;
};

// background-color: rgb(0, 0, 0, 0.8);
const HeaderDiv = styled.div`
  width: 100%;
  background-color: teal;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

const Main = styled.div`
  width: 100%;
  height: 300vh;
  background-color: black;
  position: relative;
`;

const ImageDiv = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextDiv = styled.div<{ index: number; dataLength: number }>`
  position: absolute;
  width: 100%;
  height: 50%;
  overflow: hidden;

  & > div {
    position: absolute;
    top: -${(props) => 100 * props.index}%;
    height: ${(props) => 100 * props.dataLength}%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: top 1s ease;

    & > h1 {
      text-align: center;
      width: 60%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: white;
      font-size: 60px;
    }
  }
`;

const Header = () => {
    return (
        <HeaderDiv>
            <h3>Featured Product</h3>
        </HeaderDiv>
    );
};

const ScrollAnimation = () => {
    const [textIndex, setTextIndex] = useState(0);
    const elementRef = useRef<HTMLDivElement>(null);
    const totalFrames = 144;
    const imageFrame = useElementPosition(elementRef, totalFrames, 1);

    const getTextIndexPercentage = () => {
        return Math.floor((data.length * imageFrame) / totalFrames);
    };

    const getImageWidthPercentage = () => {
        return Math.floor((200 * imageFrame) / totalFrames);
    };
    const preloadImages = () => {
        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            img.src = getImage(i);
        }
    };

    const getImage = (frame:number) =>
        `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${frame
            .toString()
            .padStart(4, '0')}.jpg`;
    // const getImage = (frame: number) =>
    //     `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjK9nOTHBm290nlt-tRA_Mj2toA6RPe_0Scg&s`;


    useEffect(() => {
        const index = getTextIndexPercentage();
        if (index < data.length) setTextIndex(index);
        preloadImages();
    }, [imageFrame, getTextIndexPercentage, preloadImages]);

  



    return (
        <Main ref={elementRef}>
            <ImageDiv>
                <img
                    style={{
                        width: `${800 - getImageWidthPercentage()}px`,
                    }}
                    src={getImage(imageFrame)}
                    alt=""
                />
                <TextDiv index={textIndex} dataLength={data.length}>
                    <div>
                        {data.map(({ headding }, i) => (
                            <h1 key={i} style={{ opacity: i === textIndex ? 1 : 0 }}>
                                {headding}
                            </h1>
                        ))}
                    </div>
                </TextDiv>
            </ImageDiv>
        </Main>
    );
};

function ScrollAnimationComponent() {
    return (
        <div>
            <Header />
            <ScrollAnimation />
        </div>
    );
}

export default ScrollAnimationComponent;
