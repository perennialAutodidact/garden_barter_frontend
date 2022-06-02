import React, {useState,useEffect,useRef, ReactNode} from "react";
import { Barter, BarterItemProps } from "../../ts/interfaces/barters";
import {ArrowButton} from './ArrowButton'
import {GiPlantSeed, GiWoodPile, GiFruitTree, GiCarrot} from 'react-icons/gi'
import {BsWrench} from 'react-icons/bs'
import BarterItemHeader from "./BarterItemHeader";
import Tooltip from 'bootstrap'

const BARTER_ICONS = {
    'seed': <GiPlantSeed/>,
    'plant': <GiFruitTree/>,
    'produce': <GiCarrot/>,
    'material': <GiWoodPile/>,
    'tool': <BsWrench/>
}

const BarterItem = ({ barter }: BarterItemProps) => {

    const [barterIcon, setBarterIcon] = useState<ReactNode>(BARTER_ICONS[barter.barterType])

    const tooltipRefList:React.Ref<HTMLElement[]> = useRef<HTMLElement[]>([])


  return (
    <div className="col-10 offset-1 col-lg-8 offset-lg-2">
        <div className="row no-gutters mt-5 bg-light position-relative">
          <BarterItemHeader icon={barterIcon} barterType={barter.barterType}/>
          <div className="col-12 col-lg-5 py-5 px-3 ps-lg-5 border-bottom border-primary">
            <h4 className="h4 mb-lg-3">{barter.title}</h4>
            <p data-testid='BarterDescription'>
              {barter.description}
            </p>
            <p>
                Quantity: {barter.quantity} {barter.quantityUnits}
            </p>
          </div>
          <div className="d-none d-lg-block col-1 py-3 p-0 border-end border-bottom border-primary" />
          <div className="
                position-absolute
                top-50 start-50 translate-middle
                d-none d-lg-flex
                justify-content-center
            "
        >
            <ArrowButton />
          </div>
          <div className="d-none d-lg-block col-1 py-3 p-0 border-bottom border-primary bg-light-dark" />

          <div className="col-12 col-lg-5 py-3 py-lg-5 px-3 pe-lg-5 border-bottom border-primary bg-light-dark">
              <div className="row">
                  <div className="col-9 d-flex align-items-center">
                     <div className="h4 m-0 mb-lg-3 d-flex align-items-center justify-content-between">
                         Trade For
                    </div >
                  </div>
                  <div className="col-3">
                    <span 
                        className="d-lg-none" 
                    >
                        <ArrowButton />
                    </span>
                  </div>
                  <div className="col-12 pt-3">
                    <p
                      className="text-dark fw-bold m-0" 
                      data-testid="WillTradeFor"
                    >
                      {barter.willTradeFor}
                    </p>
                  </div>
              </div>
          </div>

        </div>
        <div className="row bg-light mb-2">
          <div className="col-12 p-3 ps-lg-5">Posted: Yesterday</div>

        </div>
      </div>
  );
};

export default BarterItem;
