interface Address {
  country: string;
  province: string;
  city: string;
  district: string;
  village: string;
}

interface Hobbies {
  [index: number]: string
}

interface EducationDetail {
  name: string;
  level: string;
  address: string;
  year: string;
}

interface Education {
  [index: number]: EducationDetail
}

interface FavouriteFood {
  [index: number]: string;
}

interface MyLove {
  name: string;
  address: Address;
  age: number;
  hobbies: Hobbies;
  educations: Education;
  favouriteFoods: FavouriteFood;
}

interface SendLove {
  (love: MyLove): void;
}

const myLove: MyLove = {
  name: "Via Fitriana",
  address: {
    country: "Indonesian",
    province: "Central Java",
    city: "Cilacap Regency",
    district: "Sidareja",
    village: "Cibenon"
  },
  age: 19,
  hobbies: [
    "drawing",
    "make up",
    "play game"
  ],
  educations: [
    {
      name: "SMK Yos Sidareja",
      level: "Vacational High School",
      address: "Cibenon, Sidareja",
      year: "2020 - 2023"
    },
    {
      name: "SMP Yos Sidareja",
      level: "Elementary School",
      address: "Cibenon, Sidareja",
      year: "2017 - 2020"
    }
  ],
  favouriteFoods: [
    "ayam geprek",
    "bakso",
    "mie ayam",
    "seblak",
    "eskrim"
  ],
  unknown: 'unknown';
};

const sendLove: SendLove = (love: MyLove): void => {
  console.info(love);
}

const {
  name,
  address,
  age,
  hobbies,
  educations,
  favouriteFoods
}: MyLove = myLove;

sendLove(myLove);
sendLove(name);