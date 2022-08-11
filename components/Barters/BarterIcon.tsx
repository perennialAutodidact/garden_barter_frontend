import React, { useState, ReactNode } from 'react'
import { BarterIconProps } from '../../ts/interfaces/barters'
import { titleize } from '../../utils/helpers'
import { BARTER_ICONS } from '../../common/constants'

/**
 * Note: set position:relative on parent component
 */
const BarterIcon = ({ barterType }: BarterIconProps) => {
  const [barterIcon, _] = useState<ReactNode>(BARTER_ICONS[barterType])
  return (
      <div
        className='
            barter-icon
            rounded-3
            bg-secondary text-light-light
            h2
            m-0
            d-flex justify-content-center align-items-center 
        '
        title={titleize(barterType)}
        data-testid='BarterItem'
      >
        <span
            className='
                d-flex justify-content-center align-items-center 
            '
        >
          {barterIcon}
        </span>
    </div>
  )
}

export default BarterIcon
