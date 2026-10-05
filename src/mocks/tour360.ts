import type { TourLevel, TourScene } from "@/common/types/tourTypes";

/** Tiles exported by Marzipano Tool, served from `public/tour-360/tiles`. */
export const TOUR_TILES_BASE_PATH = "/tour-360/tiles";

const CUBE_LEVELS: TourLevel[] = [
  { tileSize: 256, size: 256, fallbackOnly: true },
  { tileSize: 512, size: 512 },
  { tileSize: 512, size: 1024 },
  { tileSize: 512, size: 2048 },
  { tileSize: 512, size: 4096 },
];

export const TOUR_SCENES: TourScene[] = [
  {
    id: "0-calle",
    nameKey: "street",
    levels: CUBE_LEVELS,
    faceSize: 2976,
    initialViewParameters: {
      yaw: -0.23160892759974772,
      pitch: -0.30630138265774676,
      fov: 1.490756702276736,
    },
    linkHotspots: [
      {
        yaw: -0.23160892759974772,
        pitch: -0.30630138265774676,
        rotation: 0,
        target: "1-entrada",
      },
    ],
  },
  {
    id: "1-entrada",
    nameKey: "entrance",
    levels: CUBE_LEVELS,
    faceSize: 2976,
    initialViewParameters: {
      yaw: -0.16542882905056544,
      pitch: 0.06889275248654414,
      fov: 1.490756702276736,
    },
    linkHotspots: [
      {
        yaw: -3.1121684118733235,
        pitch: 0.06799136456952226,
        rotation: 0,
        target: "0-calle",
      },
      {
        yaw: -0.13021604589629376,
        pitch: 0.10979142744611892,
        rotation: 0,
        target: "2-centro",
      },
      {
        yaw: 1.4750032165377078,
        pitch: 0.07570977843211146,
        rotation: 0,
        target: "3-salida",
      },
      {
        yaw: 0.6200389372642618,
        pitch: 0.08485565040592036,
        rotation: 0.7853981633974483,
        target: "4-esquina",
      },
      {
        yaw: -0.71684402218267,
        pitch: 0.12565761430390765,
        rotation: 5.497787143782138,
        target: "5-barra",
      },
    ],
  },
  {
    id: "2-centro",
    nameKey: "center",
    levels: CUBE_LEVELS,
    faceSize: 2976,
    initialViewParameters: {
      yaw: -0.05052323245976531,
      pitch: 0.03476459978008961,
      fov: 1.490756702276736,
    },
    linkHotspots: [
      {
        yaw: -1.3245599909064527,
        pitch: 0.15734960875422743,
        rotation: 0,
        target: "1-entrada",
      },
      {
        yaw: -2.1460205794529337,
        pitch: 0.0927737503290249,
        rotation: 0,
        target: "3-salida",
      },
      {
        yaw: 2.7190854344254483,
        pitch: 0.08890811346031136,
        rotation: 0,
        target: "4-esquina",
      },
      {
        yaw: 0.26660407706871325,
        pitch: 0.17073587173362093,
        rotation: 0,
        target: "5-barra",
      },
    ],
  },
  {
    id: "3-salida",
    nameKey: "exit",
    levels: CUBE_LEVELS,
    faceSize: 2976,
    initialViewParameters: {
      yaw: 0.32916297296385366,
      pitch: 0.07157268117925497,
      fov: 1.490756702276736,
    },
    linkHotspots: [
      {
        yaw: -0.6721873065062098,
        pitch: 0.10156109506745459,
        rotation: 0,
        target: "1-entrada",
      },
      {
        yaw: 0.2924200504721135,
        pitch: 0.09202201865903703,
        rotation: 0,
        target: "2-centro",
      },
      {
        yaw: 1.1908726526337627,
        pitch: 0.09216194018326007,
        rotation: 0,
        target: "4-esquina",
      },
    ],
  },
  {
    id: "4-esquina",
    nameKey: "corner",
    levels: CUBE_LEVELS,
    faceSize: 2976,
    initialViewParameters: {
      yaw: 0.006123962287702511,
      pitch: 0.002044933747978206,
      fov: 1.490756702276736,
    },
    linkHotspots: [
      {
        yaw: 0.34026710551258255,
        pitch: 0.15509100275748722,
        rotation: 0.7853981633974483,
        target: "2-centro",
      },
      {
        yaw: -0.8169125748041264,
        pitch: 0.10416550817097558,
        rotation: 0,
        target: "3-salida",
      },
      {
        yaw: -0.28852430046873323,
        pitch: 0.09369610490182545,
        rotation: 0,
        target: "1-entrada",
      },
    ],
  },
  {
    id: "5-barra",
    nameKey: "bar",
    levels: CUBE_LEVELS,
    faceSize: 2976,
    initialViewParameters: {
      yaw: 0,
      pitch: 0,
      fov: 1.5707963267948966,
    },
    linkHotspots: [
      {
        yaw: -1.832684423194051,
        pitch: 0.06551144143782572,
        rotation: 0,
        target: "1-entrada",
      },
      {
        yaw: -2.820995104712443,
        pitch: 0.6821506300142293,
        rotation: 0,
        target: "2-centro",
      },
      {
        yaw: 2.840467243789515,
        pitch: 0.055246924184983115,
        rotation: 0,
        target: "4-esquina",
      },
      {
        yaw: -2.452254042484947,
        pitch: 0.08814350692120243,
        rotation: 0,
        target: "3-salida",
      },
      {
        yaw: 0.12594204720107882,
        pitch: 0.0426811197844863,
        rotation: 0,
        target: "6-subiendo",
      },
    ],
  },
  {
    id: "6-subiendo",
    nameKey: "goingUp",
    levels: CUBE_LEVELS,
    faceSize: 2976,
    initialViewParameters: {
      yaw: 2.774368294118455,
      pitch: 0.13131635072150338,
      fov: 1.490756702276736,
    },
    linkHotspots: [
      {
        yaw: 2.0114906264305397,
        pitch: 0.202798296216681,
        rotation: 0,
        target: "5-barra",
      },
      {
        yaw: -2.7697623620760883,
        pitch: 0.0022124399219656254,
        rotation: 0,
        target: "7-escaleras-1",
      },
    ],
  },
  {
    id: "7-escaleras-1",
    nameKey: "stairs1",
    levels: CUBE_LEVELS,
    faceSize: 2976,
    initialViewParameters: {
      yaw: -1.1474862639289398,
      pitch: -0.11146123121502072,
      fov: 1.490756702276736,
    },
    linkHotspots: [
      {
        yaw: -0.8438706409526873,
        pitch: 0.16642242495855797,
        rotation: 0,
        target: "6-subiendo",
      },
      {
        yaw: -1.3181285819623394,
        pitch: -0.4266211709371266,
        rotation: 0,
        target: "8-escaleras-2",
      },
    ],
  },
  {
    id: "8-escaleras-2",
    nameKey: "stairs2",
    levels: CUBE_LEVELS,
    faceSize: 2976,
    initialViewParameters: {
      yaw: 0.30323975779250745,
      pitch: 0.020449337479814034,
      fov: 1.490756702276736,
    },
    linkHotspots: [
      {
        yaw: 0.7736145076583298,
        pitch: 0.6713790456056437,
        rotation: 0,
        target: "7-escaleras-1",
      },
      {
        yaw: 0.08051469576075121,
        pitch: -0.24271308522958002,
        rotation: 6.283185307179586,
        target: "13-entrada-coworking",
      },
    ],
  },
  {
    id: "9-escaleras-3",
    nameKey: "stairs3",
    levels: CUBE_LEVELS,
    faceSize: 2976,
    initialViewParameters: {
      yaw: 0.21740066121332546,
      pitch: -0.2842457909690985,
      fov: 1.490756702276736,
    },
    linkHotspots: [
      {
        yaw: 0.6792783940371692,
        pitch: 0.4742383643283965,
        rotation: 0,
        target: "13-entrada-coworking",
      },
      {
        yaw: 0.12129863323997725,
        pitch: -0.5835691644346461,
        rotation: 0,
        target: "10-terraza-1",
      },
    ],
  },
  {
    id: "10-terraza-1",
    nameKey: "terrace1",
    levels: CUBE_LEVELS,
    faceSize: 2976,
    initialViewParameters: {
      yaw: -2.2837630152647357,
      pitch: 0.10907871333414576,
      fov: 1.490756702276736,
    },
    linkHotspots: [
      {
        yaw: 0.31539043199664185,
        pitch: 0.08480412245607738,
        rotation: 0,
        target: "9-escaleras-3",
      },
      {
        yaw: -2.605350363316587,
        pitch: 0.08909930984575531,
        rotation: 0,
        target: "11-terraza-2",
      },
    ],
  },
  {
    id: "11-terraza-2",
    nameKey: "terrace2",
    levels: CUBE_LEVELS,
    faceSize: 2976,
    initialViewParameters: {
      yaw: 0.3613137749742954,
      pitch: 0.042943608707542325,
      fov: 1.490756702276736,
    },
    linkHotspots: [
      {
        yaw: 0.38161206798123004,
        pitch: 0.07077644868065036,
        rotation: 0,
        target: "10-terraza-1",
      },
      {
        yaw: -0.14540689449209765,
        pitch: 0.06943878783722823,
        rotation: 0,
        target: "10-terraza-1",
      },
    ],
  },
  {
    id: "12-sala-de-juntas",
    nameKey: "meetingRoom",
    levels: CUBE_LEVELS,
    faceSize: 2976,
    initialViewParameters: {
      yaw: 0.3681820838572101,
      pitch: 0.15650051107290608,
      fov: 1.490756702276736,
    },
    linkHotspots: [
      {
        yaw: -0.43710612609541144,
        pitch: 0.1262531667439344,
        rotation: 0.7853981633974483,
        target: "15-coworking-2",
      },
      {
        yaw: -1.2175317513826531,
        pitch: 0.1377976399619012,
        rotation: 5.497787143782138,
        target: "16-coworking-3",
      },
      {
        yaw: -1.928233408643889,
        pitch: 0.22779600957138868,
        rotation: 5.497787143782138,
        target: "17-coworking-4",
      },
    ],
  },
  {
    id: "13-entrada-coworking",
    nameKey: "coworkingEntrance",
    levels: CUBE_LEVELS,
    faceSize: 2976,
    initialViewParameters: {
      yaw: 0,
      pitch: 0,
      fov: 1.490756702276736,
    },
    linkHotspots: [
      {
        yaw: -1.4363596859077745,
        pitch: 0.44380318752127224,
        rotation: 0,
        target: "8-escaleras-2",
      },
      {
        yaw: -1.839399778540379,
        pitch: -0.2849547031110582,
        rotation: 0,
        target: "9-escaleras-3",
      },
      {
        yaw: -0.09061684475315701,
        pitch: 0.07996686578129797,
        rotation: 0,
        target: "14-coworking-1",
      },
    ],
  },
  {
    id: "14-coworking-1",
    nameKey: "coworking1",
    levels: CUBE_LEVELS,
    faceSize: 2976,
    initialViewParameters: {
      yaw: 0,
      pitch: 0,
      fov: 1.5707963267948966,
    },
    linkHotspots: [
      {
        yaw: 2.7660440711412164,
        pitch: 0.007386657983015965,
        rotation: 0,
        target: "13-entrada-coworking",
      },
      {
        yaw: -0.671429724389375,
        pitch: 0.07536955560954439,
        rotation: 5.497787143782138,
        target: "12-sala-de-juntas",
      },
      {
        yaw: 0.1159719809533577,
        pitch: 0.2977655383603093,
        rotation: 0,
        target: "15-coworking-2",
      },
    ],
  },
  {
    id: "15-coworking-2",
    nameKey: "coworking2",
    levels: CUBE_LEVELS,
    faceSize: 2976,
    initialViewParameters: {
      yaw: 0,
      pitch: 0,
      fov: 1.5707963267948966,
    },
    linkHotspots: [
      {
        yaw: 1.8649978466062151,
        pitch: 0.11986412726053608,
        rotation: 0,
        target: "12-sala-de-juntas",
      },
      {
        yaw: 0.17857933505598922,
        pitch: 0.5316131849407846,
        rotation: 0,
        target: "14-coworking-1",
      },
      {
        yaw: -3.135816554122947,
        pitch: 0.2572705981587031,
        rotation: 0,
        target: "16-coworking-3",
      },
      {
        yaw: -0.21121494119505613,
        pitch: 0.18002794963416768,
        rotation: 0,
        target: "13-entrada-coworking",
      },
      {
        yaw: 2.5268639917573434,
        pitch: 0.17450326110139436,
        rotation: 5.497787143782138,
        target: "17-coworking-4",
      },
    ],
  },
  {
    id: "16-coworking-3",
    nameKey: "coworking3",
    levels: CUBE_LEVELS,
    faceSize: 2976,
    initialViewParameters: {
      yaw: 1.9114821570392806,
      pitch: 0.16154976609030314,
      fov: 1.490756702276736,
    },
    linkHotspots: [
      {
        yaw: 0.9898258327224507,
        pitch: 0.18908479167701664,
        rotation: 0.7853981633974483,
        target: "12-sala-de-juntas",
      },
      {
        yaw: -0.10810378691765621,
        pitch: 0.22659327687627417,
        rotation: 0,
        target: "15-coworking-2",
      },
      {
        yaw: 2.040469207524816,
        pitch: 0.3176695476986886,
        rotation: 0,
        target: "17-coworking-4",
      },
    ],
  },
  {
    id: "17-coworking-4",
    nameKey: "coworking4",
    levels: CUBE_LEVELS,
    faceSize: 2976,
    initialViewParameters: {
      yaw: 2.200379047831567,
      pitch: 0.17214832112086143,
      fov: 1.490756702276736,
    },
    linkHotspots: [
      {
        yaw: 0.7241624084681195,
        pitch: 0.012632866992667857,
        rotation: 1.5707963267948966,
        target: "12-sala-de-juntas",
      },
      {
        yaw: -0.2968958790890248,
        pitch: 0.1767868404704842,
        rotation: 5.497787143782138,
        target: "16-coworking-3",
      },
      {
        yaw: 0.21400801985003604,
        pitch: 0.07622290048418456,
        rotation: 0.7853981633974483,
        target: "15-coworking-2",
      },
    ],
  },
];
