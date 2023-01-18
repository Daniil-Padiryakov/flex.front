import { render, RenderOptions } from '@testing-library/react'
import { PreloadedState } from '@reduxjs/toolkit'
import { AppStore, RootState, setupStore } from '../store/store'
import React, { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>
    store?: AppStore
}

export const renderWithProviders = (
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {},
) => {
    const Wrapper = ({ children }: PropsWithChildren<object>): JSX.Element => (
        <Provider store={store}>{children}</Provider>
    )

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
