import { User } from "../ts/interfaces/auth";
import { Barter } from "../ts/interfaces/barters";


export const TEST_USER:User = {
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
}
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
    barterType: "seed"
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
            username: null
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
        barterType: "tool"
    },
    {
        uuid: '4730bd9a9d6f447caa85073271e1a530',
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