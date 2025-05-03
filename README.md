# CodeLeap Front End Test

This is a test for a Front Fnd Developer position at CodeLeap, and consists of developing a simple social networking platform where users can create, view and delete posts with features like pagination and responsive design.

---

## 📝 Description  
A web application that allows users to share thoughts in the form of posts, with features like post creation, page navigation, and content deletion. Built with React, TypeScript, and RESTful API integration.

---

## 🔧 Features  
-   **Create Post**: Form to publish new posts with title and content.
-   **Pagination**: Navigate between pages using "Next" and "Previous" buttons.
-   **Delete Post**: Confirmation modal to delete existing posts.
-   **Form Validation**: "Create" button is disabled when title or content fields are empty.
-   **Responsive Interface**: Layout adapts to different devices.

---

## 🛠️ Tecnologias Utilizadas  
| technology       | description                                      |
|------------------|------------------------------------------------|
| **React**        | Library for building the user interface.       |
| **TypeScript**   | Static typing for better maintainability. |
| **Vite**         | Build tool for fast development.        |
| **TanStack Query** | Async state management (React Query). |
| **Tailwind CSS** | Styling with low-level utility classes.    |
| **REST API**     | Integration with `https://dev.codeleap.co.uk/careers/`. |
| **localStorage** | Stores the username locally.              |

---

## 🚀 How to Install  
1. **Clone the repository**:  
   ```bash
   git clone https://github.com/seu-usuario/codeleap-network.git

2. **Install as Dependencies**
``npm install
 ou
pnpm install``

3. **Start the development server** 
```npm run dev ```

4. **Open de development server**
Abra [http://localhost:5173](http://localhost:5173/) no navegador.

## 🧪 How to use

1.  **Set your username** :  
    The username is retrieved from `localStorage`. You can set it manually if needed.    
2.  **Create a post** :  
    -   Fill in the "Title" and "Content" fields and click **Create**. .
3.  **Navigate between pages** :  
    Use the **Next** and **Previous** buttons to browse posts.
4.  **Delete a post** :  
    Click the trash icon next to any post and confirm the deletion in the modal.
