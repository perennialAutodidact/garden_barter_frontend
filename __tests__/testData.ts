import { Barter } from "../ts/interfaces/barters";

export const TEST_BARTER: Barter = {
  id: 1,
  creator: {
    id: 2,
    lastLogin: "2022-05-29T09:44:41.936917-07:00",
    isSuperuser: true,
    firstName: "",
    lastName: "",
    isStaff: true,
    isActive: true,
    dateJoined: "2022-05-20T13:03:02-07:00",
    email: "admin@gardenbarter.net",
    username: null
  },
  title: "Heirloom Tomatoes",
  description: "Red Giants",
  dateCreated: "2022-05-29T09:50:54.590836-07:00",
  dateUpdated: "2022-05-29T09:50:54.590836-07:00",
  dateExpires: "2022-06-05T09:50:54.590836-07:00",
  postalCode: "97233",
  latitude: null,
  longitude: null,
  crossStreet1: null,
  crossStreet2: null,
  willTradeFor: "Zucchini seeds or starts",
  isFree: false,
  quantity: "2.00",
  quantityUnits: "count",
  barterType: "seed"
};

export const TEST_BARTERS: Barter[] = [
  {
    id: 1,
    creator: {
      id: 2,
      lastLogin: "2022-05-29T09:44:41.936917-07:00",
      isSuperuser: true,
      firstName: "",
      lastName: "",
      isStaff: true,
      isActive: true,
      dateJoined: "2022-05-20T13:03:02-07:00",
      email: "admin@gardenbarter.net",
      username: null
    },
    title: "Heirloom Tomatoes",
    description: "Red Giants",
    dateCreated: "2022-05-29T09:50:54.590836-07:00",
    dateUpdated: "2022-05-29T09:50:54.590836-07:00",
    dateExpires: "2022-06-05T09:50:54.590836-07:00",
    postalCode: "97233",
    latitude: null,
    longitude: null,
    crossStreet1: null,
    crossStreet2: null,
    willTradeFor: "Zucchini seeds or starts",
    isFree: false,
    quantity: "2.00",
    quantityUnits: "count",
    barterType: "seed"
  },
  {
    id: 2,
    creator: {
      id: 2,
      lastLogin: "2022-05-29T09:44:41.936917-07:00",
      isSuperuser: true,
      firstName: "",
      lastName: "",
      isStaff: true,
      isActive: true,
      dateJoined: "2022-05-20T13:03:02-07:00",
      email: "admin@gardenbarter.net",
      username: null
    },
    title: "Rail Barrel",
    description:
      "Extra rain barrel. I don't have enough downspouts. Great condition. Spigot already installed, hardware included.",
    dateCreated: "2022-05-29T10:03:03.634059-07:00",
    dateUpdated: "2022-05-29T10:03:27.431885-07:00",
    dateExpires: "2022-06-05T10:03:27.431885-07:00",
    postalCode: "97233",
    latitude: null,
    longitude: null,
    crossStreet1: null,
    crossStreet2: null,
    willTradeFor: "Non-plastic 10gal planting pot",
    isFree: false,
    quantity: "1.00",
    quantityUnits: "count",
    barterType: "tool"
  },
  {
    id: 3,
    creator: {
      id: 1,
      lastLogin: "2022-05-29T09:42:17.233100-07:00",
      isSuperuser: false,
      firstName: "",
      lastName: "",
      isStaff: true,
      isActive: true,
      dateJoined: "2022-05-20T13:00:52-07:00",
      email: "kg@gardenbarter.net",
      username: "intrepidGardener"
    },
    title: "Wood Chips",
    description:
      "Chips from a downed tree limb. I believe it's elm. Take a little or take it all.",
    dateCreated: "2022-05-29T10:11:54.071067-07:00",
    dateUpdated: "2022-05-29T10:11:54.071067-07:00",
    dateExpires: "2022-06-05T10:11:54.069780-07:00",
    postalCode: "97211",
    latitude: null,
    longitude: null,
    crossStreet1: null,
    crossStreet2: null,
    willTradeFor: "Lilac flowers or a wisteria vine",
    isFree: false,
    quantity: "0.50",
    quantityUnits: "cubic yard",
    barterType: "material"
  }
];

