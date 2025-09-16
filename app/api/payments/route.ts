import { NextRequest, NextResponse } from 'next/server'
import { base } from 'viem/chains'

// USDC contract address on Base
const USDC_CONTRACT_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'

interface PaymentRequest {
  amount: string
  recipient: string
  tokenAddress?: string
  chainId: number
  from?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json()
    
    // Validate the payment request
    if (!body.amount || !body.recipient) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, recipient' },
        { status: 400 }
      )
    }

    // Check if the chain is supported (Base)
    if (body.chainId !== base.id) {
      return NextResponse.json(
        { error: 'Unsupported chain. Only Base is supported.' },
        { status: 400 }
      )
    }

    // Validate USDC token address
    const tokenAddress = body.tokenAddress || USDC_CONTRACT_ADDRESS
    if (tokenAddress.toLowerCase() !== USDC_CONTRACT_ADDRESS.toLowerCase()) {
      return NextResponse.json(
        { error: 'Only USDC payments are supported on Base' },
        { status: 400 }
      )
    }

    // Create payment challenge for x402 flow
    const paymentChallenge = {
      amount: body.amount,
      recipient: body.recipient,
      tokenAddress,
      chainId: body.chainId,
      timestamp: Date.now(),
      nonce: Math.random().toString(36).substring(7),
    }

    // Return 402 Payment Required with challenge
    return new NextResponse(
      JSON.stringify({
        message: 'Payment required',
        challenge: paymentChallenge,
      }),
      {
        status: 402,
        headers: {
          'Content-Type': 'application/json',
          'X-Payment-Challenge': JSON.stringify(paymentChallenge),
          'X-Payment-Required': 'true',
          'X-Supported-Tokens': 'USDC',
          'X-Chain-Id': base.id.toString(),
        },
      }
    )
  } catch (error) {
    console.error('Payment API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    supportedChains: [base.id],
    supportedTokens: ['USDC'],
    usdcAddress: USDC_CONTRACT_ADDRESS,
  })
}