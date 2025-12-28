# Q_GRID.taurusai.in - Blockchain-Based Digital Identity & Payment System

## Overview

Q_GRID.taurusai.in is a comprehensive blockchain-based platform that combines tokenized KYC (Know Your Customer) identity verification with quantum-resistant payment infrastructure. The system leverages Hedera Hashgraph for distributed ledger operations and integrates multiple advanced features including biometric authentication, offline CBDC (Central Bank Digital Currency) capabilities, and HTTP x402 micropayment protocol.

**Core Value Propositions:**
- **Tokenized KYC**: Convert physical identity documents (Aadhaar, DigiLocker) into W3C Verifiable Credentials with 90% cost reduction (₹150-300 → ₹15 per verification)
- **Offline-First Payments**: Hardware-secured offline transactions with secure element chips and mesh network consensus
- **Quantum-Resistant Security**: Post-quantum cryptography (CRYSTALS-Dilithium) for future-proof digital signatures
- **Micropayment Infrastructure**: HTTP x402 payment protocol enabling transactions as low as ₹0.01 with 2-second settlement
- **Multi-Asset Wallet**: Unified interface for crypto (HBAR, USDC, ETH, SOL), fiat, and CBDC operations

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework**: React 18 with TypeScript, Vite build system
- **UI Components**: Radix UI primitives with shadcn/ui component library (New York style)
- **Styling**: Tailwind CSS v4 with custom design tokens, dark mode support
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Fonts**: Orbitron (headings), Rajdhani (body), DM Sans (system)

**Design Philosophy:**
The application uses a futuristic, quantum-themed design system with cyan/primary accent colors, dark backgrounds, and glowing effects. All interactive elements feature "hover-elevate" and "active-elevate" animations for tactile feedback.

**Key Pages:**
- Dashboard: Overview of biometric enrollment status, security scores, and QRM balance
- Smart Wallet: Multi-asset portfolio management (crypto, fiat, CBDC)
- Tokenized KYC: Aadhaar/DigiLocker credential conversion to blockchain tokens
- Biometric Enrollment: Multi-modal biometric capture (facial, fingerprint, voice, iris, behavioral)
- Offline CBDC Demo: Educational slides explaining offline payment architecture
- Payment Integration: HTTP x402 micropayment demonstration with database visualization
- Verification Log: Audit trail of all biometric authentication attempts

### Backend Architecture

**Technology Stack:**
- **Runtime**: Node.js with TypeScript (ESM modules)
- **Framework**: Express.js for REST API
- **Database**: PostgreSQL via Neon serverless with Drizzle ORM
- **Build**: esbuild for production bundling
- **Development**: tsx for TypeScript execution, Vite dev server with HMR

**API Design:**
RESTful endpoints organized by domain:
- `/api/kyc/users` - User management and KYC status
- `/api/payments` - Payment transaction handling
- `/api/credentials` - KYC credential issuance and verification
- `/api/offline/devices` - Offline payment device management
- `/api/offline/mesh` - Mesh network transaction coordination
- `/api/offline/settlement` - Settlement batch processing

**Middleware Stack:**
- JSON body parsing with raw buffer capture for signature verification
- Custom request/response logging with timing metrics
- CORS configuration for cross-origin requests (development)

### Data Storage Solutions

**Primary Database: PostgreSQL (Neon Serverless)**

**Schema Architecture:**

1. **KYC Users Table** (`kyc_users`)
   - Identity management with Hedera wallet integration
   - KYC status tracking (PENDING, VERIFIED, REJECTED)
   - UUID primary keys for distributed system compatibility

2. **Payment Transactions Table** (`payment_transactions`)
   - USDC/USDT micropayment tracking
   - Hedera transaction hash linkage
   - Verification type categorization (age_check, address_check, full_kyc)

3. **KYC Credentials Table** (`kyc_credentials`)
   - W3C Verifiable Credential storage
   - IPFS hash references for decentralized document storage
   - DID (Decentralized Identifier) integration
   - Credential expiration management

4. **Offline Devices Table** (`offline_devices`)
   - Secure element device registration
   - Balance certificate tracking with cryptographic signatures
   - Offline transaction limits enforcement
   - Last sync timestamp for settlement coordination

5. **Mesh Transactions Table** (`mesh_transactions`)
   - Peer-to-peer offline transaction logging
   - Nonce-based double-spend prevention
   - Sequence number ordering for consensus
   - Pending/settled status workflow

6. **Settlement Batches Table** (`settlement_batches`)
   - Bulk transaction reconciliation on Hedera
   - Distributed ledger finality tracking
   - Batch aggregation for cost optimization

**Data Validation:**
Drizzle-Zod integration provides runtime schema validation with TypeScript type inference. All insert operations are validated against Zod schemas derived from database schema definitions.

### Authentication and Authorization

**Current Implementation:**
- Session-based authentication placeholder (no active auth currently)
- Cookie-based credential storage preparation
- Future integration planned: Hedera wallet signature verification

**Biometric Authentication (Planned):**
- Multi-modal biometric enrollment (facial, fingerprint, voice, iris, behavioral)
- AWS Rekognition / Azure Face API for facial recognition (99.9% accuracy)
- Native device sensors for fingerprint (99.8% accuracy)
- Nuance VocalPassword for voice biometrics (99.5% accuracy)
- Liveness detection and anti-spoofing measures
- Quantum-resistant signatures (CRYSTALS-Dilithium) for biometric template integrity

**Security Measures:**
- AES-256 encryption for biometric template storage
- SHA-512 hashing for template matching without exposing raw data
- Device fingerprinting for suspicious activity detection
- IP-based geolocation tracking for fraud prevention

### External Dependencies

**Blockchain Infrastructure:**
- **Hedera Hashgraph**: Primary distributed ledger for transaction settlement
  - Hedera Token Service (HTS) for tokenized KYC credentials
  - Hedera Consensus Service (HCS) for audit trails
  - 3-5 second finality vs 10-60 minutes for traditional blockchains
  - $0.0001 transaction fees vs $1-50 on Ethereum

**Database Services:**
- **Neon (@neondatabase/serverless)**: Serverless PostgreSQL with edge deployment
  - Connection pooling via WebSocket protocol
  - Environment variable: `DATABASE_URL`

**UI Component Libraries:**
- **Radix UI**: Comprehensive set of accessible, unstyled primitives (30+ components)
  - Accordion, Alert Dialog, Avatar, Checkbox, Dialog, Dropdown Menu, etc.
  - ARIA-compliant accessibility features
- **shadcn/ui**: Pre-styled component templates built on Radix
  - Customized with "New York" style variant
  - Tailwind CSS integration via CSS variables

**Development Tools:**
- **@replit/vite-plugin-runtime-error-modal**: Enhanced error overlay for development
- **@replit/vite-plugin-cartographer**: Code navigation assistance
- **@replit/vite-plugin-dev-banner**: Development environment indicator

**Planned Integrations (from documentation):**
- AWS Rekognition for facial biometrics
- Azure Face API (alternative to AWS)
- Nuance VocalPassword for voice authentication
- BioCatch for behavioral biometrics
- IPFS for decentralized credential storage
- Aadhaar UIDAI API for Indian government identity verification
- DigiLocker API for document retrieval

**Payment Protocol:**
- HTTP x402 (Payment Required): Custom implementation for micropayments
  - Hedera integration for 2-second settlement
  - USDC/USDT stablecoin support
  - 0.1% processing fees vs 2-3% traditional gateways

**Form Handling:**
- @hookform/resolvers for Zod schema validation
- React Hook Form integration (implied by resolver dependency)

**Data Visualization:**
- react-circular-progressbar for security score displays
- Recharts for transaction analytics

**Utilities:**
- class-variance-authority (CVA) for component variant management
- clsx + tailwind-merge for className composition
- date-fns for timestamp formatting
- nanoid for unique ID generation

**Session Management (Configured, Not Active):**
- connect-pg-simple for PostgreSQL-backed session storage
- express-session integration ready for authentication implementation