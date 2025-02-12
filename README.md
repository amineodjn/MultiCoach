# MultiCoach

A web application built with Vue 3 and Vite that helps connect coaches with clients. The application features Google Maps integration, date/time management, and real-time updates using Firebase.

## Features

- Vue 3 + Vite for modern, fast web development
- Firebase integration for backend services
- Google Maps integration via vue3-google-map
- Tailwind CSS for styling
- Flowbite components
- Date management with date-fns
- State management with Pinia
- Vue Router for navigation

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone [your-repository-url]
cd multicoach
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
Create a `.env` file in the root directory with your Firebase and Google Maps configurations.

## Development

To run the development server:
```bash
npm run dev
```

Other available commands:
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier

## Infrastructure (CDK)

This project includes an AWS CDK infrastructure setup in the `my-cdk-multicoach` directory. To deploy the infrastructure:

1. Navigate to the CDK directory:
```bash
cd my-cdk-multicoach
```

2. Install dependencies:
```bash
npm install
```

3. Deploy the stack:
```bash
npm run cdk deploy
```

## License

MIT License

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request
