export interface CourseItem {
  id: number;
  titleUz: string;
  titleRu: string;
  price: number;
}

export const COURSES_LIST: CourseItem[] = [
  {
    id: 1,
    titleUz: "Belaz og‘ir yuk mashinasi haydovchisi (7555, 7555В, 7513)",
    titleRu: "Водитель большегрузного автомобиля Белаз (7555, 7555В, 7513)",
    price: 6000000,
  },
  {
    id: 2,
    titleUz: "Ekskavator mashinisti",
    titleRu: "Машинист экскаватора",
    price: 4500000,
  },
  {
    id: 3,
    titleUz: "Tog‘ ishchisi",
    titleRu: "Горнорабочий",
    price: 3000000,
  },
  {
    id: 4,
    titleUz: "O‘tuvchi (prohodchik)",
    titleRu: "Проходчик",
    price: 3000000,
  },
  {
    id: 5,
    titleUz: "Elektrgazpayvandchi",
    titleRu: "Электрогазосварщик",
    price: 3000000,
  },
  {
    id: 6,
    titleUz: "Burg‘ilash dastgohi mashinisti",
    titleRu: "Машинист буровой установки",
    price: 3000000,
  },
  {
    id: 7,
    titleUz: "Yer osti konlarida yuk tashuvchi mashina mashinisti (ПДМ)",
    titleRu: "Машинист подземной горной доставочной машины (ПДМ)",
    price: 3000000,
  },
  {
    id: 8,
    titleUz: "Yer osti konlarida o‘ziyurar mashina mashinisti (ПСМ)",
    titleRu: "Машинист подземной горной самоходной машины (ПСМ)",
    price: 3000000,
  },
  {
    id: 9,
    titleUz: "Elektr jihozlarini ta’mirlash bo‘yicha navbatchi chilangar",
    titleRu: "Электрослесарь дежурный и по ремонту оборудования",
    price: 3000000,
  },
  {
    id: 10,
    titleUz: "Kompressor qurilmasi mashinisti",
    titleRu: "Машинист компрессорной установки",
    price: 3000000,
  },
  {
    id: 11,
    titleUz: "Kimyoviy tahlil laboranti",
    titleRu: "Лаборант химического анализа",
    price: 3000000,
  },
  {
    id: 12,
    titleUz: "Nasos qurilmalari mashinisti",
    titleRu: "Машинист насосных установок",
    price: 2000000,
  },
];

export interface ContactData {
  phones: {
    raw: string;
    display: string;
  }[];
  telegrams: {
    username: string;
    link: string;
    labelUz: string;
    labelRu: string;
  }[];
}

export const CONTACT_INFO: ContactData = {
  phones: [
    {
      raw: "+998991537783",
      display: "99-153-77-83",
    },
    {
      raw: "+998996807778",
      display: "99-680-77-78",
    },
  ],
  telegrams: [
    {
      username: "@ngmk_geology_education",
      link: "https://t.me/ngmk_geology_education",
      labelUz: "Rasmiy Telegram Kanal",
      labelRu: "Официальный Telegram Канал",
    },
    {
      username: "@ngmk_geology_admin",
      link: "https://t.me/ngmk_geology_admin",
      labelUz: "Administrator (Murojaat va maslahat)",
      labelRu: "Администратор (Справка и консультация)",
    },
  ],
};
