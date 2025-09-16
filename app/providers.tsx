'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { base } from 'wagmi/chains'
import { http, createConfig } from 'wagmi'
import { coinbaseWallet, metaMask } from 'wagmi/connectors'

const config = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({ appName: 'MoodNet' }),
    metaMask(),
  ],
  transports: {
    [base.id]: http(),
  },
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
