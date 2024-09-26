import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../../components/Annoucement";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
} from "../../redux/cartRedux";
import { useDispatch } from "react-redux";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";

const Container = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  margin-bottom: 20px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button<{ type?: "filled" }>`
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => (props.type === "filled" ? "none" : "1px solid #000")};
  background-color: ${(props) =>
    props.type === "filled" ? "#000" : "transparent"};
  color: ${(props) => (props.type === "filled" ? "#fff" : "#000")};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.type === "filled" ? "#333" : "#f5f5f5"};
  }
`;

const TopTexts = styled.div``;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  font-size: 16px;
  color: #333;

  &:hover {
    text-decoration: none; // Remove underline on hover
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  font-size: 18px;
  color: #333;
`;

const ProductId = styled.span`
  font-size: 14px;
  color: #888;
`;

const ProductColor = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span`
  font-size: 14px;
  color: #888;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  color: #333;
`;

const ProductPrice = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #333;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin: 20px 0;
`;

const Summary = styled.div`
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  background-color: #f9f9f9;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  font-size: 24px;
  margin-bottom: 20px;
`;

const SummaryItem = styled.div<{ type?: "total" }>`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => (props.type === "total" ? "600" : "400")};
  font-size: ${(props) => (props.type === "total" ? "20px" : "16px")};
`;

const SummaryItemText = styled.span`
  color: #555;
`;

const SummaryItemPrice = styled.span`
  color: #333;
  font-weight: 500;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;

const RemoveButton = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: red;
  color: white;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkred;
  }
`;

const Cart: React.FC = () => {
  const [stripeToken, setStripeToken] = useState<Token | null>(null);
  const cart = useSelector((state: RootState) => state.cart);
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const KEY =
    "pk_test_51Pp4vH01nfJPbaYzsgISrtJ9kjPRGw5YlOzQ5YVE31vDuiTMsMtqY1xywxJNAmGHzAkQhQSWHLmiihNJlDZsbRvP008pVcy9jb";
  const dispatch = useDispatch();

  const handleIncrease = (index: number) => {
    dispatch(increaseQuantity(index));
  };

  const handleDecrease = (index: number) => {
    dispatch(decreaseQuantity(index));
  };

  const handleRemove = (index: number) => {
    dispatch(removeProduct(index));
  };

  const onToken = (token: Token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequestFunc = async () => {
      if (stripeToken) {
        try {
          const response = await makeRequest.post("/checkout/payment", {
            tokenId: stripeToken.id,
            amount: cart.total * 100,
          });
          console.log("Response: ", response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    stripeToken && makeRequestFunc();
  }, [stripeToken, cart.total]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cart.products.length})</TopText>
            <Link
              to="/wishlist"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <TopText>Your Wishlist ({wishlist.quantity})</TopText>
            </Link>
          </TopTexts>
          {/* <TopButton type="filled">CHECKOUT NOW</TopButton> */}
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product, index) => (
              <Product key={product.product._id}>
                <ProductDetail>
                  <Image src={product.product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product.product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <RemoveButton onClick={() => handleRemove(index)}>
                    Remove Item
                  </RemoveButton>
                  <ProductAmountContainer>
                    <Add onClick={() => handleIncrease(index)} />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove onClick={() => handleDecrease(index)} />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>${cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>-$5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>${cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Ammar Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
