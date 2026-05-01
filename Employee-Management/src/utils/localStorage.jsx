const employees = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@company.com',
    password: '123',
    role: 'employee',
    tasks: [
      {
        id: 101,
        title: 'Update API Documentation',
        description: 'Update the REST API docs for all v2 endpoints including auth, users, and billing.',
        date: '2026-05-10',
        category: 'Documentation',
        active: false,
        newTask: true,
        failed: false,
        completed: false,
      },
      {
        id: 102,
        title: 'Fix Login Session Bug',
        description: 'Resolve the session timeout issue that causes users to be logged out prematurely.',
        date: '2026-05-08',
        category: 'Bug Fix',
        active: true,
        newTask: false,
        failed: false,
        completed: false,
      },
    ],
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob@company.com',
    password: '123',
    role: 'employee',
    tasks: [
      {
        id: 201,
        title: 'Design Analytics Dashboard',
        description: 'Create wireframes and high-fidelity mockups for the new analytics dashboard.',
        date: '2026-05-12',
        category: 'Design',
        active: false,
        newTask: true,
        failed: false,
        completed: false,
      },
      {
        id: 202,
        title: 'Write Unit Tests for Payments',
        description: 'Achieve 90% coverage on the payment processing module.',
        date: '2026-05-06',
        category: 'Testing',
        active: false,
        newTask: false,
        failed: false,
        completed: true,
      },
    ],
  },
  {
    id: 3,
    firstName: 'Carol',
    lastName: 'Davis',
    email: 'carol@company.com',
    password: '123',
    role: 'employee',
    tasks: [
      {
        id: 301,
        title: 'Deploy to Staging',
        description: 'Deploy the latest release candidate to the staging environment and run smoke tests.',
        date: '2026-05-07',
        category: 'DevOps',
        active: false,
        newTask: false,
        failed: true,
        completed: false,
      },
      {
        id: 302,
        title: 'Refactor Auth Middleware',
        description: 'Clean up legacy auth middleware and move to the new JWT-based approach.',
        date: '2026-05-14',
        category: 'Refactor',
        active: false,
        newTask: true,
        failed: false,
        completed: false,
      },
    ],
  },
]

const admin = {
  id: 0,
  firstName: 'Admin',
  email: 'admin@company.com',
  password: 'admin123',
  role: 'admin',
}

export const getLocalStorage = () => {
  const stored = localStorage.getItem('employees')
  if (!stored) {
    localStorage.setItem('employees', JSON.stringify(employees))
    return employees
  }
  return JSON.parse(stored)
}

export const setLocalStorage = (data) => {
  localStorage.setItem('employees', JSON.stringify(data))
}

export const getAdmin = () => admin
