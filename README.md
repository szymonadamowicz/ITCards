# ITCards - Interactive Learning Platform

# Table of Contents

1. [**About the Project**](#about-the-project)
   - What is ITCards? Discover the core idea and purpose behind this interactive learning platform.
2. [**Features**](#features)
   - Explore the interactive tools and resources that make studying with ITCards unique.
3. [**Technology Stack**](#technology-stack)
   - Dive into the technologies powering ITCards.
4. [**Project Structure**](#project-structure)
   - Get acquainted with the architecture and layout of the project's files and directories.
5. [**Getting Started**](#getting-started)
   - Set up and run your own instance of ITCards.
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
6. [**Usage**](#usage)
   - Learn how to navigate and utilize ITCards for your learning and interview preparation.
7. [**Contact**](#contact)
   - Have questions or suggestions? Here's how to reach out.
8. [**Acknowledgements**](#acknowledgements)
   - A tribute to the tools, libraries, and frameworks that make ITCards possible.

## About the Project

ITCards is an interactive learning platform designed to help developers prepare for technical interviews and expand their programming knowledge across various technologies such as JavaScript, React, Angular, Node.js, PHP, and C#.

## Features

ITCards offers a range of features to provide an interactive and comprehensive learning experience:

- **Interactive Flashcards**: Study and review technical concepts with flashcards that make learning dynamic and engaging. Flashcards are presented in a question and answer format, perfect for self-testing and memory reinforcement.

- **Interview Preparation Mode**: Specifically designed to help developers prepare for technical interviews, this mode allows users to go through common interview questions and answers, enhancing their readiness for real-world interviews.

- **Learning Mode**: Dive deep into subjects with a structured learning mode, which allows for extended sessions focused on understanding and mastering complex topics.

- **Support for Multiple Programming Languages**: Catering to a diverse range of developers, ITCards includes content for several programming languages including JavaScript, React, Angular, Node.js, PHP, and C#.

- **Progress Tracking**: Users can track their learning progress with a progress bar that visualizes their advancement through the content, providing a sense of accomplishment and a clear path to completion.

- **Responsive Design**: The platform is built using Material-UI, offering a responsive design that adapts to various screen sizes for a seamless learning experience on any device.

- **User Authentication**: Secure login functionality with Firebase authentication ensures that user progress is saved and accessible across different sessions and devices.

- **Animation and Motion**: Utilizing Framer Motion, ITCards provides smooth and appealing animations, making the interaction with the app more intuitive and visually pleasing.

- **Localization and Internationalization**: With i18next, the platform supports internationalization, making it accessible to a global audience with multilingual support.

## Technology Stack

- React
- Material-UI
- Framer Motion for animations
- React Router for navigation
- Firebase for authentication

## Project Structure

Below is a brief overview of the project's folder structure:

```
app/
├── components/
│   ├── Header.tsx
│   └── ...
├── context/
│   └── appContext.tsx
├── questions/
│   └── questions.json
├── routes/
│   └── routeConfig.tsx
├── screens/
│   ├── developerPage.tsx
│   └── ...
├── locales/
│   ├── en/
│   │   └── translation.json
│   └── pl/
│       └── translation.json
└── index.tsx
```

## Getting Started

### Prerequisites

- Node.js
- npm or Yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/ITCards.git
```

2. Install NPM packages

```bash
npm install
```

3. Start the development server

```bash
npm start
```

## Usage

To start using ITCards, simply register an account and choose your developer type. Select a programming language and start learning with either flashcards or the interview preparation mode.

## Contact

Szymon Adamowicz - adamowiczszymon8@gmail.com

## Acknowledgements

- [FontAwesome](https://fontawesome.com)
- [i18next](https://www.i18next.com/)
- [Marked](https://marked.js.org/)
