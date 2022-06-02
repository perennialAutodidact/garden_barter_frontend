import React, {FC, ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'
import { Provider as ReduxProvider} from 'react-redux';
import { store } from '../store/store';

type Props = {
    children: JSX.Element
}

const AllTheProviders: FC = ({children}:Props) => {
  return (
      <ReduxProvider store={store}>
        {children}
      </ReduxProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender as render}