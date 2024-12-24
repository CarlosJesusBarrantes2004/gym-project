const getFilter = (status) => {
  let whereClause = '';
  const today = new Date().toISOString().split('T')[0];

  switch (status) {
    case 'active':
      whereClause = `WHERE end_date > DATE('${today}') 
                              AND DATE(end_date) > DATE('${today}', '+3 days')`;
      break;
    case 'expiring':
      whereClause = `WHERE DATE(end_date) BETWEEN DATE('${today}') 
                              AND DATE('${today}', '+3 days')`;
      break;
    case 'expired':
      whereClause = `WHERE DATE(end_date) < DATE('${today}')`;
      break;
    default:
      whereClause = '';
  }

  return whereClause;
};

export default getFilter;
