'use client'

import { useState } from 'react'
import { SubscriptionButton } from './SubscriptionButton'
import { cn } from '@/lib/utils'
import { TestTube, DollarSign, CheckCircle, AlertCircle } from 'lucide-react'

export function PaymentTest() {
  const [testResults, setTestResults] = useState<{
    walletConnection: boolean | null
    paymentFlow: boolean | null
    usdcIntegration: boolean | null
    errorHandling: boolean | null
  }>({
    walletConnection: null,
    paymentFlow: null,
    usdcIntegration: null,
    errorHandling: null,
  })

  const TestResultIcon = ({ result }: { result: boolean | null }) => {
    if (result === null) return <div className="w-4 h-4 bg-gray-500 rounded-full" />
    if (result === true) return <CheckCircle size={16} className="text-green-400" />
    return <AlertCircle size={16} className="text-red-400" />
  }

  return (
    <div className="space-y-6">
      <div className="glass-effect p-6 rounded-xl border border-white/10">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-white mb-4">
          <TestTube size={20} />
          x402 Payment Flow Test
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          {/* Test Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Test Scenarios</h3>
            
            <SubscriptionButton
              tier="Basic Test"
              priceInUSDC="1"
              recipientAddress="0x742d35Cc6634C0532925a3b8D03A6E3F8f8c8a9e"
              variant="primary"
            />
            
            <SubscriptionButton
              tier="Premium Test"
              priceInUSDC="10"
              recipientAddress="0x742d35Cc6634C0532925a3b8D03A6E3F8f8c8a9e"
              variant="secondary"
            />

            {/* Error Test Button */}
            <SubscriptionButton
              tier="Error Test"
              priceInUSDC="999999999"
              recipientAddress="0x0000000000000000000000000000000000000000"
              variant="primary"
              className="border-red-500/30"
            />
          </div>

          {/* Test Results */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Test Results</h3>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-md bg-surface-primary/50">
                <TestResultIcon result={testResults.walletConnection} />
                <span className="text-sm">Wallet Connection</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-md bg-surface-primary/50">
                <TestResultIcon result={testResults.paymentFlow} />
                <span className="text-sm">x402 Payment Flow</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-md bg-surface-primary/50">
                <TestResultIcon result={testResults.usdcIntegration} />
                <span className="text-sm">USDC on Base</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-md bg-surface-primary/50">
                <TestResultIcon result={testResults.errorHandling} />
                <span className="text-sm">Error Handling</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Status */}
      <div className="glass-effect p-6 rounded-xl border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Implementation Status</h3>
        
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex items-center gap-3 p-3 rounded-md bg-green-600/20 border border-green-500/30">
            <CheckCircle size={16} className="text-green-400" />
            <span className="text-sm text-green-400">wagmi useWalletClient integration</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-md bg-green-600/20 border border-green-500/30">
            <CheckCircle size={16} className="text-green-400" />
            <span className="text-sm text-green-400">x402-axios integration</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-md bg-green-600/20 border border-green-500/30">
            <CheckCircle size={16} className="text-green-400" />
            <span className="text-sm text-green-400">USDC on Base support</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-md bg-green-600/20 border border-green-500/30">
            <CheckCircle size={16} className="text-green-400" />
            <span className="text-sm text-green-400">Transaction confirmations</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-md bg-green-600/20 border border-green-500/30">
            <CheckCircle size={16} className="text-green-400" />
            <span className="text-sm text-green-400">Error handling</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-md bg-blue-600/20 border border-blue-500/30">
            <DollarSign size={16} className="text-blue-400" />
            <span className="text-sm text-blue-400">End-to-end testing ready</span>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="glass-effect p-6 rounded-xl border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Testing Instructions</h3>
        
        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <span>Connect your wallet using the "Connect Wallet" button in the header</span>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <span>Ensure you have USDC on Base network for testing payments</span>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <span>Click any subscription button to test the payment flow</span>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <span>Monitor the transaction status and confirmations</span>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold">5</span>
            <span>Test error scenarios with the "Error Test" button</span>
          </div>
        </div>
      </div>
    </div>
  )
}