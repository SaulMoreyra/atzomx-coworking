import {
  CategoryPlan,
  type PlanType,
  type ReviewType,
} from "@/common/types/planTypes";

export const ALL_REVIEWS: ReviewType[] = [
  {
    client: {
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjUYn5S3Np1SYtnvjKQGUmuaCJ624muxjfHR-wuiqbvLJLf_S8Ya-g=w36-h36-p-rp-mo-br100",
      name: "Gina Benn-O'Leary",
    },
    rating: 5,
    review:
      "This is a really nice peaceful cafe and coworking space upstairs. The coworking space is great to work from, quiet, comfortable (great chairs), with great monitors for you to plug into as well. The best space we've found to work in Oaxaca city, and reasonably priced too. I had a lovely iced latte with oat milk as well. And the owners are lovely!"
  },
  {
    client: {
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjXcaw_nVCqrsHqARM55UQGgWCjKYf9GYdnzvh1dNVTiLtoUCJ3P=w36-h36-p-rp-mo-ba3-br100",
      name: "Leif Dyrsten",
    },
    rating: 5,
    review:
      "Great staff, great drinks and reliable internet for the 6 weeks I worked there. I highly recommend it!",
  },
  {
    client: {
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjWWFOVw3P-1aXnkzNuPIAREIKBf6EjduIZ5d0dzkk61Zk4oPuVx=w36-h36-p-rp-mo-ba2-br100",
      name: "Daniel Berger",
    },
    rating: 5,
    review:
      "By far the best Coworking near Centro for remote workers. I've worked at Atzomx for a week in the upstairs coworking space. Previously I toured 3 and tried 2 other coworking spaces. This is the only one that actually has what remote workers need: spacious desks, comfortable ergonomic chairs, fast internet with lots of connection ports, and air conditioning so you can stay focused during the hot Oaxacan afternoons. As a bonus, the coffee is excellent and included in the membership. The space is very clean and calming with lots of plants and local art hanging on the walls. Good food and nice, helpful staff. The only thing missing are lockers so I don't have to bring my full set of gear every day",
  },
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

export enum CafeteriaPlanFeatures {
  PayWhatYouConsume = "pay-what-you-consume",
  StableInternet = "stable-internet",
  ErgonomicChairs = "ergonomic-chairs",
  DiscountOnCafeteriaMenu = "discount-on-cafeteria-menu",
  UnlimitedCoffeeTeaAndWater = "unlimited-coffee-tea-and-water",
  HighSpeedInternet = "high-speed-internet",
  RoofTopAccess = "roof-top-access",
}

export enum CoworkingPlanFeatures {
  ErgonomicChairs = "ergonomic-chairs",
  UnlimitedCoffeeTeaAndWater = "unlimited-coffee-tea-and-water",
  HighSpeedInternet = "high-speed-internet",
  RoofTopAccess = "roof-top-access",
  DiscountOnCafeteriaMenu = "discount-on-cafeteria-menu",
  IndividualDesk = "individual-desk",
  ExtraMonitor = "extra-monitor",
}

export enum MeetingRoomFeatures {
  SmartTv = "smart-tv",
  Whiteboard = "whiteboard",
  SpaceForUpTo6People = "space-for-up-to-6-people",
  UnlimitedCoffeeTeaAndWater = "unlimited-coffee-tea-and-water",
  HighSpeedInternet = "high-speed-internet",
  RoofTopAccess = "roof-top-access",
  DiscountOnCafeteriaMenu = "discount-on-cafeteria-menu",
}

export const FeaturesByCategory = {
  [CategoryPlan.CAFETERIA]: CafeteriaPlanFeatures,
  [CategoryPlan.COWORKING]: CoworkingPlanFeatures,
  [CategoryPlan.MEETING_ROOM]: MeetingRoomFeatures,
};

export const ALL_FEATURES = Object.values(CoworkingPlanFeatures);

export const ALL_PLANS: PlanType[] = [
  {
    id: "free",
    startPrice: 0,
    features: [
      CafeteriaPlanFeatures.PayWhatYouConsume,
      CafeteriaPlanFeatures.StableInternet,
    ],
    area: CategoryPlan.CAFETERIA,
  },
  {
    id: "standard",
    startPrice: 59,
    features: [
      CoworkingPlanFeatures.DiscountOnCafeteriaMenu,
      CoworkingPlanFeatures.ErgonomicChairs,
      CoworkingPlanFeatures.HighSpeedInternet,
      CoworkingPlanFeatures.UnlimitedCoffeeTeaAndWater,
      CoworkingPlanFeatures.RoofTopAccess,
    ],
    area: CategoryPlan.COWORKING,
  },
  {
    id: "individual",
    startPrice: 79,
    features: [
      CoworkingPlanFeatures.DiscountOnCafeteriaMenu,
      CoworkingPlanFeatures.ErgonomicChairs,
      CoworkingPlanFeatures.HighSpeedInternet,
      CoworkingPlanFeatures.UnlimitedCoffeeTeaAndWater,
      CoworkingPlanFeatures.IndividualDesk,
      CoworkingPlanFeatures.RoofTopAccess,
    ],
    area: CategoryPlan.COWORKING,
  },
  {
    id: "monitor",
    startPrice: 89,
    features: [
      CoworkingPlanFeatures.DiscountOnCafeteriaMenu,
      CoworkingPlanFeatures.ErgonomicChairs,
      CoworkingPlanFeatures.HighSpeedInternet,
      CoworkingPlanFeatures.UnlimitedCoffeeTeaAndWater,
      CoworkingPlanFeatures.IndividualDesk,
      CoworkingPlanFeatures.ExtraMonitor,
      CoworkingPlanFeatures.RoofTopAccess,
    ],
    area: CategoryPlan.COWORKING,
  },
  {
    id: "meeting-room",
    startPrice: 259,
    features: Object.values(MeetingRoomFeatures),
    area: CategoryPlan.MEETING_ROOM,
  },
];
