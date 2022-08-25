import React, { forwardRef, FC, HTMLProps } from 'react'
import { RiArrowLeftRightLine } from 'react-icons/ri'
import NextLink from 'next/link'
import { Barter } from '../../ts/interfaces/barters'

interface IconButtonProps {
    icon: React.ReactNode;
    ref: React.RefObject<HTMLAnchorElement>;
    onClick: React.MouseEvent
}
const IconButton = (({ icon }) => {
    return (
        <a className="
            icon-button
            h2
            m-0
            bg-warning-dark
            rounded shadow
            border-2 border-primary
            d-flex flex-column
            justify-content-center
            align-items-center
            w-100
            link-dark
        "
            data-testid="IconButton"
            title="Trade!"
        >
            {icon}
        </a>

    )
})

export default IconButton