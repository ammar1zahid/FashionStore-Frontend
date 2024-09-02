// Define the interfaces for the data structures

interface SliderItem {
    id: number;
    img: string;
    title: string;
    desc: string;
    bg: string;
  }
  
  interface Category {
    id: number;
    img: string;
    title: string;
    cat: string;
  }
  
  interface Product {
    id: number;
    img: string;
  }
  
  
  
  export const sliderItems: SliderItem[] = [
    {
      id: 1,
      img: "../public/pics/male2.png",
      title: "SUMMER SALE",
      desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
      bg: "f5fafd",
    },
    {
      id: 2,
      img: "../public/pics/male.jpg",
      title: "AUTUMN COLLECTION",
      desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
      bg: "fcf1ed",
    },
    {
      id: 3,
      img: "../public/pics/male3.jpg",
      title: "LOUNGEWEAR LOVE",
      desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
      bg: "fbf0f4",
    },
  ];
  
  export const categories: Category[] = [
    {
      id: 1,
      img: "../public/pics/cat1.jpg",
      title: "SHIRT STYLE!",
      cat:"women",
    },
    {
      id: 2,
      img: "../public/pics/cat3.jpg",
      title: "T-shirts",
      cat:"shirts"
    },
    {
      id: 3,
      img: "../public/pics/cat2.jpg",
      title: "LIGHT JACKETS",
      cat:"jacket"
    },
  ];
  
  export const popularProducts: Product[] = [
    {
      id: 1,
      img: "../public/pics/product1.jpg",
    },
    {
      id: 2,
      img: "../public/pics/product2.jpg",
    },
    {
      id: 3,
      img: "../public/pics/product3.jpg",
    },
    {
      id: 4,
      img: "../public/pics/product4.jpg",
    },
    {
      id: 5,
      img: "../public/pics/product5.jpg",
    },
    {
      id: 6,
      img: "../public/pics/product1.jpg",
    },
    {
      id: 7,
      img: "../public/pics/product3.jpg",
    },
    {
      id: 8,
      img: "../public/pics/product2.jpg",
    },
  ];
  