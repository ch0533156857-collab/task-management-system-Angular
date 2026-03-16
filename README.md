# 📋 Task Management System

🌐 **Live Demo:** https://task-management-system-angular.onrender.com

A modern, **signal-based** Kanban-style task management application built with Angular 20, featuring a dynamic graffiti-inspired UI and real-time task updates.

![Angular](https://img.shields.io/badge/Angular-20-red?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![RxJS](https://img.shields.io/badge/RxJS-7-purple?style=flat-square&logo=reactivex)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

### 🎯 Core Functionality
- **📊 Kanban Board**: Signal-based Kanban board with three columns: Todo, In Progress, and Done — real-time status updates via dropdowns
- - **➕ Task CRUD Operations**: Create, read, update, and delete tasks seamlessly
- **🔄 Real-time Status Updates**: Instantly change task status via intuitive dropdown menus
- **⚡ Priority Management**: Set and update task priorities on the fly with real-time UI updates
- **👥 Team & Project Management**: Organize tasks by teams and projects
- **💬 Comments System**: Add and manage comments on tasks for collaboration

### 🏗️ Architecture
- **Signal-Based State Management**: Leverages Angular Signals for reactive, fine-grained reactivity
- **Reactive Forms**: Modern form handling with validation and error management
- **RxJS Integration**: Powerful asynchronous data streams and event handling
- **Interceptors**: Centralized HTTP request/response handling with authentication and error management
- **Route Guards**: Protected routes with authentication validation
- **Custom Directives**: Enhanced UI interactions and highlighting effects

### 🎨 Design
- **Graffiti-Style UI**: Creative, modern visual design with custom styling
- **Responsive Layout**: Mobile-friendly interface with adaptive design
- **Custom Theme**: SCSS-based theming system for consistent styling across components
- **Loading States**: Smooth loading indicators and spinner components
- **Confirmation Dialogs**: User-friendly confirmation modals for destructive actions

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Angular CLI** (v20)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Update `src/environments/environment.ts` with your API endpoints
   - Configure API base URL in `src/app/constants/api-endpoints.ts`

---

## 🛠️ Development Server

Start the development server with hot module replacement:

```bash
ng serve
```

or using npm:

```bash
npm start
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload when you make changes to source files.

---

## 📦 Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Angular** | 20 | Framework |
| **TypeScript** | 5+ | Language |
| **RxJS** | 7+ | Reactive Programming |
| **Angular Signals** | 20 | State Management |
| **Reactive Forms** | 20 | Form Handling |
| **SCSS** | Latest | Styling |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── components/           # Reusable UI components
│   │   ├── auth/            # Authentication (Login, Register)
│   │   ├── tasks/           # Task-related components (Board, Card, Create, Edit)
│   │   ├── projects/        # Project management components
│   │   ├── teams/           # Team management components
│   │   ├── comments/        # Comment system components
│   │   └── shared/          # Shared components (Header, Sidebar, etc.)
│   ├── services/            # Core business logic services
│   ├── models/              # TypeScript interfaces and models
│   ├── guards/              # Route protection guards
│   ├── interceptors/        # HTTP interceptors
│   ├── directives/          # Custom Angular directives
│   ├── pipes/               # Custom data transformation pipes
│   ├── enums/               # Enumeration types
│   └── constants/           # Application constants
├── environments/            # Environment-specific configuration
├── assets/                  # Static assets (images, icons)
└── styles/                  # Global styles and theme
```

---

## 🎮 Usage Examples

### Creating a Task
1. Click the **"Create Task"** button on the task board
2. Fill in task details (title, description, priority, assignee)
3. Select the project and team
4. Click **"Create"** to add the task

### Updating Task Status
1. Hover over a task card
2. Click the status dropdown
3. Select the new status (Todo → In Progress → Done)
4. Changes are reflected in real-time

### Managing Task Priority
1. Open a task card
2. Click on the priority selector
3. Choose from Low, Medium, High, or Critical
4. Priority updates instantly across the board

### Adding Comments
1. Open a task detail view
2. Navigate to the Comments section
3. Enter your comment and click **"Add Comment"**
4. Comments appear in real-time

---

## 🔒 Authentication & Authorization

The application includes built-in authentication features:
- **Login & Register**: Secure user authentication
- **Auth Guards**: Protected routes that require authentication
- **Auth Interceptor**: Automatic token injection and refresh handling
- **Session Management**: User session storage and validation

---

## 🧪 Testing

Run unit tests with:

```bash
ng test
```

or using npm:

```bash
npm test
```

Tests are executed using Karma and Jasmine testing frameworks.

---

## 🏗️ Building for Production

Create a production build with:

```bash
ng build --configuration production
```

The build artifacts are stored in the `dist/` directory. The build is optimized for performance and includes:
- Code minification
- Tree-shaking
- Ahead-of-Time (AOT) compilation
- Bundle optimization

---

## 🎨 Customization

### Theming
Customize the application theme by editing `src/custom-theme.scss`. This file controls:
- Color palette
- Typography
- Component sizing
- Responsive breakpoints

### API Configuration
Update API endpoints in:
- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)
- `src/app/constants/api-endpoints.ts`

---

## 📚 Key Services

| Service | Purpose |
|---------|---------|
| **AuthService** | User authentication and authorization |
| **TaskService** | Task CRUD operations and management |
| **ProjectService** | Project management functionality |
| **TeamService** | Team operations and management |
| **CommentService** | Comment creation and retrieval |
| **StorageService** | Local storage management |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 📞 Support

For support, questions, or feedback:
- 📧 Email: support@taskmanagement.local
- 🐛 Report bugs on [Issues](https://github.com/issues)
- 💬 Join our [Discussions](https://github.com/discussions)

---

## 🎉 Acknowledgments

- Built with ❤️ using Angular 20
- Inspired by modern Kanban and agile project management tools
- Special thanks to the Angular and RxJS communities

---

**Made with ✨ and 🚀 by Your Development Team**
