import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../../components/Annoucement";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/NewLetter";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { makeRequest } from "../../axios";
import { addProduct } from "../../redux/cartRedux";
import { useDispatch } from "react-redux";

interface IProduct {
  _id: string;
  title: string;
  desc: string;
  img: string;
  size?: string[];
  color?: string[];
  price: number;
  inventory: number;
  inStock: boolean;
}

const Container = styled.div`
  background: linear-gradient(135deg, #f0f8ff, #e6f7ff); /* Light gradient background */
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  gap: 50px;
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 90%;
  height: 90vh;
  object-fit: cover;
  border-radius: 15px; /* Rounded corners */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05); /* Slight zoom effect on hover */
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 48px;
  color: #333;
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-size: 18px;
  line-height: 1.6;
  color: #555;
`;

const Price = styled.span`
  font-weight: 700;
  font-size: 50px;
  color: teal;
  margin: 30px 0;
  display: block;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 500;
  margin-right: 10px;
`;

const FilterColor = styled.div<{ color: string }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2); /* Slightly enlarges on hover */
  }
`;

const FilterSize = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid teal;
  border-radius: 5px;
  background-color: #f0f8ff;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  font-size: 18px;
`;

const Button = styled.button`
  padding: 15px 30px;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #006666;
    transform: scale(1.05); /* Slight zoom on hover */
  }
`;

const Product: React.FC = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const [quantity, setQuantity] = useState<number>(1);
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await makeRequest.get("/products/" + id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type: string) => {
    if (type === "dec") {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleCart = () => {
    dispatch(
      addProduct({
        product: product,
        quantity: quantity,
        color: color,
        size: size,
      })
    );
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>${product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor
                  color={c}
                  key={c}
                  onClick={() => {
                    setColor(c);
                  }}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <FilterSizeOption value="" disabled>
                  Select Size
                </FilterSizeOption>
                {product.size?.map((s) => (
                  <FilterSizeOption value={s} key={s}>
                    {s}
                  </FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleCart}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
