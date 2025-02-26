import { type ImageType } from "@/common/types/categoryTypes";
import { CategoryPlan, type PlanType, type ReviewType } from "@/common/types/planTypes";
import { type ProductType } from "@/common/types/productTypes";

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
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjUQE99gUkMvUVBMDNMwRAW5d6FO4F9r-VScBwzpP6XEs5EuvsFk-w=w60-h60-p-rp-mo-br100",
      name: "Eve Anderson",
    },
    rating: 5,
    review:
      "Great setup with very friendly owners/staff! ✨ Lots of coworking options (including for free in their cafe, or per hour/day/week in the rooms upstairs), solid Wi-Fi connection throughout, and lots of charging outlets.",
  },
  {
    client: {
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjUtfutFd5ssk00dlAQtf5fNhxohFNMYLwB5DKw0B9Y8c6s7ZcKx=w60-h60-p-rp-mo-br100",
      name: "Hannah Aronowitz",
    },
    rating: 5,
    review:
      "My fave coworking space in Oaxaca! GREAT WIFI! Spacious with tons of desks, comfy chairs, outlets, fresh air and friendly staff. Also, lots of locals work here, not just a digital nomad hub, which I appreciate.",
  },
  {
    client: {
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjWuxG9x-W_y2jPwNRZqdwG4E8OlWLref0pJNYkhquD-xdT0Eqjw=w60-h60-p-rp-mo-ba3-br100",
      name: "Anika S.",
    },
    rating: 5,
    review:
      "Great coworking spot in Oaxaca centro! You can work for free (with purchase from the cafe) downstairs or cowork upstairs, where they have options for shared or private hotdesk, monitors, and a conference room. (Plus faster wifi.) Pricing is super reasonable by the hour, day, week, etc. The service is friendly and even though I didn’t try their coffee, I noticed they have Chemex pourover 😍 I plan to be back!!",
  },
  {
    client: {
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjUF0yjghmrW5qHY_Z6dYpBnoDjm3YWgi4QPegB7qQqqBt9-Eczp=w60-h60-p-rp-mo-br100",
      name: "Isac Ortiz",
    },
    rating: 5,
    review:
      "Excelente lugar para estar, trabajar o simplemente para tomar un café. Me agradó el ambiente relajado, la comida saludable y el trato de los chicos que atienden el negocio.",
  },
  {
    client: {
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjVIxie1vLrq-kXa2-VptI2JgVpi2wx39k7Mx6ziEzAjIZEIBLtUmw=w60-h60-p-rp-mo-ba5-br100",
      name: "Hektor Glz",
    },
    rating: 5,
    review:
      "Un excelente lugar para hacer CoWorking. El personal es muy amable y tienen muy buenas opciones para cualquier tipo de formato (estar en la parte de la cafetería, o en la zona premium - estás incluyen desde area estandar, individual estandar, individual con monitor y hasta sala de conferencia). Mi desayuno fue muy rico, escogí un sándwich de pavo con ensalada.",
  },
  {
    client: {
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjW8NRSV-BeEq3PLNccL4_64uuEciFi-5Vi6YhXjntBhTN3MGd2z=w60-h60-p-rp-mo-ba4-br100",
      name: "Uriel Garcia",
    },
    rating: 5,
    review:
      "Si no tienes un lugar donde trabajar o simplemente buscas un cambio de rutina, Atzomx Coworking tiene todo lo que necesitas: comodidad, tecnología y buen café. ¡Altamente recomendado!",
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
