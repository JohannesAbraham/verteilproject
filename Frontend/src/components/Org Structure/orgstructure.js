export const defaultProfilePic = 'https://via.placeholder.com/50';
export const profilePictures = {
  '1': 'https://randomuser.me/api/portraits/men/1.jpg', // Jerrin Jos
  '2': 'https://randomuser.me/api/portraits/men/2.jpg', // Satheesh Satchit
  '3': 'https://randomuser.me/api/portraits/men/3.jpg', // Nevin Perumana
  '4': 'https://randomuser.me/api/portraits/men/4.jpg', // Vinod S
  '5': 'https://randomuser.me/api/portraits/men/5.jpg', // Abdul Bijur
  '6': 'https://randomuser.me/api/portraits/men/6.jpg', // Prajoth Kumar
  '7': 'https://randomuser.me/api/portraits/men/7.jpg', // Idicula Philip
  '28': 'https://randomuser.me/api/portraits/men/8.jpg', // Anandhu M B
  '29': 'https://randomuser.me/api/portraits/men/9.jpg', // Meera C
};

const OverviewTree = {
  id: 40,  // Starting from 4
  title: 'CEO',
  expanded: true,
  children: [
    {
      id: 41,
      title: 'Product Head',
      expanded: false,
      children: [
        {

          title: 'BA Team',
          id: 42,
          expanded: false,
          children: [
            {
    
              title: 'Product Team',
              id: 43,
              expanded: false,
              children: []
            },
            {
    
              title: 'API Integrations Team',
              id: 44,
              expanded: false,
              children: []
            },
            {
    
              title: 'Airline Integrations Team',
              id: 45,
              expanded: false,
              children: []
            },
            {
    
              title: 'UX Designer',
              id: 46,
              expanded: false,
              children: []
            }
          ]
        },
        {

          title: 'Customer Success Team',
          id: 47,
          expanded: false,
          children: [
            {
    
              title: 'Customer Support',
              id: 48,
              expanded: false,
              children: []
            },
            {
    
              title: 'Customer Success Team',
              id: 49,
              expanded: false,
              children: []
            }
          ]
        },
        {

          title: 'Account Management',
          id: 50,
          expanded: true,
          children: [
            {}
          ]
        },
        {

          title: 'Sales Team',
          id: 51,
          expanded: false,
          children: [
            {
    
              title: 'Customer Onboarding',
              id: 52,
              expanded: false,
              children: []
            }
          ]
        }
      ]
    },
    {
      title: 'Technology Head',
      id: 52,
      expanded: false,
      children: []
    },
    {
      title: 'Engineering Head',
      id: 53,
      expanded: false,
      children: []
    },
    {
      title: 'Growth Head',
      id: 54,
      expanded: false,
      children: []
    },
    {
      title: 'Business Development Head',
      id: 55,
      expanded: false,
      children: []
    },
    {
      title: 'People Operations Head',
      id: 56,
      expanded: false,
      children: []
    }
  ]
};

const LeadershipTree = {
  id: '1',
  title: 'CEO',
  name: 'Jerrin Jos',
  expanded: true,
  children: [
    {
      id: '2',
      title: 'Product Head',
      name: 'Satheesh Satchit',
      expanded: false,
      children: [
        { id: '8', title: 'BA Team', name: '' },
        { id: '9', title: 'Customer Success', name: '' },
        { id: '10', title: 'Account Management', name: '' },
        { id: '11', title: 'Sales', name: '' },
      ]
    },
    {
      id: '3',
      title: 'Technology Head',
      name:'Nevin Perumana',
      expanded: false,
      children: [
        { id: '12', title: 'DevOps', name:'' },
        { id: '13', title: 'Tech Group', name:'' }
      ]
    },
    {
      id: '4',
      title: 'Engineering Head',
      name:'Vinod S',
      expanded: false,
      children: [
        { id: '14', title: 'Offer Management', name:'' },
        { id: '15', title: 'Order Management', name:'' },
        { id: '16', title: 'Payment Management', name:'' },
        { id: '17', title: 'Admin Platform Management', name:'' },
        { id: '18', title: 'V4 -OMS', name:'' },
        { id: '19', title: 'AIT Dev', name:'' },
      ]
    },
    {
      id: '5',
      title: 'Growth Head',
      name:'Abdul Bijur',
      expanded: false,
      children: [
        { id: '20', title: 'OC Operations', name:'' },
        { id: '21', title: 'OC Sales', name:'' },
        { id: '22', title: 'OC Dev', name:'' },
      ]
    },
    {
      id: '6',
      title: 'Business Development Head',
      name:'Prajoth Kumar',
      expanded: false,
      children: [
        { id: '23', title: 'Pre Sales Team', name:'' },
        { id: '24', title: 'Marketing', name:'' }
      ]
    },
    {
      id: '7',
      title: 'People Operations Head',
      name:'Idicula Philip',
      expanded: false,
      children: [
        { id: '25', title: 'HR Team', name:'' },
        { id: '26', title: 'Finance Team', name:'' },
        { id: '27', title: 'Operations Team', name:'' },
      ]
    },
  ]
};

const  CeoOfficeTree = {
  id: '1',
  title: 'CEO',
  name: 'Jerrin Jos',
  expanded: true,
  children: [
    { 
      id: '28', 
      title: 'Executive Assistant', 
      name: 'Anandhu M B',
      expanded: false
    },
    { 
      id: '29', 
      title: 'Company Secretary', 
      name: 'Meera C',
      expanded: false
    }
  ]
};

export const teamNames = [
    "Overview",
    "Leadership Team",
    "CEO's Office",
    "Product Operations and Customer Successes",
    "Product Team",
    "Product Team - AIT",
    "Product Team - API",
    "Customer Support Team",
    "Technical Support Team",
    "Account Management",
    "Sales",
    "Customer Onboarding Team",
    "DevOps and Tech Team",
    "Engineering Stream - Leads",
    "Engineering - Admin",
    "Engineering - V4",
    "Engineering - Payment",
    "Engineering - Offer Management I",
    "Engineering - Offer Management II",
    "Engineering - Order Management I",
    "Engineering - Order Management II",
    "Engineering - Offer Management AIT",
    "Engineering - Order Management AIT",
    "Engineering - Open Connect",
    "Engineering - QA Central",
    "Engineering - UI Stream",
    "Growth - Open Connections Operations",
    "Growth – OC Customer Support",
    "Business Development",
    "People Operations - HR",
    "People Operations - Finance"
];




export const teamTrees = {
  0: OverviewTree,  
  1: LeadershipTree,       
  2: CeoOfficeTree,
  3: {},
  4: {},
  5: {},
  6: {},
  7: {},
  8: {},
  9: {},
  10: {},
  11: {},
  12: {},
  13: {},
  14: {},
  15: {},
  16: {},
  17: {},
  18: {},
  19: {},
  20: {},
  21: {},
  22: {},
  23: {},
  24: {},
  25: {},
  26: {},
  27: {},
  28: {},
  29: {},
  30: {},
  31: {},
  // Add more trees as needed
};

export const getTreeForTab = (index) => {
  return teamTrees[index] ? JSON.parse(JSON.stringify(teamTrees[index])) : 
         JSON.parse(JSON.stringify(LeadershipTree));
};