import { User } from "../ts/interfaces/auth";
import { Barter } from "../ts/interfaces/barters";
import { Conversation } from "../ts/interfaces/inbox";
import { initialState as rootState } from "../store/store";


export const TEST_USER: User = {
  id: 1,
  lastLogin: "2022-08-15T04:33:32-07:00",
  isSuperuser: true,
  firstName: "",
  lastName: "",
  isStaff: true,
  isActive: true,
  dateJoined: "2022-07-26T12:36:46-07:00",
  email: "admin@gardenbarter.net",
  username: "kg",
};
export const TEST_BARTER: Barter = {
  uuid: "04f00355114749f7b8fa629acfa0c50a",
  creator: TEST_USER,
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
  barterType: "seed",
};

export const TEST_BARTERS: Barter[] = [
  {
    uuid: "04f00355114749f7b8fa629acfa0c50a",
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
      username: null,
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
    barterType: "seed",
  },
  {
    uuid: "5154b57058db4ef18e14fe105a0843d0",
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
      username: null,
    },
    title: "Rain Barrel",
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
    barterType: "tool",
  },
  {
    uuid: "4730bd9a9d6f447caa85073271e1a530",
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
      username: "intrepidGardener",
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
    barterType: "material",
  },
];

export const INIT_STATE_NOT_AUTHENTICATED = {
  auth: {
    ...rootState.auth,
    authLoadingStatus: "IDLE" as "IDLE",
    isAuthenticated: false,
  },
};

export const INIT_STATE_AUTHENTICATED = {
  auth: {
    ...rootState.auth,
    authLoadingStatus: "IDLE" as "IDLE",
    isAuthenticated: true,
    user: TEST_USER
  },
};

export const TEST_CONVERSATION:Conversation = {
    uuid: "f1e78e3f3ece49308b4ca091f9ef1a4e",
    messages: [
      {
        sender: {
          id: 3,
          email: "bilbo.baggins@shire.com",
          username: "bilbo.baggins"
        },
        recipient: {
          id: 1,
          email: "admin@gardenbarter.net",
          username: "kg"
        },
        uuid: "a549afe255bc414f91de01dbffee534f",
        dateReceived: "2022-08-24T22:20:36.297094-07:00",
        body: "Is this still available? Would you trade for some heirloom bean seeds?",
        conversation: "f1e78e3f3ece49308b4ca091f9ef1a4e"
      },
      {
        sender: {
          id: 1,
          email: "admin@gardenbarter.net",
          username: "kg"
        },
        recipient: {
          id: 3,
          email: "bilbo.baggins@shire.com",
          username: "bilbo.baggins"
        },
        uuid: "e54605f3018249c5a270800be9c75b8b",
        dateReceived: "2022-08-24T22:21:07.021385-07:00",
        body: "Yes it is and yes I would",
        conversation: "f1e78e3f3ece49308b4ca091f9ef1a4e"
      },
      {
        sender: {
          id: 3,
          email: "bilbo.baggins@shire.com",
          username: "bilbo.baggins"
        },
        recipient: {
          id: 1,
          email: "admin@gardenbarter.net",
          username: "kg"
        },
        uuid: "27b531a359c04df29122fafc4ee9a4f6",
        dateReceived: "2022-08-26T11:21:18.220158-07:00",
        body: "Great! Are you available today at 2pm?",
        conversation: "f1e78e3f3ece49308b4ca091f9ef1a4e"
      },
      {
        sender: {
          id: 1,
          email: "admin@gardenbarter.net",
          username: "kg"
        },
        recipient: {
          id: 3,
          email: "bilbo.baggins@shire.com",
          username: "bilbo.baggins"
        },
        uuid: "4fcfcc3434ba42a18bbf57c8634c2a73",
        dateReceived: "2022-08-26T11:21:18.223706-07:00",
        body: "Yes! My address is 123 Faux St.",
        conversation: "f1e78e3f3ece49308b4ca091f9ef1a4e"
      }
    ],
    barterType: "seed",
    barterUuid: "5c19e30615254bd6bd649b47a59020aa",
    sender: {
      id: 3,
      email: "bilbo.baggins@shire.com",
      username: "bilbo.baggins"
    },
    recipient: {
      id: 1,
      email: "admin@gardenbarter.net",
      username: "kg"
    }
  }