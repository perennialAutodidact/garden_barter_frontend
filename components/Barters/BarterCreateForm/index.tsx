import React, { useState, useEffect, useRef } from "react";
import { BARTER_TYPES, QUANTITY_UNITS } from "../../../constants";
import { titleize } from "../../../utils/helpers";
import FormSection from "./FormSection";

// These fields will be rendered on each page of the form
const PLANT_FIELDS = [
  { name: "genus", type: "text", label: "Genus" },
  { name: "species", type: "text", label: "Species" },
  { name: "commonName", type: "text", label: "Common Name" }
];
const ADDITIONAL_FIELDS = {
  seed: [
    ...PLANT_FIELDS,
    { name: "yearPackaged", type: "number", label: "Year Packaged" }
  ],
  plant: [...PLANT_FIELDS],
  produce: [...PLANT_FIELDS],
  material: [],
  tool: [{ name: "dimensions", type: "text", label: "Dimensions" }]
};

const BarterCreateForm = () => {
  const [formData, setFormData] = useState({
    barterType: ""
  });
  const [sectionIndex, setSectionIndex] = useState(0);
  const formSections = useRef([
    {
      sectionName: "I have...",
      sectionNumber: "1 of 5",
      fields: [
        {
          name: "barterType",
          type: "radio",
          required: true,
          errors: [],
          choices: BARTER_TYPES.map(barterType => ({
            label: titleize(barterType),
            value: barterType
          }))
        }
      ]
    },
    {
      sectionName: "general info",
      sectionNumber: "2 of 5",
      fields: [
        {
          type: "text",
          name: "title",
          label: "Title",
          required: true,
          errors: []
        },
        {
          type: "textArea",
          name: "description",
          label: "Description",
          required: true,
          errors: []
        },

        {
          name: "quantity",
          label: "Quantity",
          type: "number",
          required: false,
          errors: [],
          columnClasses: "col-6"
        },
        {
          name: "quantityUnit",
          type: "select",
          label: "Unit",
          required: false,
          errors: [],
          options: QUANTITY_UNITS,
          columnClasses: "col-6"
        }
      ]
    },
    {
      sectionName: "additional info",
      sectionNumber: "3 of 5",
      fields: [
        //calculate additional fields
      ]
    },
    {
      sectionName: "will trade for",
      sectionNumber: "4 of 5",
      fields: [
        {
          name: "willTradeFor",
          type: "textArea",
          required: true,
          errors: [],
          label: "Will Trade For"
        },
        {
          name: "isFree",
          type: "checkbox",
          required: false,
          errors: [],
          choices: [{ label: "Free (No Trade Required)", value: "" }]
        }
      ]
    },
    {
      sectionName: "location",
      sectionNumber: "5 of 5",
      fields: [
        {
          name: "crossStreet1",
          type: "text",
          required: false,
          errors: [],
          label: "Street",
          columnClasses: "col-6"
        },

        {
          name: "crossStreet2",
          type: "text",
          required: false,
          errors: [],
          label: "Cross Street",
          columnClasses: "col-6"
        },
        {
          name: "latitude",
          type: "text",
          required: false,
          errors: [],
          label: "Latitude",
          columnClasses: "col-6"
        },
        {
          name: "longitude",
          type: "text",
          required: false,
          errors: [],
          label: "Longitude",
          columnClasses: "col-6"
        },
        {
          name: "postalCode",
          type: "text",
          required: true,
          errors: [],
          label: "Postal Code",
          columnClasses: "col-6"
        }
      ]
    }
  ]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-4 offset-lg-4">
          <form className="bg-light p-5 mt-5 rounded">
            <FormSection sectionData={formSections.current[sectionIndex]} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BarterCreateForm;
