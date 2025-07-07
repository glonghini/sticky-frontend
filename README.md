# AI Story Studio - Frontend

# Installation guide:
## To run locally:
1. Make sure you have installed Node version 22 or higher
2. run `git pull https://github.com/glonghini/sticky-frontend.git`, `cd sticky-frontend` and `npm i`
3. run `npm run dev` to run the app. It should be running at localhost:5173 or 127.0.0.1:5173 

This is the frontend for the AI Story Studio, a web application built with React, Vite, and TypeScript. It provides a user-friendly interface for interacting with the AI-powered backend to create, refine, and visualize stories.

The application is structured around a three-step user workflow, with each step corresponding to a specific page.

## Application Pages & User Flow

The user journey is divided into three distinct pages, each with a dedicated purpose.

### 1. The Story Creator Page

This is the starting point of the creative process, where the user defines the narrative foundation of their story.

*   **Initial Prompting:** The user provides a high-level text briefing for the story they want to create, along with the desired number of scenes.
*   **First Draft Generation:** Upon submission, the page communicates with the backend to generate the first text-only draft of the story.
*   **Story Display:** The generated draft is displayed as a series of scenes, each showing the narrator's text and a character's dialogue.
*   **Progression:** Once the user is happy with the text, they proceed to the next step.

### 2. The Art Selector Page

This page focuses on establishing the visual identity and art direction for the story.

*   **Style Generation:** The user can trigger a process where the backend analyzes the story's first scene and generates three distinct art style suggestions, each presented with a preview image.
*   **Visual Selection:** The three styles are displayed in a grid, allowing the user to see a preview of each look and feel.
*   **Re-rolling:** If the user is not satisfied with the initial suggestions, they can re-roll to generate three entirely new options.
*   **Final Choice:** The user must select one of the art styles to serve as the master reference for the entire story before they can generate the final product.

### 3. The Final Story Page

This is the final output screen, where the user sees the culmination of their creative decisions.

*   **Final Product Display:** This page displays the completed, fully illustrated story. It presents each scene with its final, consistently styled image alongside the corresponding narrator and dialogue text.
*   **Result of Generation:** This view is the result of the final, intensive generation process kicked off on the Art Selector page, where the AI used the chosen reference image to create a unique illustration for every scene.
*   **Completion and Restart:** After viewing their story, the user is presented with an option to "Create a New Story," which resets the application and takes them back to the Story Creator page to begin a new project.
