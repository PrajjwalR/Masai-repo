function evaluateEmployeePerformance(employees) {
  return employees
    .filter(emp => emp.tasksCompleted > 5)

    .map(emp => {
      let performance;
      if (emp.rating > 4.5) {
        performance = "Excellent";
      } else if (emp.rating >= 3) {
        performance = "Good";
      } else {
        performance = "Needs Improvement";
      }

      return {
        name: emp.name,
        performance
      };
    })

    .sort((a, b) => {
      const rank = {
        "Excellent": 3,
        "Good": 2,
        "Needs Improvement": 1
      };
      return rank[b.performance] - rank[a.performance];
    });
}
