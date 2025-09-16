'use client'

import { useEffect, useState, useCallback } from 'react'
import { useWalletClient, useAccount } from 'wagmi'
import { paymentService, PaymentConfig, PaymentResult } from '@/lib/payment'

export interface UsePaymentOptions {
  onSuccess?: (result: PaymentResult) => void
  onError?: (error: string) => void
}

export interface UsePaymentReturn {
  processPayment: (config: Omit<PaymentConfig, 'walletClient'>) => Promise<PaymentResult>
  isProcessing: boolean
  error: string | null
  isWalletConnected: boolean
  walletAddress: string | undefined
}

export function usePayment(options: UsePaymentOptions = {}): UsePaymentReturn {
  const { onSuccess, onError } = options
  const { data: walletClient } = useWalletClient()
  const { address, isConnected } = useAccount()
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize payment service with wallet client
  useEffect(() => {
    if (walletClient) {
      paymentService.setWalletClient(walletClient)
    }
  }, [walletClient])

  const processPayment = useCallback(async (
    config: Omit<PaymentConfig, 'walletClient'>
  ): Promise<PaymentResult> => {
    if (!walletClient) {
      const errorMsg = 'Wallet not connected'
      setError(errorMsg)
      onError?.(errorMsg)
      return { success: false, error: errorMsg }
    }

    setIsProcessing(true)
    setError(null)

    try {
      const result = await paymentService.processPayment({
        ...config,
        walletClient,
      })

      if (result.success) {
        onSuccess?.(result)
      } else {
        setError(result.error || 'Payment failed')
        onError?.(result.error || 'Payment failed')
      }

      return result
    } catch (err: any) {
      const errorMsg = err.message || 'Payment processing failed'
      setError(errorMsg)
      onError?.(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setIsProcessing(false)
    }
  }, [walletClient, onSuccess, onError])

  return {
    processPayment,
    isProcessing,
    error,
    isWalletConnected: isConnected,
    walletAddress: address,
  }
}

export function useTransactionStatus(transactionHash?: string) {
  const [status, setStatus] = useState<{
    confirmed: boolean
    confirmations: number
    status: 'pending' | 'success' | 'failed'
  } | null>(null)

  useEffect(() => {
    if (!transactionHash) return

    const checkStatus = async () => {
      try {
        const result = await paymentService.checkTransactionStatus(transactionHash)
        setStatus(result)
      } catch (error) {
        console.error('Error checking transaction status:', error)
        setStatus({
          confirmed: false,
          confirmations: 0,
          status: 'failed',
        })
      }
    }

    // Check immediately
    checkStatus()

    // Poll every 5 seconds until confirmed
    const interval = setInterval(checkStatus, 5000)

    return () => clearInterval(interval)
  }, [transactionHash])

  return status
}