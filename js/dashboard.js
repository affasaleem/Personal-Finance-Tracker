/* =============================================
   FinTrack - Dashboard & Charts JavaScript
   dashboard.js
   ============================================= */

$(document).ready(function () {

  /* ========================================
     Chart.js Global Defaults
     ======================================== */
  if (typeof Chart !== 'undefined') {
    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
    Chart.defaults.color = '#64748B';
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.legend.labels.padding = 20;

    /* ---- 1. Income vs Expense Bar Chart ---- */
    var barCtx = document.getElementById('incomeExpenseChart');
    if (barCtx) {
      var incomeExpenseChart = new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Income',
              data: [4200, 4500, 4100, 4800, 5200, 4900, 5500, 5100, 5800, 5400, 6000, 6200],
              backgroundColor: 'rgba(37, 99, 235, 0.85)',
              borderRadius: 8,
              borderSkipped: false
            },
            {
              label: 'Expenses',
              data: [2800, 3100, 2600, 3200, 3500, 3100, 3800, 3400, 4000, 3700, 4100, 4200],
              backgroundColor: 'rgba(239, 68, 68, 0.75)',
              borderRadius: 8,
              borderSkipped: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { position: 'top' },
            tooltip: {
              callbacks: {
                label: function (ctx) {
                  return ' $' + ctx.parsed.y.toLocaleString();
                }
              }
            }
          },
          scales: {
            x: { grid: { display: false }, border: { display: false } },
            y: {
              grid: { color: 'rgba(0,0,0,0.05)', drawBorder: false },
              border: { display: false },
              ticks: {
                callback: function (value) { return '$' + (value / 1000).toFixed(0) + 'k'; }
              }
            }
          }
        }
      });
    }

    /* ---- 2. Monthly Spending Line Chart ---- */
    var lineCtx = document.getElementById('spendingLineChart');
    if (lineCtx) {
      var gradientLine = lineCtx.getContext('2d').createLinearGradient(0, 0, 0, 300);
      gradientLine.addColorStop(0,   'rgba(6, 182, 212, 0.3)');
      gradientLine.addColorStop(1,   'rgba(6, 182, 212, 0.02)');

      var spendingLineChart = new Chart(lineCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Spending',
              data: [2800, 3100, 2600, 3200, 3500, 3100, 3800, 3400, 4000, 3700, 4100, 4200],
              borderColor: '#06B6D4',
              backgroundColor: gradientLine,
              borderWidth: 3,
              pointBackgroundColor: '#06B6D4',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 7,
              fill: true,
              tension: 0.4
            },
            {
              label: 'Savings',
              data: [1400, 1400, 1500, 1600, 1700, 1800, 1700, 1700, 1800, 1700, 1900, 2000],
              borderColor: '#10B981',
              backgroundColor: 'transparent',
              borderWidth: 2,
              pointBackgroundColor: '#10B981',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6,
              borderDash: [6, 4],
              fill: false,
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { position: 'top' },
            tooltip: {
              callbacks: {
                label: function (ctx) {
                  return ' $' + ctx.parsed.y.toLocaleString();
                }
              }
            }
          },
          scales: {
            x: { grid: { display: false }, border: { display: false } },
            y: {
              grid: { color: 'rgba(0,0,0,0.05)' },
              border: { display: false },
              ticks: {
                callback: function (v) { return '$' + (v / 1000).toFixed(1) + 'k'; }
              }
            }
          }
        }
      });
    }

    /* ---- 3. Expense Doughnut Chart ---- */
    var doughCtx = document.getElementById('expenseDoughnutChart');
    if (doughCtx) {
      var doughnutChart = new Chart(doughCtx, {
        type: 'doughnut',
        data: {
          labels: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Health'],
          datasets: [{
            data: [28, 15, 20, 10, 18, 9],
            backgroundColor: ['#2563EB','#06B6D4','#10B981','#F59E0B','#EF4444','#7C3AED'],
            borderColor: '#fff',
            borderWidth: 3,
            hoverOffset: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          cutout: '68%',
          plugins: {
            legend: { position: 'bottom', labels: { padding: 16 } },
            tooltip: {
              callbacks: {
                label: function (ctx) {
                  return ' ' + ctx.label + ': ' + ctx.parsed + '%';
                }
              }
            }
          }
        }
      });
    }

    /* ---- 4. Reports - Income Analysis Bar Chart ---- */
    var incomeReportCtx = document.getElementById('incomeReportChart');
    if (incomeReportCtx) {
      new Chart(incomeReportCtx, {
        type: 'bar',
        data: {
          labels: ['Salary', 'Freelance', 'Business', 'Investments', 'Other'],
          datasets: [{
            label: 'Income Sources ($)',
            data: [48000, 12000, 8500, 5400, 2100],
            backgroundColor: [
              'rgba(37,99,235,0.85)',
              'rgba(6,182,212,0.85)',
              'rgba(16,185,129,0.85)',
              'rgba(245,158,11,0.85)',
              'rgba(124,58,237,0.85)'
            ],
            borderRadius: 8,
            borderSkipped: false
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, border: { display: false } },
            y: {
              grid: { color: 'rgba(0,0,0,0.05)' },
              border: { display: false },
              ticks: { callback: function (v) { return '$' + (v/1000).toFixed(0) + 'k'; } }
            }
          }
        }
      });
    }

    /* ---- 5. Reports - Expense Pie Chart ---- */
    var expenseReportCtx = document.getElementById('expenseReportChart');
    if (expenseReportCtx) {
      new Chart(expenseReportCtx, {
        type: 'pie',
        data: {
          labels: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Health'],
          datasets: [{
            data: [28, 15, 20, 10, 18, 9],
            backgroundColor: ['#2563EB','#06B6D4','#10B981','#F59E0B','#EF4444','#7C3AED'],
            borderColor: '#fff',
            borderWidth: 3,
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'right' },
            tooltip: {
              callbacks: { label: function(c){ return ' ' + c.label + ': ' + c.parsed + '%'; } }
            }
          }
        }
      });
    }

    /* ---- 6. Reports - Savings Line Chart ---- */
    var savingsReportCtx = document.getElementById('savingsReportChart');
    if (savingsReportCtx) {
      var savGrad = savingsReportCtx.getContext('2d').createLinearGradient(0, 0, 0, 280);
      savGrad.addColorStop(0, 'rgba(16,185,129,0.3)');
      savGrad.addColorStop(1, 'rgba(16,185,129,0.02)');

      new Chart(savingsReportCtx, {
        type: 'line',
        data: {
          labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
          datasets: [{
            label: 'Cumulative Savings',
            data: [1400,2800,4300,5900,7600,9400,11100,12800,14600,16300,18200,20200],
            borderColor: '#10B981',
            backgroundColor: savGrad,
            borderWidth: 3,
            pointBackgroundColor: '#10B981',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'top' } },
          scales: {
            x: { grid: { display: false }, border: { display: false } },
            y: {
              grid: { color: 'rgba(0,0,0,0.05)' },
              border: { display: false },
              ticks: { callback: function(v){ return '$' + (v/1000).toFixed(0) + 'k'; } }
            }
          }
        }
      });
    }

    /* ---- 7. Reports - Budget Bar Chart ---- */
    var budgetReportCtx = document.getElementById('budgetReportChart');
    if (budgetReportCtx) {
      new Chart(budgetReportCtx, {
        type: 'bar',
        data: {
          labels: ['Housing','Food','Transport','Savings','Entertainment','Utilities'],
          datasets: [
            {
              label: 'Budget',
              data: [1500, 600, 300, 500, 200, 250],
              backgroundColor: 'rgba(37,99,235,0.2)',
              borderColor: 'rgba(37,99,235,0.6)',
              borderWidth: 2,
              borderRadius: 6,
              borderSkipped: false
            },
            {
              label: 'Spent',
              data: [1500, 520, 280, 420, 190, 230],
              backgroundColor: 'rgba(16,185,129,0.8)',
              borderColor: 'rgba(16,185,129,1)',
              borderWidth: 2,
              borderRadius: 6,
              borderSkipped: false
            }
          ]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'top' } },
          scales: {
            x: { grid: { display: false }, border: { display: false } },
            y: {
              grid: { color: 'rgba(0,0,0,0.05)' },
              border: { display: false },
              ticks: { callback: function(v){ return '$' + v; } }
            }
          }
        }
      });
    }

    /* ---- 8. Income page charts ---- */
    var incomeSourceCtx = document.getElementById('incomeSourceChart');
    if (incomeSourceCtx) {
      new Chart(incomeSourceCtx, {
        type: 'doughnut',
        data: {
          labels: ['Salary', 'Freelance', 'Business', 'Investments', 'Other'],
          datasets: [{
            data: [62, 18, 10, 7, 3],
            backgroundColor: ['#2563EB','#06B6D4','#10B981','#F59E0B','#7C3AED'],
            borderColor: '#fff',
            borderWidth: 3,
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          cutout: '65%',
          plugins: {
            legend: { position: 'bottom', labels: { padding: 14 } },
            tooltip: {
              callbacks: { label: function(c){ return ' ' + c.label + ': ' + c.parsed + '%'; } }
            }
          }
        }
      });
    }

    var incomeTrendCtx = document.getElementById('incomeTrendChart');
    if (incomeTrendCtx) {
      var incGrad = incomeTrendCtx.getContext('2d').createLinearGradient(0, 0, 0, 280);
      incGrad.addColorStop(0, 'rgba(37,99,235,0.3)');
      incGrad.addColorStop(1, 'rgba(37,99,235,0.02)');

      new Chart(incomeTrendCtx, {
        type: 'line',
        data: {
          labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
          datasets: [{
            label: 'Monthly Income',
            data: [4200,4500,4100,4800,5200,4900,5500,5100,5800,5400,6000,6200],
            borderColor: '#2563EB',
            backgroundColor: incGrad,
            borderWidth: 3,
            pointBackgroundColor: '#2563EB',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'top' } },
          scales: {
            x: { grid: { display: false }, border: { display: false } },
            y: {
              grid: { color: 'rgba(0,0,0,0.05)' },
              border: { display: false },
              ticks: { callback: function(v){ return '$' + (v/1000).toFixed(1) + 'k'; } }
            }
          }
        }
      });
    }

  } // end if Chart

  /* ========================================
     Expense Form Logic
     ======================================== */
  var expenses = [
    { id:1, date:'2024-12-10', desc:'Grocery Shopping',   cat:'Food',          amount:142.50, status:'Completed' },
    { id:2, date:'2024-12-09', desc:'Uber Ride',           cat:'Transport',     amount:18.00,  status:'Completed' },
    { id:3, date:'2024-12-08', desc:'Netflix Subscription',cat:'Entertainment', amount:15.99,  status:'Completed' },
    { id:4, date:'2024-12-07', desc:'H&M Clothing',        cat:'Shopping',      amount:89.99,  status:'Pending'   },
    { id:5, date:'2024-12-06', desc:'Electricity Bill',    cat:'Bills',         amount:120.00, status:'Completed' },
    { id:6, date:'2024-12-05', desc:'Doctor Visit',        cat:'Health',        amount:55.00,  status:'Completed' },
    { id:7, date:'2024-12-04', desc:'Restaurant Dinner',   cat:'Food',          amount:68.00,  status:'Completed' },
    { id:8, date:'2024-12-03', desc:'Bus Pass',            cat:'Transport',     amount:45.00,  status:'Pending'   }
  ];

  function getCategoryBadge(cat) {
    var map = {
      'Food':          'bg-green-soft',
      'Transport':     'bg-cyan-soft',
      'Shopping':      'bg-purple-soft',
      'Entertainment': 'bg-yellow-soft',
      'Bills':         'bg-red-soft',
      'Health':        'bg-blue-soft'
    };
    var icons = {
      'Food':'🍕', 'Transport':'🚗', 'Shopping':'🛍️', 'Entertainment':'🎬', 'Bills':'⚡', 'Health':'💊'
    };
    return '<span class="tx-category-badge ' + (map[cat]||'bg-blue-soft') + '">' + (icons[cat]||'📌') + ' ' + cat + '</span>';
  }
  function getStatusBadge(s) {
    var cls = s === 'Completed' ? 'status-completed' : s === 'Pending' ? 'status-pending' : 'status-failed';
    var dot = s === 'Completed' ? '●' : s === 'Pending' ? '○' : '✕';
    return '<span class="status-badge ' + cls + '">' + dot + ' ' + s + '</span>';
  }

  function renderExpenseTable(data) {
    var $tbody = $('#expense-table-body');
    if (!$tbody.length) return;
    $tbody.empty();
    if (!data.length) {
      $tbody.append('<tr><td colspan="6" class="text-center py-5 text-muted"><i class="bi bi-inbox fs-1 d-block mb-2 opacity-25"></i>No expenses found</td></tr>');
      return;
    }
    data.forEach(function (ex) {
      $tbody.append(
        '<tr>' +
        '<td data-label="Date">' + ex.date + '</td>' +
        '<td data-label="Description"><strong>' + ex.desc + '</strong></td>' +
        '<td data-label="Category">' + getCategoryBadge(ex.cat) + '</td>' +
        '<td data-label="Amount" class="tx-amount-negative">-$' + ex.amount.toFixed(2) + '</td>' +
        '<td data-label="Status">' + getStatusBadge(ex.status) + '</td>' +
        '<td data-label="Actions">' +
          '<button class="btn btn-sm btn-outline-danger btn-delete-expense" data-id="' + ex.id + '" style="border-radius:6px;font-size:.8rem"><i class="bi bi-trash"></i></button>' +
        '</td>' +
        '</tr>'
      );
    });
  }

  renderExpenseTable(expenses);

  /* Add Expense */
  $('#add-expense-form').on('submit', function (e) {
    e.preventDefault();
    var desc   = $('#expense-desc').val().trim();
    var cat    = $('#expense-cat').val();
    var amount = parseFloat($('#expense-amount').val());
    var date   = $('#expense-date').val();
    var status = $('#expense-status').val() || 'Completed';

    if (!desc || !cat || !amount || !date) {
      showToast('Please fill in all fields.', 'warning');
      return;
    }

    var newExpense = { id: Date.now(), date: date, desc: desc, cat: cat, amount: amount, status: status };
    expenses.unshift(newExpense);
    renderExpenseTable(expenses);
    $(this)[0].reset();
    showToast('Expense added successfully! 💸', 'success');
  });

  /* Delete Expense */
  $(document).on('click', '.btn-delete-expense', function () {
    var id = $(this).data('id');
    expenses = expenses.filter(function (ex) { return ex.id !== id; });
    renderExpenseTable(expenses);
    showToast('Expense removed.', 'error');
  });

  /* Filter Expenses */
  $(document).on('click', '.filter-btn[data-filter]', function () {
    $('.filter-btn[data-filter]').removeClass('active');
    $(this).addClass('active');
    var filter = $(this).data('filter');
    var today  = new Date();

    var filtered = expenses.filter(function (ex) {
      var d = new Date(ex.date);
      var diff = (today - d) / (1000 * 60 * 60 * 24);
      if (filter === 'daily')   return diff < 1;
      if (filter === 'weekly')  return diff < 7;
      if (filter === 'monthly') return diff < 30;
      return true; // yearly / all
    });
    renderExpenseTable(filtered);
  });

  /* ---- Income Form ---- */
  var incomes = [
    { id:1, date:'2024-12-01', source:'Salary',      amount:4500, note:'Monthly salary - December' },
    { id:2, date:'2024-11-20', source:'Freelancing',  amount:850,  note:'Web design project' },
    { id:3, date:'2024-11-15', source:'Investments',  amount:320,  note:'Dividend payment' },
    { id:4, date:'2024-11-05', source:'Business',     amount:1200, note:'Consulting fee' }
  ];

  function renderIncomeTable(data) {
    var $tbody = $('#income-table-body');
    if (!$tbody.length) return;
    $tbody.empty();
    data.forEach(function(inc) {
      $tbody.append(
        '<tr>' +
        '<td data-label="Date">'   + inc.date   + '</td>' +
        '<td data-label="Source"><strong>' + inc.source + '</strong></td>' +
        '<td data-label="Note" class="text-muted">' + inc.note + '</td>' +
        '<td data-label="Amount" class="tx-amount-positive">+$' + inc.amount.toLocaleString() + '</td>' +
        '<td data-label="Actions"><button class="btn btn-sm btn-outline-danger btn-delete-income" data-id="' + inc.id + '" style="border-radius:6px;font-size:.8rem"><i class="bi bi-trash"></i></button></td>' +
        '</tr>'
      );
    });
  }
  renderIncomeTable(incomes);

  $('#add-income-form').on('submit', function(e) {
    e.preventDefault();
    var source = $('#income-source').val();
    var amount = parseFloat($('#income-amount').val());
    var date   = $('#income-date').val();
    var note   = $('#income-note').val().trim();
    if (!source || !amount || !date) { showToast('Fill all required fields.', 'warning'); return; }
    incomes.unshift({ id: Date.now(), date: date, source: source, amount: amount, note: note || '-' });
    renderIncomeTable(incomes);
    $(this)[0].reset();
    showToast('Income recorded! 💰', 'success');
  });

  $(document).on('click', '.btn-delete-income', function() {
    var id = $(this).data('id');
    incomes = incomes.filter(function(i){ return i.id !== id; });
    renderIncomeTable(incomes);
    showToast('Income entry removed.', 'error');
  });

  /* ---- Budget Progress Animation ---- */
  if ($('.progress-fill').length) {
    setTimeout(function () {
      $('.progress-fill').each(function () {
        var target = $(this).data('width');
        $(this).css('width', target + '%');
      });
    }, 400);
  }

  /* ---- Goals: Add Amount to Goal ---- */
  $(document).on('click', '.btn-add-to-goal', function() {
    var $card  = $(this).closest('.goal-card');
    var target  = parseFloat($card.data('target'));
    var current = parseFloat($card.data('current'));
    var amount  = parseFloat(prompt('Enter amount to add to this goal ($):'));
    if (isNaN(amount) || amount <= 0) return;
    current = Math.min(current + amount, target);
    var pct = ((current / target) * 100).toFixed(1);
    $card.data('current', current);
    $card.find('.goal-saved').text('$' + current.toLocaleString());
    $card.find('.goal-remaining').text('$' + (target - current).toLocaleString() + ' remaining');
    $card.find('.progress-fill').css('width', pct + '%');
    $card.find('.goal-pct').text(pct + '%');
    if (current >= target) {
      showToast('🎉 Congratulations! Goal achieved!', 'success');
    } else {
      showToast('Added $' + amount + ' to your goal!', 'success');
    }
  });

  /* ---- Contact Form ---- */
  $('#contact-form').on('submit', function(e) {
    e.preventDefault();
    var name    = $('#contact-name').val().trim();
    var email   = $('#contact-email').val().trim();
    var subject = $('#contact-subject').val().trim();
    var message = $('#contact-message').val().trim();
    if (!name || !email || !subject || !message) {
      showToast('Please fill in all fields.', 'warning');
      return;
    }
    var $btn = $(this).find('[type="submit"]');
    $btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2"></span>Sending...');
    setTimeout(function() {
      showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
      $('#contact-form')[0].reset();
      $btn.prop('disabled', false).html('<i class="bi bi-send me-2"></i>Send Message');
    }, 1800);
  });

  /* ---- Export Report Button ---- */
  $('#export-report-btn').on('click', function() {
    showToast('Report exported! Check your downloads folder.', 'success');
  });

  /* ---- Date defaults ---- */
  var today = new Date().toISOString().split('T')[0];
  $('input[type="date"]').val(today);

}); // end document.ready
