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
  _id:string;
  title: string;
  desc: string;
  img: string;
  // categories?: string[];
  size?: string[];
  color?: string[];
  price: number;
  inventory:number;
  inStock:boolean;
}

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;

`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;

`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;

`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;

`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
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
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product: React.FC = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const [quantity, setQuantity]= useState<number>(1);
  const [color, setColor]= useState<string>("");
  const [size, setSize] = useState<string>("");
  const dispatch = useDispatch()

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await makeRequest.get("/products/" + id);
        setProduct(res.data);
      } catch(err) {
        console.log(err)
      }
    };
    getProduct();
   
  }, [id]);

  const handleQuantity = (type:string) => {
    if (type === "dec") {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleCart = () => {
    dispatch(  addProduct({
      product: product,  
      quantity: quantity,
      color: color,
      size: size,
    }))

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
          <Desc>
            {product.desc}
          </Desc>
          <Price>{product.price}
          </Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c)=>(
                <FilterColor color={c} key={c}  onClick={()=>{
                  setColor(c)
                }}/>
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
              <Remove onClick={()=>handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={()=>handleQuantity("inc")}/>
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
