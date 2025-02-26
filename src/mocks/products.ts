import { ImageType } from "@/common/types/categoryTypes";
import { CategoryPlan, PlanType, ReviewType } from "@/common/types/planTypes";
import { ProductType } from "@/common/types/productTypes";

export const ALL_IMAGES: ImageType[] = [
  {
    id: 1,
    name: "Category 1",
    image: "/images/coworking/meeting-room.jpeg",
  },
  {
    id: 1,
    name: "Category 1",
    image: "/images/coworking/art-latte.jpeg",
  },
  {
    id: 1,
    name: "Category 1",
    image: "/images/coworking/atzomx.jpg",
  },
  {
    id: 1,
    name: "Category 1",
    image: "/images/coworking/lunch.jpg",
  },
  {
    id: 1,
    name: "Category 1",
    image: "/images/coworking/monitor.jpeg",
  },
];

export const ALL_PRODUCTS: ProductType[] = [
  {
    id: 1,
    name: "Product 1",
    description: "Description for product 1",
    price: 100,
    category: ALL_IMAGES[0],
    image: "/images/chair.png",
    categoryId: ALL_IMAGES[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "Admin",
    updatedBy: "Admin",
    stock: 10,
    subcategory: {
      id: 1,
      name: "Subcategory 1",
      categoryId: ALL_IMAGES[0].id,
    },
    subcategoryId: 1,
  },
  {
    id: 2,
    name: "Product 1",
    description: "Description for product 1",
    price: 100,
    category: ALL_IMAGES[0],
    image: "/images/comfort_chair.png",
    categoryId: ALL_IMAGES[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "Admin",
    updatedBy: "Admin",
    stock: 10,
    subcategory: {
      id: 1,
      name: "Subcategory 1",
      categoryId: ALL_IMAGES[0].id,
    },
    subcategoryId: 1,
  },
  {
    id: 3,
    name: "Product 1",
    description: "Description for product 1",
    price: 100,
    category: ALL_IMAGES[0],
    image: "/images/comfort_chair.png",
    categoryId: ALL_IMAGES[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "Admin",
    updatedBy: "Admin",
    stock: 10,
    subcategory: {
      id: 1,
      name: "Subcategory 1",
      categoryId: ALL_IMAGES[0].id,
    },
    subcategoryId: 1,
  },
];

export const ALL_REVIEWS: ReviewType[] = [
  {
    client: {
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      name: "Jose Lopez",
    },
    rating: 5,
    review: "This is a review for product 1",
  },
  {
    client: {
      image: "https://randomuser.me/api/portraits/men/76.jpg",
      name: "Jose Lopez",
    },
    rating: 5,
    review: "This is a review for product 1",
  },
  {
    client: {
      image: "https://randomuser.me/api/portraits/men/77.jpg",
      name: "Jose Lopez",
    },
    rating: 5,
    review: "This is a review for product 1",
  },
  {
    client: {
      image: "https://randomuser.me/api/portraits/men/78.jpg",
      name: "Jose Lopez",
    },
    rating: 5,
    review: "This is a review for product 1",
  },
  {
    client: {
      image: "https://randomuser.me/api/portraits/men/78.jpg",
      name: "Jose Lopez",
    },
    rating: 5,
    review: "This is a review for product 1",
  },
  {
    client: {
      image: "https://randomuser.me/api/portraits/men/79.jpg",
      name: "Jose Lopez",
    },
    rating: 5,
    review: "This is a review for product 1",
  },
];

export const CafeteriaPlanFeatures = {
  PayWhatYouConsume: "Pay only for what you consume",
  StableInternet: "Stable Internet",
  ErgonomicChairs: "Ergonomic Chairs",
  DiscountOnCafeteriaMenu: "5% Discount on cafeteria menu",
  UnlimitedCoffeeTeaAndWater: "Unlimited Coffee, Tea, and Water",
  HighSpeedInternet: "High Speed Internet",
  RoofTopAccess: "Roof Top Access",
};

export const CoworkingPlanFeatures = {
  ErgonomicChairs: "Ergonomic Chairs",
  UnlimitedCoffeeTeaAndWater: "Unlimited Coffee, Tea, and Water",
  HighSpeedInternet: "High Speed Internet",
  RoofTopAccess: "Roof Top Access",
  DiscountOnCafeteriaMenu: "5% Discount on cafeteria menu",
  IndividualDesk: "Individual Desk",
  ExtraMonitor: "Extra Monitor",
};

export const MeetingRoomFeatures = {
  SmartTv: "Smart TV 55 Inch",
  Whiteboard: "Whiteboard",
  SpaceForUpTo6People: "Space for up to 6 people",
  UnlimitedCoffeeTeaAndWater: "Unlimited Coffee, Tea, and Water",
  HighSpeedInternet: "High Speed Internet",
  RoofTopAccess: "Roof Top Access",
  DiscountOnCafeteriaMenu: "5% Discount on cafeteria menu",
};

export const FeaturesByCategory = {
  [CategoryPlan.CAFETERIA]: CafeteriaPlanFeatures,
  [CategoryPlan.COWORKING]: CoworkingPlanFeatures,
  [CategoryPlan.MEETING_ROOM]: MeetingRoomFeatures,
};

export const ALL_FEATURES = Object.values(CoworkingPlanFeatures);

export const ALL_PLANS: PlanType[] = [
  {
    name: "Free",
    startPrice: 0,
    features: [
      CafeteriaPlanFeatures.PayWhatYouConsume,
      CafeteriaPlanFeatures.StableInternet,
    ],
    description: "Description for Standard plan",
    category: "cafeteria",
  },
  {
    name: "Standard",
    startPrice: 49,
    features: [
      CoworkingPlanFeatures.DiscountOnCafeteriaMenu,
      CoworkingPlanFeatures.ErgonomicChairs,
      CoworkingPlanFeatures.HighSpeedInternet,
      CoworkingPlanFeatures.UnlimitedCoffeeTeaAndWater,
      CoworkingPlanFeatures.RoofTopAccess,
    ],
    description: "Description for Standard plan",
    category: "coworking",
  },
  {
    name: "Individual",
    startPrice: 49,
    features: [
      CoworkingPlanFeatures.DiscountOnCafeteriaMenu,
      CoworkingPlanFeatures.ErgonomicChairs,
      CoworkingPlanFeatures.HighSpeedInternet,
      CoworkingPlanFeatures.UnlimitedCoffeeTeaAndWater,
      CoworkingPlanFeatures.IndividualDesk,
      CoworkingPlanFeatures.RoofTopAccess,
    ],
    description: "Description for Standard plan",
    category: "coworking",
  },
  {
    name: "Monitor",
    startPrice: 49,
    features: [
      CoworkingPlanFeatures.DiscountOnCafeteriaMenu,
      CoworkingPlanFeatures.ErgonomicChairs,
      CoworkingPlanFeatures.HighSpeedInternet,
      CoworkingPlanFeatures.UnlimitedCoffeeTeaAndWater,
      CoworkingPlanFeatures.IndividualDesk,
      CoworkingPlanFeatures.ExtraMonitor,
      CoworkingPlanFeatures.RoofTopAccess,
    ],
    description: "Description for Standard plan",
    category: "coworking",
  },
  {
    name: "Desk Room",
    startPrice: 49,
    features: Object.values(MeetingRoomFeatures),
    description: "Description for Standard plan",
    category: "meeting room",
  },
];
