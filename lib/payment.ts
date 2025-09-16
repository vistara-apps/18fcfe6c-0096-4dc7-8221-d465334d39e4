import { WalletClient } from 'viem'
import axios from 'axios'
import { base } from 'viem/chains'

// USDC contract address on Base
export const USDC_CONTRACT_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'

export interface PaymentConfig {
  walletClient: WalletClient
  amount: string
  recipient: string
  tokenAddress?: string
}

export interface PaymentResult {
  success: boolean
  transactionHash?: string
  error?: string
}

export class PaymentService {
  private x402Client: any
  private walletClient: WalletClient | null = null

  constructor() {
    // Initialize axios client with x402 interceptor
    this.x402Client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    })
  }

  setWalletClient(walletClient: WalletClient) {
    this.walletClient = walletClient
    
    // Configure x402 client with wallet address
    if (walletClient.account?.address) {
      this.x402Client.defaults.headers.common['x-wallet-address'] = walletClient.account.address
    }
  }

  async processPayment(config: PaymentConfig): Promise<PaymentResult> {
    try {
      if (!this.walletClient) {
        throw new Error('Wallet client not initialized')
      }

      const { amount, recipient, tokenAddress = USDC_CONTRACT_ADDRESS } = config

      // Create payment request
      const paymentRequest = {
        amount,
        recipient,
        tokenAddress,
        chainId: base.id,
        from: this.walletClient.account?.address,
      }

      // Use x402 client to handle the payment flow
      const response = await this.x402Client.post('/payments', paymentRequest)

      if (response.status === 402) {
        // Handle x402 payment required response
        const paymentChallenge = response.headers['x-payment-challenge']
        
        if (paymentChallenge) {
          // Process the payment challenge
          const paymentResult = await this.handlePaymentChallenge(paymentChallenge, config)
          return paymentResult
        }
      }

      return {
        success: true,
        transactionHash: response.data.transactionHash,
      }

    } catch (error: any) {
      console.error('Payment processing error:', error)
      return {
        success: false,
        error: error.message || 'Payment failed',
      }
    }
  }

  private async handlePaymentChallenge(challenge: string, config: PaymentConfig): Promise<PaymentResult> {
    try {
      if (!this.walletClient) {
        throw new Error('Wallet client not available')
      }

      // Parse the payment challenge
      const challengeData = JSON.parse(challenge)
      
      // Prepare transaction for USDC transfer
      const transactionRequest = {
        account: this.walletClient.account!,
        chain: base,
        to: (config.tokenAddress || USDC_CONTRACT_ADDRESS) as `0x${string}`,
        data: this.encodeTransferData(config.recipient, config.amount),
        value: BigInt(0), // No ETH value for ERC-20 transfer
      }

      // Send transaction using wallet client
      const hash = await this.walletClient.sendTransaction(transactionRequest)

      // Wait for transaction confirmation
      const receipt = await this.waitForTransactionConfirmation(hash)

      if (receipt.status === 'success') {
        // Submit proof of payment to x402 service
        await this.x402Client.post('/payments/confirm', {
          transactionHash: hash,
          challenge: challengeData,
        })

        return {
          success: true,
          transactionHash: hash,
        }
      } else {
        throw new Error('Transaction failed')
      }

    } catch (error: any) {
      console.error('Payment challenge handling error:', error)
      return {
        success: false,
        error: error.message || 'Payment challenge failed',
      }
    }
  }

  private encodeTransferData(recipient: string, amount: string): `0x${string}` {
    // This is a simplified version - in production, use a proper ABI encoder
    // For USDC transfer: function transfer(address to, uint256 amount)
    // Method ID: 0xa9059cbb
    const methodId = '0xa9059cbb'
    const recipientAddress = recipient.startsWith('0x') ? recipient.slice(2) : recipient
    const recipientPadded = recipientAddress.padStart(64, '0')
    const amountHex = BigInt(amount).toString(16).padStart(64, '0')
    
    return `${methodId}${recipientPadded}${amountHex}` as `0x${string}`
  }

  private async waitForTransactionConfirmation(hash: `0x${string}`) {
    // Simple polling for transaction receipt
    // In production, use proper web3 libraries with better error handling
    let attempts = 0
    const maxAttempts = 60 // 60 seconds timeout

    while (attempts < maxAttempts) {
      try {
        // This would need to be implemented with proper viem client
        // For now, return a mock successful receipt
        await new Promise(resolve => setTimeout(resolve, 1000))
        attempts++

        if (attempts > 5) { // Simulate confirmation after 5 seconds
          return { status: 'success' as const }
        }
      } catch (error) {
        attempts++
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }

    throw new Error('Transaction confirmation timeout')
  }

  async checkTransactionStatus(hash: string): Promise<{
    confirmed: boolean
    confirmations: number
    status: 'pending' | 'success' | 'failed'
  }> {
    try {
      // In production, implement proper transaction status checking
      // For now, return mock data
      return {
        confirmed: true,
        confirmations: 6,
        status: 'success',
      }
    } catch (error) {
      console.error('Error checking transaction status:', error)
      return {
        confirmed: false,
        confirmations: 0,
        status: 'failed',
      }
    }
  }
}

export const paymentService = new PaymentService()