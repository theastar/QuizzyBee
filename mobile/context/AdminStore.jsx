import { create } from 'zustand';

// Mock data for users
const initialMockUsers = [
  {
    id: '1',
    name: 'Elphaba Thropp',
    email: 'greengal@gmail.com',
    studentId: '2023341290',
    status: 'active',
    joinedDate: 'Jan 15, 2025',
    lastActive: '10m ago',
    quizzesCreated: 5,
    flashcardsCreated: 7,
    notesCreated: 2,
  },
  {
    id: '2',
    name: 'Althea Navales',
    email: 'navales.althea001@gmail.com',
    studentId: '2023341291',
    status: 'active',
    joinedDate: 'Jan 20, 2025',
    lastActive: '18m ago',
    quizzesCreated: 8,
    flashcardsCreated: 5,
    notesCreated: 12,
  },
  {
    id: '3',
    name: 'Rogin Lagrosas',
    email: 'lagrosas.rogin1@gmail.com',
    studentId: '2023341292',
    status: 'active',
    joinedDate: 'Jan 22, 2025',
    lastActive: '1h ago',
    quizzesCreated: 15,
    flashcardsCreated: 10,
    notesCreated: 8,
  },
  {
    id: '4',
    name: 'Galinda Upland',
    email: 'glindaglow@gmail.com',
    studentId: '2023341293',
    status: 'active',
    joinedDate: 'Jan 18, 2025',
    lastActive: '3h ago',
    quizzesCreated: 0,
    flashcardsCreated: 0,
    notesCreated: 0,
  },
  {
    id: '5',
    name: 'Dorothy Gale',
    email: 'overtherainbow@gmail.com',
    studentId: '2023341294',
    status: 'active',
    joinedDate: 'Jan 10, 2025',
    lastActive: '2 weeks ago',
    quizzesCreated: 3,
    flashcardsCreated: 2,
    notesCreated: 1,
  },
  {
    id: '6',
    name: 'Fiyero Tigelaar',
    email: 'emeraldbae@gmail.com',
    studentId: '2023341295',
    status: 'active',
    joinedDate: 'Feb 1, 2025',
    lastActive: '3 days ago',
    quizzesCreated: 5,
    flashcardsCreated: 7,
    notesCreated: 9,
  },
  {
    id: '7',
    name: 'Boq Woodsman',
    email: 'heartlessboq@gmail.com',
    studentId: '2023341296',
    status: 'active',
    joinedDate: 'Feb 5, 2025',
    lastActive: '2 days ago',
    quizzesCreated: 10,
    flashcardsCreated: 6,
    notesCreated: 4,
  },
  {
    id: '8',
    name: 'Nessarose Thropp',
    email: 'rubyheels@gmail.com',
    studentId: '2023341297',
    status: 'active',
    joinedDate: 'Feb 7, 2025',
    lastActive: '1 day ago',
    quizzesCreated: 7,
    flashcardsCreated: 4,
    notesCreated: 3,
  },
];

export const useAdminStore = create((set) => ({
  users: initialMockUsers,
  currentUserId: '1', // You can keep this as the first user for now
  
  // Update user
  updateUser: (userId, updates) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, ...updates } : user
      ),
    })),
  
  // Delete user
  deleteUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    })),
  
  // Add user
  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),
  
  // Set current user ID
  setCurrentUserId: (userId) =>
    set({ currentUserId: userId }),
}));
