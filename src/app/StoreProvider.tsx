'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore, persistor, store } from '../lib/store'
import { PersistGate } from 'redux-persist/integration/react'
import Loading from '@/component/Loading'

export default function StoreProvider({
    children
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore | null>(null)
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    return (
        <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}