export const mockContact = {
  id: '1',
  name: 'Mireya Conner',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  isOnline: true,
};

export const mockCurrentUser = {
  id: '2',
  name: 'John',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
};

export const mockMessages = [
  {
    id: '1',
    type: 'text',
    content: 'Hey John, I am looking for the best admin template. Could you please help me to find it out? 😊',
    timestamp: '4:02 PM',
    sender: mockContact,
  },
  {
    id: '2',
    type: 'text',
    content: 'Stack admin is the responsive bootstrap 4 admin template.',
    timestamp: '4:02 PM',
    sender: mockCurrentUser,
  },
  {
    id: '3',
    type: 'text',
    content: 'Looks clean and fresh UI. 😊',
    timestamp: '4:02 PM',
    sender: mockContact,
  },
  {
    id: '4',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    timestamp: '4:02 PM',
    sender: mockContact,
  },
];
