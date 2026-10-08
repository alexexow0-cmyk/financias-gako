document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  const currentYear = document.getElementById('currentYear');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  const formatCurrency = (value) => new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);

  const calculateMonthlySavings = (goal, years, rate) => {
    const monthlyRate = Number(rate) / 100 / 12;
    const months = Number(years) * 12;

    if (!goal || !years || !rate) {
      return 0;
    }

    if (monthlyRate === 0) {
      return goal / months;
    }

    return (goal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  };

  const calculateLoanPayment = (principal, annualRate, months) => {
    const monthlyRate = annualRate / 100 / 12;

    if (monthlyRate === 0) {
      return principal / months;
    }

    return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  };

  const savingsForm = document.getElementById('savingsForm');
  const savingsResult = document.getElementById('savingsResult');

  if (savingsForm && savingsResult) {
    savingsForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const goalAmount = Number(document.getElementById('goalAmount').value || 0);
      const years = Number(document.getElementById('goalYears').value || 0);
      const rate = Number(document.getElementById('goalRate').value || 0);
      const monthly = calculateMonthlySavings(goalAmount, years, rate);
      savingsResult.textContent = `${formatCurrency(monthly)} / mes`;
    });
  }

  const loanForm = document.getElementById('loanForm');
  const loanResult = document.getElementById('loanResult');

  if (loanForm && loanResult) {
    loanForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const principal = Number(document.getElementById('loanPrincipal').value || 0);
      const annualRate = Number(document.getElementById('loanRate').value || 0);
      const months = Number(document.getElementById('loanMonths').value || 0);
      const monthlyPayment = calculateLoanPayment(principal, annualRate, months);
      loanResult.textContent = formatCurrency(monthlyPayment);
    });
  }

  const budgetForm = document.getElementById('budgetForm');
  const budgetResult = document.getElementById('budgetResult');
  const budgetNote = document.getElementById('budgetNote');

  if (budgetForm && budgetResult && budgetNote) {
    budgetForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const income = Number(document.getElementById('income').value || 0);
      const housing = Number(document.getElementById('housing').value || 0);
      const food = Number(document.getElementById('food').value || 0);
      const transport = Number(document.getElementById('transport').value || 0);
      const leisure = Number(document.getElementById('leisure').value || 0);
      const others = Number(document.getElementById('others').value || 0);

      const totalExpenses = housing + food + transport + leisure + others;
      const surplus = income - totalExpenses;

      budgetResult.textContent = `${formatCurrency(surplus)} disponibles`;

      if (surplus >= 0) {
        budgetNote.textContent = 'Buen balance: puedes destinar parte de este importe a ahorro o inversión.';
      } else {
        budgetNote.textContent = 'Tu gasto supera tus ingresos. Considera ajustar algunos apartados del presupuesto.';
      }
    });
  }

  const surveyForm = document.getElementById('surveyForm');
  const surveyMessage = document.getElementById('surveyMessage');

  if (surveyForm && surveyMessage) {
    surveyForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const goalType = document.getElementById('goalType').value;
      const level = document.getElementById('experienceLevel').value;

      const labels = {
        ahorro: 'ahorro',
        deuda: 'deuda',
        inversion: 'inversión',
        presupuesto: 'presupuesto'
      };

      const levelLabel = {
        principiante: 'principiante',
        intermedio: 'intermedio',
        avanzado: 'avanzado'
      };

      surveyMessage.textContent = `Gracias por responder. Hemos identificado que tu prioridad es ${labels[goalType]} y tu nivel es ${levelLabel[level]}.`;
      surveyForm.reset();
    });
  }
});









































































