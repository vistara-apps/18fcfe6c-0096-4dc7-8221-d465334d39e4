# MoodNet - Anonymous Web3 Conversations

MoodNet is a decentralized social platform built as a Base Mini App, enabling Web3 insiders to anonymously share moods, insights, and connect through tokenized interactions.

## Features

- **Anonymous Mood Posting**: Share thoughts with mood indicators while maintaining privacy
- **Web3 Insider Network**: Curated discussions for developers, investors, and builders
- **Tokenized Revenue Sharing**: Creators earn through subscription tiers and engagement
- **NFT Integration**: Optional perks and on-chain identity verification
- **Real-time Mood Visualization**: Interactive mood hub showing community sentiment

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (Ethereum L2)
- **Wallet Integration**: MiniKit + OnchainKit
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout

## Getting Started

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd moodnet
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Add your OnchainKit API key
   ```

3. **Development**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Architecture

### Core Components

- **AppShell**: Main layout wrapper with glass morphism effects
- **PostCard**: Anonymous post display with mood indicators
- **MoodIndicator**: Visual mood representation with glow effects
- **CentralMoodHub**: Interactive mood visualization center
- **ProfileHeader**: User profile with NFT integration
- **SubscriptionButton**: Tokenized creator support

### Data Models

- **User**: Wallet-based identity with mood state and NFT associations
- **Post**: Anonymous content with mood tags and engagement metrics
- **Subscription**: Creator support tiers with token-based payments
- **NFTCollection**: On-chain assets providing platform perks

## Design System

### Colors
- **Primary**: `hsl(235, 80%, 60%)` - Deep blue for main actions
- **Accent**: `hsl(35, 90%, 65%)` - Warm orange for highlights
- **Background**: `hsl(230, 20%, 10%)` - Dark space theme
- **Surface**: `hsl(230, 20%, 15%)` - Elevated elements

### Typography
- **Display**: `text-5xl font-bold` - Hero headings
- **Heading**: `text-3xl font-semibold` - Section titles
- **Body**: `text-base font-normal leading-7` - Main content
- **Caption**: `text-sm font-normal` - Supporting text

### Motion
- **Pulse Glow**: Breathing light effects for active elements
- **Float**: Subtle vertical movement for mood indicators
- **Orbit**: Circular motion for mood hub satellites

## Base Mini App Integration

### Frame Actions
- `post`: Submit anonymous posts with mood selection
- `select_mood`: Update user's current mood state
- `view_creator_profile`: Navigate to creator subscription options
- `subscribe`: Initiate tokenized creator support

### Notifications
- New post creation confirmations
- Successful subscription transactions
- Community engagement alerts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement changes with proper TypeScript types
4. Test on Base testnet
5. Submit pull request with detailed description

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- GitHub Issues: Technical problems and feature requests
- Discord: Community discussions and support
- Documentation: Comprehensive guides and API reference
