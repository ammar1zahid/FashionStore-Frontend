
# FashionStore Frontend

This is the frontend for the FashionStore application, built with React, TypeScript, and Vite. This frontend provides a dynamic and responsive user interface for users to browse products, manage their cart, and complete purchases.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ammar1zahid/FashionStore-Frontend.git
   cd FashionStore-Frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The application will run on `http://localhost:3000` by default.

### Features

- **Product Display**: Browse and search products.
- **Shopping Cart**: Add products to your cart, view, and manage them.
- **User Authentication**: Secure login and registration.
- **Order Management**: View and manage orders.
- **Responsive Design**: Optimized for both desktop and mobile devices.

### Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type safety and better development experience.
- **Vite**: For fast and efficient development and build process.
- **CSS Modules**: For styling components with scoped CSS.

### ESLint Configuration

The project includes a basic ESLint setup with rules tailored for React and TypeScript development. For more advanced configurations, you can expand the ESLint setup by following these steps:

- Configure the top-level `parserOptions` property:

  ```js
  export default tseslint.config({
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  })
  ```

- Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`.
- Optionally add `...tseslint.configs.stylisticTypeChecked`.
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

  ```js
  // eslint.config.js
  import react from 'eslint-plugin-react'

  export default tseslint.config({
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
    },
  })
  ```

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [ESLint](https://eslint.org/)
```

