# WebDork

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel)

A comprehensive Google Dorking assistant designed for security researchers, penetration testers, and bug bounty hunters. WebDork provides 557+ professionally curated search queries across 11 specialized categories.

## Features

- **557+ Professional Dorks** - Extensively researched and tested queries
- **11 Specialized Categories** - Organized by security testing objectives
- **Custom Dork Builder** - Visual query builder with live preview
- **Filter & Search** - Real-time filtering across all dorks
- **Dynamic Query Generation** - Automatic input substitution for targeted searches
- **Modern UI** - Clean, responsive interface built with React and Tailwind CSS
- **One-Click Search** - Direct Google search integration
- **Production Ready** - Error handling, loading states, and optimized performance
- **No Backend Required** - Pure frontend application, deploy anywhere

## Categories

| Category | Dorks | Description |
|----------|-------|-------------|
| People & Username | 51 | OSINT queries for social media and personal information |
| Social Media | 51 | Platform-specific searches across all major networks |
| Websites | 50 | Domain reconnaissance and vulnerability discovery |
| Admin Portals | 51 | CMS backends, control panels, and admin interfaces |
| Files | 51 | Sensitive file types and exposed documents |
| Sensitive Info | 51 | API keys, credentials, tokens, and secrets |
| Vulnerabilities | 51 | SQLi, XSS, LFI, RFI, and security misconfigurations |
| Company Research | 51 | Corporate intelligence and infrastructure mapping |
| IoT & Smart Devices | 51 | Cameras, routers, printers, and IoT systems |
| Cloud Storage | 51 | AWS S3, Google Cloud, Azure, and public file shares |
| Code Repositories | 51 | GitHub, GitLab, exposed code, and vulnerabilities |

## Installation

```bash
# Clone the repository
git clone https://github.com/zebbern/webdork.git

# Navigate to project directory
cd webdork

# Install dependencies
npm install

# Start development server
npm run dev
```

## Deployment

### Vercel

```bash
npm run build
vercel --prod
```

The application is configured for seamless Vercel deployment with automatic routing.

### Other Platforms

Build the static files and deploy the `dist` folder:

```bash
npm run build
```

## Usage

1. Enter your target (website, username, or company name)
2. Select a category from the available options
3. Click any dork to execute the search on Google
4. Review results and proceed with your security assessment

## Technology Stack

- **Frontend Framework:** React 19
- **Type Safety:** TypeScript 5.6
- **Build Tool:** Vite 7.1
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Routing:** React Router DOM

## Use Cases

- **Bug Bounty Hunting** - Discover vulnerabilities and exposed assets
- **Penetration Testing** - Reconnaissance and information gathering
- **Security Research** - Investigate attack surfaces and misconfigurations
- **OSINT Investigations** - Collect intelligence on targets
- **Red Team Operations** - Identify entry points and weak spots

## Disclaimer

This tool is intended for legal security research and testing only. Users are responsible for ensuring they have proper authorization before conducting any security assessments. The authors assume no liability for misuse or illegal activities.

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome. Please open an issue or submit a pull request for improvements.

## Project Structure

```
webdork/
├── public/
│   └── dorks/           # JSON files containing dork queries
├── src/
│   ├── pages/           # React page components
│   ├── lib/             # Utility functions
│   └── main.tsx         # Application entry point
├── vercel.json          # Vercel deployment configuration
└── package.json         # Project dependencies
```

## Contact

For questions, issues, or feature requests, please open an issue on GitHub.
