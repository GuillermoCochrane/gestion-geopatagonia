window.addEventListener('load', () => {
  const $startDate = document.querySelector('#inicio_carga');
  const $endDate = document.querySelector('#fin_carga');
  const $filterForm = document.querySelector('#filter-form');
  const $filterButton = document.querySelector('#filter-button');

  const chechDates = () => {
    notOlderThanEndValidation($startDate, $endDate);
  };

  // Listeners
  $startDate && $startDate.addEventListener('input', chechDates);
  $endDate && $endDate.addEventListener('input', chechDates);

  $filterButton.addEventListener('click', (e) => {
    e.preventDefault();
    chechDates();
    if (Object.keys(errors).length == 0) {
      $filterForm.submit();
    }
  });
});