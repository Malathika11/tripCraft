const flightFilterDefaults = {
  departureTime: [
    {
      id: 'all',
      value: 'All',
      icon: 'cls-1-arrival',
      select: true
    },
    {
      id: 'morning',
      value: 'Morning',
      icon: 'cls-1-arrival',
      select: false
    },
    {
      id: 'afternoon',
      value: 'Afternoon',
      icon: 'cls-1-arrival',
      select: false
    },
    {
      id: 'evening',
      value: 'Evening',
      icon: 'cls-1-arrival',
      select: false
    },
    {
      id: 'night',
      value: 'Night',
      icon: 'cls-1-arrival',
      select: false
    }
  ]
};

module.exports = {
  flightFilterDefaults
};