

# Flashcards Live Project

This project is a live flashcards application that allows users to create, study, and manage flashcards.

## Test Account
You can log in using the test account:
- **Email:** test@test.com
- **Password:** test

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Sergey-Bukreev/Flash-Cards.git
   ```
2. Install dependencies using pnpm:
     ```bash
    pnpm install
    ```
### Scripts
The project includes the following commands for development and build:

1. Run development: 
     ```bash
    pnpm dev
    ```
    Starts the local development server using Vite.

2.  Build the project:
      ```bash
    pnpm build
    ```
    Compiles TypeScript and creates a production build.
3. Format the code:
      ```bash
    pnpm format
    ```
    Applies Prettier formatting to files in the src folder.
4. Lint the code:
      ```bash
    pnpm lint
    ```
    Runs ESLint and Stylelint to check and fix issues in the code.
5. Storybook:
      ```bash
    pnpm storybook
    ```
## Technologies
The project uses the following libraries and tools:
* **Frontend:**
    - React 18
    - React Router DOM
    - React Hook Form
    - Radix UI
    - Redux Toolkit
    - React Query
    - Zod for validation
* **Development Tools:**
    - Vite
    - TypeScript
    - ESLint, Prettier, Stylelint
    - Storybook for component development
## Component Testing
The project supports Storybook for component testing:
- Run Storybook with the command:
    
    ```bash
    pnpm storybook
    ```