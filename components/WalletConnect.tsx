'use client'

import { useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { cn } from '@/lib/utils'
import { Wallet, LogOut, Loader2 } from 'lucide-react'

interface WalletConnectProps {
  className?: string
}

export function WalletConnect({ className }: WalletConnectProps) {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const [showConnectors, setShowConnectors] = useState(false)

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected && address) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-600/20 border border-green-500/30 text-green-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium">{formatAddress(address)}</span>
        </div>
        <button
          onClick={() => disconnect()}
          className="flex items-center gap-1 px-2 py-2 rounded-md hover:bg-red-600/20 text-red-400 transition-colors"
          title="Disconnect wallet"
        >
          <LogOut size={16} />
        </button>
      </div>
    )
  }

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setShowConnectors(!showConnectors)}
        disabled={isPending}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300',
          'bg-gradient-to-r from-primary to-accent text-white font-medium',
          'hover:from-primary/80 hover:to-accent/80 hover:scale-105',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
        )}
      >
        {isPending ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Wallet size={16} />
        )}
        <span>Connect Wallet</span>
      </button>

      {showConnectors && !isPending && (
        <div className="absolute top-full mt-2 right-0 z-50 min-w-[200px] p-2 rounded-lg bg-surface-primary border border-white/10 shadow-lg">
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => {
                connect({ connector })
                setShowConnectors(false)
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 text-left transition-colors"
            >
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Wallet size={16} />
              </div>
              <span className="font-medium">{connector.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Overlay to close dropdown */}
      {showConnectors && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowConnectors(false)}
        />
      )}
    </div>
  )
}