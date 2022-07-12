import { BARTER_TYPES, QUANTITY_UNITS } from "../../../constants"
import { titleize } from "../../../utils/helpers"
import { BarterFormSectionData } from "../../../ts/interfaces/barters"
export const formSectionsData:BarterFormSectionData[] = [
    {
      name: "iHave",
      headerText: "I have...",
      number: "1",
      fields: [
        {
          name: "barterType",
          type: "radio",
          required: true,
          additionalProps: {},
          // choices: [{ value: "tool", label: "Tool" }, ...]
          choices: BARTER_TYPES.map(barterType => ({
            label: titleize(barterType),
            value: barterType
          })),
          columnClasses: "col-12"
        }
      ],
    },
    {
      name: "generalInfo",
      headerText: "general info",
      number: "2",
      fields: [
        {
          type: "text",
          name: "title",
          label: "Title",
          required: true,
          additionalProps: {},
          columnClasses: "col-12"
        },
        {
          type: "textArea",
          name: "description",
          label: "Description",
          required: true,
          additionalProps: {},
          columnClasses: "col-12"
        },

        {
          name: "quantity",
          label: "Quantity",
          type: "number",
          required: false,
          additionalProps: { min: 1 },
          columnClasses: "col-6"
        },
        {
          name: "quantityUnits",
          type: "select",
          label: "Unit",
          required: false,
          additionalProps: {},
          options: QUANTITY_UNITS,
          columnClasses: "col-6"
        }
      ]
    },
    {
      name: "additionalInfo",
      headerText: "additional info",
      number: "3",
      fields: [
        // calculate additional fields
        // when the user selects a barterType
        // there is a useEffect below for this
      ]
    },
    {
      name: "willTradeFor",
      headerText: "will trade for",
      number: "4",
      fields: [
        {
          name: "willTradeFor",
          type: "textArea",
          required: true,
          additionalProps: {},
          label: "Will Trade For",
          columnClasses: "col-12"
        },
        {
          name: "isFree",
          type: "checkbox",
          required: false,
          additionalProps: {},
          choices: [{ label: "Free (No Trade Required)", value: "" }],
          columnClasses: "col-12"
        }
      ]
    },
    {
      name: "location",
      headerText: "location",
      number: "5",
      fields: [
        {
          name: "crossStreet1",
          type: "text",
          required: false,
          additionalProps: {},
          label: "Street",
          columnClasses: "col-12 col-lg-6"
        },

        {
          name: "crossStreet2",
          type: "text",
          required: false,
          additionalProps: {},
          label: "Cross Street",
          columnClasses: "col-12 col-lg-6"
        },
        {
          name: "latitude",
          type: "text",
          required: false,
          additionalProps: {},
          label: "Latitude",
          columnClasses: "col-12 col-lg-6"
        },
        {
          name: "longitude",
          type: "text",
          required: false,
          additionalProps: {},
          label: "Longitude",
          columnClasses: "col-12 col-lg-6"
        },
        {
          name: "postalCode",
          type: "text",
          required: true,
          additionalProps: {},
          label: "Postal Code",
          columnClasses: "col-12 col-lg-6"
        }
      ]
    },
    {
      name: "review",
      headerText: "Review",
      number: "6",
      fields: [
        // calculate additional fields
        // when the FormReviewSection
        // component is rendered
      ]
    }
  ]