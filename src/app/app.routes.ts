import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { authGuard } from './guards/auth-guard';
import { TeamCreate } from './components/teams/team-create/team-create';
import { TeamList } from './components/teams/team-list/team-list';
import { TeamCard } from './components/teams/team-card/team-card';
import { TaskBoard } from './components/tasks/task-board/task-board';
import { TaskEdit } from './components/tasks/task-edit/task-edit';
import { TaskCreate } from './components/tasks/task-create/task-create';
import { ProjectList } from './components/projects/project-list/project-list';
import { ProjectCreate } from './components/projects/project-create/project-create';
import { Header } from './components/shared/header/header';
import { Sidebar } from './components/shared/sidebar/sidebar';


export const routes: Routes = [
    {
     path: 'login',
     component: Login, 
     title: 'login - Task Management'
    },
    {
     path: 'register', 
     component: Register, 
     title: 'register - Task Management'
    },

  { 
    path: 'teams', 
    component: TeamList,
    canActivate: [authGuard],
    title: 'הצוותים שלי'
  },
  { 
    path: 'teams/create', 
    component: TeamCreate,
    canActivate: [authGuard],
    title: 'יצירת צוות חדש'
  },
  { 
  path: 'teams/:id', 
  component: TeamCard,
  canActivate: [authGuard]
  ,title: 'פרטי צוות'},
    { path: '', redirectTo: '/teams', pathMatch: 'full' },

// --- Projects ---
{ 
  path: 'projects/:teamId/create', 
  component: ProjectCreate,
  canActivate: [authGuard],
  title: 'יצירת פרויקט חדש'
},
{ 
  path: 'projects/:teamId', 
  component: ProjectList,
  canActivate: [authGuard],
  title: 'פרויקטים'
},
{ 
  path: 'projects', 
  component: ProjectList, 
  canActivate: [authGuard],
  title: 'כל הפרויקטים'
},

// --- Tasks ---
{ 
  path: 'tasks/:projectId/create', 
  component: TaskCreate,
  canActivate: [authGuard],
  title: 'יצירת משימה חדשה'
},
{ 
  path: 'tasks/:projectId/edit/:taskId',
  component: TaskEdit,
  canActivate: [authGuard],
  title: 'עריכת משימה'
},
{ 
  path: 'tasks/:projectId', 
  component: TaskBoard,
  canActivate: [authGuard],
  title: 'לוח משימות'
},
{ 
  path: 'tasks', 
  component: TaskBoard, 
  canActivate: [authGuard],
  title: 'כל המשימות'
},

  { 
    path: '**', 
    redirectTo: '/teams' 
  }
];
