document.getElementById('search').onkeyup = function () {
  const resultsContainer = document.getElementById('results');

  if (this.value) {
    if (!resultsContainer.classList.contains('show-results')) {
      resultsContainer.classList.add('show-results');
    }
  } else {
    if (resultsContainer.classList.contains('show-results')) {
      resultsContainer.classList.remove('show-results');
    }
  }
};
