# AI SDK Playground

A modern Next.js application that provides an interactive interface for AI-powered chat, UI generation, and data visualization. Built with TypeScript and integrated with various AI models including GPT-4 and GROQ.

## Features

- **AI Chat Interface**: Multiple chat implementations with different capabilities:
  - Basic chat completion
  - Custom data streaming
  - Tool-augmented conversations
  - Object generation
  - Streaming UI components

- **Interactive Components**:
  - Modern sidebar navigation
  - Team switching functionality
  - Project management interface
  - User profile management
  - Weather and stock information widgets

- **AI Integration**:
  - OpenAI GPT-4 integration
  - GROQ API support
  - Custom tool definitions
  - Streaming responses
  - Object generation with schemas

- **UI Framework**:
  - Built with Next.js 13+ App Router
  - Modern UI components using shadcn/ui
  - Responsive design with Tailwind CSS
  - TypeScript support
  - Custom hooks and utilities

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- API keys for:
  - OpenAI
  - GROQ (optional)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```
OPENAI_API_KEY=your_openai_api_key
GROQ_API_KEY=your_groq_api_key  # Optional
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/src/app/` - Next.js app router pages and layouts
- `/src/app/api/` - API routes for different features
- `/src/components/` - Reusable React components
- `/src/lib/` - Utility functions and shared code
- `/src/hooks/` - Custom React hooks

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [OpenAI SDK](https://platform.openai.com/) - AI integration
- [GROQ](https://groq.com/) - Alternative AI model provider
- [Zod](https://zod.dev/) - Schema validation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
