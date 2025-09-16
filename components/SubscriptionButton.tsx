'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Crown, Zap, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { usePayment, useTransactionStatus } from '@/lib/hooks/usePayment'

interface SubscriptionButtonProps {
  variant?: 'primary' | 'secondary'
  tier?: string
  price?: string
  priceInUSDC?: string
  recipientAddress?: string
  isSubscribed?: boolean
  onClick?: () => void
  className?: string
}

export function SubscriptionButton({ 
  variant = 'primary',
  tier = 'Premium',
  price = '0.01 ETH',
  priceInUSDC = '10',
  recipientAddress = '0x742d35Cc6634C0532925a3b8D03A6E3F8f8c8a9e', // Default recipient
  isSubscribed = false,
  onClick,
  className 
}: SubscriptionButtonProps) {
  const [transactionHash, setTransactionHash] = useState<string>()
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  
  const { processPayment, isProcessing, error, isWalletConnected } = usePayment({
    onSuccess: (result) => {
      setTransactionHash(result.transactionHash)
      setPaymentStatus('success')
    },
    onError: (error) => {
      console.error('Payment error:', error)
      setPaymentStatus('error')
    }
  })

  const transactionStatus = useTransactionStatus(transactionHash)

  const handlePayment = async () => {
    if (!isWalletConnected) {
      alert('Please connect your wallet first')
      return
    }

    setPaymentStatus('processing')
    
    // Convert USDC amount to smallest unit (6 decimals)
    const amountInSmallestUnit = (parseFloat(priceInUSDC) * 1e6).toString()
    
    await processPayment({
      amount: amountInSmallestUnit,
      recipient: recipientAddress,
    })
  }
  // Show success state
  if (isSubscribed || paymentStatus === 'success') {
    return (
      <button
        onClick={onClick}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300',
          'bg-green-600/20 border border-green-500/30 text-green-400',
          'hover:bg-green-600/30 hover:border-green-500/50',
          className
        )}
      >
        <Crown size={16} />
        <span className="text-sm font-medium">
          {transactionStatus?.confirmed ? 'Subscribed' : 'Payment Sent'}
        </span>
        {transactionStatus && !transactionStatus.confirmed && (
          <Loader2 size={12} className="animate-spin" />
        )}
      </button>
    )
  }

  // Show error state
  if (paymentStatus === 'error') {
    return (
      <button
        onClick={() => {
          setPaymentStatus('idle')
          handlePayment()
        }}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300',
          'bg-red-600/20 border border-red-500/30 text-red-400',
          'hover:bg-red-600/30 hover:border-red-500/50',
          className
        )}
      >
        <AlertCircle size={16} />
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium">Retry Payment</span>
          <span className="text-xs opacity-80">{error?.substring(0, 30)}</span>
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={handlePayment}
      disabled={isProcessing || !isWalletConnected}
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300',
        'hover:scale-105 active:scale-95',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
        variant === 'primary' && [
          'bg-gradient-to-r from-primary to-accent',
          'hover:from-primary/80 hover:to-accent/80',
          'text-white font-medium shadow-lg'
        ],
        variant === 'secondary' && [
          'glass-effect border border-white/20',
          'hover:border-white/40 text-text-primary'
        ],
        className
      )}
    >
      {isProcessing ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Zap size={16} />
      )}
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium">
          {isProcessing ? 'Processing...' : tier}
        </span>
        <span className="text-xs opacity-80">
          {isWalletConnected ? `${priceInUSDC} USDC/month` : 'Connect Wallet'}
        </span>
      </div>
    </button>
  )
}
