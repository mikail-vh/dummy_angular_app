export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
}

export const users: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    position: 'Software Engineer',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+1234567890',
    position: 'Product Manager',
  },
  {
    id: '3',
    firstName: 'Jim',
    lastName: 'Beam',
    email: 'jim.beam@example.com',
    phone: '+1234567890',
    position: 'Marketing Manager',
  },
  {
    id: '4',
    firstName: 'Jill',
    lastName: 'Johnson',
    email: 'jill.johnson@example.com',
    phone: '+1234567890',
    position: 'Junior Sales Consultant',
  },
  {
    id: '5',
    firstName: 'Jack',
    lastName: 'Brown',
    email: 'jack.brown@example.com',
    phone: '+1234567890',
    position: 'IT Manager',
  },
  {
    id: '6',
    firstName: 'Jake',
    lastName: 'Johnson',
    email: 'jake.johnson@example.com',
    phone: '+1234567890',
    position: 'Sales Manager',
  },
]
