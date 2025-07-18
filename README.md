# 📋 Jira Clone - Project Management Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.0.2-000000.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg)](https://reactjs.org/)
[![Hono](https://img.shields.io/badge/Hono-4.6.9-orange.svg)](https://hono.dev/)
[![Appwrite](https://img.shields.io/badge/Appwrite-14.1.0-f02e65.svg)](https://appwrite.io/)
[![Shadcn/UI](https://img.shields.io/badge/Shadcn_UI-Latest-000000.svg)](https://ui.shadcn.com/)

> This is a Next.js 15 Jira clone featuring Appwrite SDK, Hono.js API, and Shadcn UI, with authentication, analytics, Kanban boards, and role-based access control.

![logo](https://raw.githubusercontent.com/chayan-1906/Jira/master/public/logo.svg)

## ✨ Features

- 🚀 **Next.js 15** - Latest React framework with advanced features ⚡
- 📊 **Kanban Boards** - Drag-and-drop task management 🎯
- 📅 **Calendar View** - Visual timeline for project planning 📆
- 📈 **Analytics Dashboard** - Real-time project insights 📊
- 👥 **Team Management** - Role-based access control 🔐
- 🎨 **Modern UI** - Shadcn/UI components with Tailwind CSS ✨
- 🔒 **Authentication** - Secure Appwrite authentication 🛡️
- 📱 **Responsive Design** - Works on all devices 📺
- 🎭 **Dark/Light Mode** - Theme switching support 🌙
- 🔄 **Real-time Updates** - Live collaboration features ⚡

## [Live Site (Vercel)](https://jira-alpha.vercel.app/)

## 📱 Screenshots

<table>
    <tr>
        <td><img src="https://github.com/user-attachments/assets/ebc3f4ea-44ad-4530-9e24-4d8d5293b9bc" alt="Home" width="480px"/></td>
        <td><img src="https://github.com/user-attachments/assets/dd9189c8-c3d5-48f5-9ddc-a46493e51a2a" alt="Kanban View" width="480px"/></td>
    </tr>
    <tr>
        <td><img src="https://github.com/user-attachments/assets/dc6edc56-95f1-4308-8c69-6969fa5b9a24" alt="Calendar View" width="480px"/></td>
        <td><img src="https://github.com/user-attachments/assets/bd901f1e-178c-4813-a8f4-4d7ecd189764" alt="Project Details" width="480px"/></td>
    </tr>
    <tr>
        <td><img src="https://github.com/user-attachments/assets/23431c85-d0f7-4bab-8c4d-36d6ab396fbb" alt="Create Project Modal" width="480px"/></td>
        <td><img src="https://github.com/user-attachments/assets/c989a758-bc31-4e4f-b342-a1848a54d36f" alt="Create Task Modal" width="480px"/></td>
    </tr>
    <tr>
        <td><img src="https://github.com/user-attachments/assets/47fd7a8b-0194-4a44-99b1-a3a3f3978b8d" alt="Task Details" width="480px"/></td>
        <td><img src="https://github.com/user-attachments/assets/35a2568d-8248-4155-b9bb-21570dbe90d1" alt="Members" width="480px"/></td>
    </tr>
    <tr>
        <td><img src="https://github.com/user-attachments/assets/49aea155-2967-49a9-9cdf-1540194ee850" alt="Settings" width="480px"/></td>
    </tr>
</table>

## 🏗️ Tech Stack

### 🖥️ Frontend
- ⚛️ **Next.js** 15.0.2 - React framework with App Router 🚀
- 📘 **TypeScript** 5.x - Type safety and enhanced DX 🛡️
- 🎨 **Tailwind CSS** 3.4.14 - Utility-first CSS framework 💅
- 🌟 **Shadcn/UI** - Modern React components ✨

### 🔄 Backend & API
- 🔥 **Hono.js** 4.6.9 - Lightweight web framework 🚀
- 🗄️ **Appwrite** 14.1.0 - Backend-as-a-Service platform 📊
- 🔐 **Zod** 3.23.8 - Schema validation 🛡️
- 🎯 **Hono Zod Validator** 0.4.1 - Request validation ✅

### 🎨 UI Components
- 🎭 **Radix UI** - Headless UI components 🧩
- 📋 **React Hook Form** 7.53.1 - Form management 📝
- 🎨 **Lucide React** 0.454.0 - Icon library 🌟
- 🔄 **React Icons** 5.3.0 - Additional icons 🎯

### 📊 Data Management
- 🔍 **TanStack Query** 5.59.19 - Data fetching and caching ⚡
- 📊 **TanStack Table** 8.20.5 - Table management 📋
- 🔄 **Nuqs** 1.19.1 - URL state management 🌐
- 📈 **Recharts** 2.13.3 - Chart library 📊

### 🎯 Advanced Features
- 🎨 **Hello Pangea DnD** 17.0.0 - Drag and drop 🎯
- 📅 **React Big Calendar** 1.16.3 - Calendar component 📆
- 🎭 **Next Themes** 0.3.0 - Theme switching 🌙
- 🔊 **Sonner** 1.5.0 - Toast notifications 🔔
- 🎨 **Vaul** 1.1.1 - Drawer component 📱

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 🟢
- Appwrite account 🔐
- TypeScript knowledge 📘

### Installation

1. **Clone repository** 📥
   ```bash
   git clone https://github.com/chayan-1906/Jira.git
   cd Jira
   ```

2. **Install dependencies** 📦
   ```bash
   npm install
   ```

3. **Environment setup** ⚙️
   ```bash
   cp .env.example .env
   ```

4. **Configure environment** 🔧
   ```env
   NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID=your_appwrite_images_bucket_id
   NEXT_PUBLIC_APPWRITE_PROJECT=your_appwrite_project_id
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_appwrite_database_id
   NEXT_PUBLIC_APPWRITE_WORKSPACES_ID=your_appwrite_workspaces_id
   NEXT_PUBLIC_APPWRITE_MEMBERS_ID=your_appwrite_members_id
   NEXT_PUBLIC_APPWRITE_PROJECTS_ID=your_appwrite_projects_collection_id
   NEXT_PUBLIC_APPWRITE_TASKS_ID=your_appwrite_tasks_collection_id
   NEXT_PUBLIC_APPWRITE_KEY=your_appwrite_key
   NEXT_PUBLIC_APP_URL=your_deployed_website_url
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   ```

5. **Start development server** 🚀
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── (auth)/              # Authentication pages
│   ├── (dashboard)/         # Main dashboard
│   ├── (standalone)/        # Standalone pages
│   └── api/                 # API routes
├── components/
│   ├── ui/                  # Shadcn/UI components
│   └── *.tsx               # Feature components
├── features/
│   ├── auth/               # Authentication
│   ├── workspaces/         # Workspace management
│   ├── projects/           # Project management
│   ├── tasks/              # Task management
│   └── members/            # Team management
├── lib/                    # Utility libraries
├── hooks/                  # Custom React hooks
└── types/                  # TypeScript definitions
```

## 🔧 Core Features

### 📊 Project Management
- **Workspaces** - Organize projects by teams 🏢
- **Projects** - Create and manage projects 📁
- **Tasks** - Detailed task management 📋
- **Analytics** - Project performance insights 📈

### 🎯 Task Management
- **Kanban Boards** - Visual task organization 📋
- **Calendar View** - Timeline-based planning 📅
- **Table View** - Detailed task listing 📊
- **Drag & Drop** - Intuitive task movement 🎯

### 👥 Team Features
- **Member Management** - Add/remove team members 👥
- **Role-Based Access** - Permission control 🔐
- **Invite System** - Team invitation workflow 📧
- **Activity Tracking** - Monitor team progress 📊

### 🔐 Authentication
- **Appwrite Auth** - Secure authentication 🛡️
- **Session Management** - Persistent login 🔒
- **OAuth Support** - Social login options 🌐
- **Protected Routes** - Route guards 🛡️

## 🔗 API Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/auth/current` | Get current user | ✅ |
| `POST` | `/api/auth/login` | User login | ❌ |
| `POST` | `/api/auth/register` | User registration | ❌ |
| `GET` | `/api/workspaces` | Get workspaces | ✅ |
| `POST` | `/api/workspaces` | Create workspace | ✅ |
| `GET` | `/api/projects` | Get projects | ✅ |
| `POST` | `/api/projects` | Create project | ✅ |
| `GET` | `/api/tasks` | Get tasks | ✅ |
| `POST` | `/api/tasks` | Create task | ✅ |
| `GET` | `/api/members` | Get members | ✅ |

## 📊 Features Breakdown

### 🏢 Workspace Management
- 📁 Create workspaces
- ⚙️ Workspace settings
- 👥 Member invitations
- 📊 Analytics dashboard

### 📋 Project Management
- 🎯 Project creation
- 📝 Project details
- 🔄 Status tracking
- 📈 Progress monitoring

### 📝 Task Management
- ✅ Task creation
- 🏷️ Status updates
- 👤 Assignment system
- 📅 Due date tracking

### 👥 Team Collaboration
- 💬 Real-time updates
- 🔄 Activity feeds
- 📧 Notifications
- 👥 Team insights

## 🎨 UI Components

### 🎯 Shadcn/UI Components
- **Button** - Interactive buttons 🔘
- **Sheet** - Side panels 📄
- **Dialog** - Modal dialogs 💬
- **Form** - Form components 📝
- **Table** - Data tables 📊
- **Select** - Dropdown selects 📋
- **Checkbox** - Checkbox inputs ✅
- **Textarea** - Text areas 📝

### 🎨 Custom Components
- **Analytics Card** - Metric displays 📊
- **Date Picker** - Date selection 📅
- **Dotted Separator** - Visual dividers ➖
- **Mobile Sidebar** - Mobile navigation 📱
- **Responsive Modal** - Adaptive modals 📱

## 📱 Responsive Design

### 📲 Mobile Features
- **Touch-friendly** interface 👆
- **Drawer navigation** 📱
- **Optimized layouts** 📐
- **Gesture support** 🤏

### 🖥️ Desktop Features
- **Sidebar navigation** 📋
- **Keyboard shortcuts** ⌨️
- **Multi-panel views** 📊
- **Advanced interactions** 🖱️

## 🔒 Security Features

- **Authentication** via Appwrite 🔐
- **Role-based access** control 🛡️
- **Data validation** with Zod ✅
- **Secure API** endpoints 🔒
- **Environment variables** protection 🔐

## 📈 Performance

- **Next.js 15** optimizations 🚀
- **TanStack Query** caching ⚡
- **Server components** 🖥️
- **Code splitting** 📦
- **Image optimization** 🖼️

## 🔧 Development Scripts

```bash
# Development server
npm run dev

# Build production
npm run build

# Start production
npm start

# Lint code
npm run lint
```

## 🚀 Deployment

### Vercel Deployment
1. **Connect** GitHub repository 🔗
2. **Configure** environment variables ⚙️
3. **Deploy** automatically on push 🚀

### Environment Variables
- `NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID`
- `NEXT_PUBLIC_APPWRITE_PROJECT`
- `NEXT_PUBLIC_APPWRITE_DATABASE_ID`
- `NEXT_PUBLIC_APPWRITE_WORKSPACES_ID`
- `NEXT_PUBLIC_APPWRITE_MEMBERS_ID`
- `NEXT_PUBLIC_APPWRITE_PROJECTS_ID`
- `NEXT_PUBLIC_APPWRITE_TASKS_ID`
- `NEXT_PUBLIC_APPWRITE_KEY`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_APPWRITE_ENDPOINT`

## 📋 Requirements

- **Node.js:** ≥18.0.0 🟢
- **Appwrite:** Latest version 📊
- **Memory:** 1GB RAM minimum 💾
- **Storage:** 2GB disk space 💿

## 🤝 Contributing

1. Fork repository 🍴
2. Create feature branch (`git checkout -b feature/amazing-feature`) 🌟
3. Commit changes (`git commit -m 'Add amazing feature'`) 💾
4. Push branch (`git push origin feature/amazing-feature`) 🚀
5. Open Pull Request 📝

## 🐛 Known Issues

- None currently reported ✅

## 👨‍💻 Author

**Padmanabha Das**

- GitHub: [@chayan-1906](https://github.com/chayan-1906) 🐙
- LinkedIn: [Padmanabha Das](https://www.linkedin.com/in/padmanabha-das-59bb2019b/) 💼
- Email: padmanabhadas9647@gmail.com 📧

## 🌟 Show Your Support

Give a ⭐️ if this project helped you! 🙏

---

<div align="center">
  <p>Made with ❤️ by Padmanabha Das</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
