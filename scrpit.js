const apiEndpoint = 'https://api.coingecko.com/api/v3/coins/markets';
    const queryParams = '?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

    // Fetch data using .then
    fetch(apiEndpoint + queryParams)
      .then(response => response.json())
      .then(data => renderTable(data))
      .catch(error => console.error('Error fetching data:', error));

    // Fetch data using async/await
    async function fetchDataAsync() {
      try {
        const response = await fetch(apiEndpoint + queryParams);
        const data = await response.json();
        renderTable(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    function renderTable(data) {
      const tableBody = document.querySelector('#cryptoTable tbody');
      tableBody.innerHTML = '';

      data.forEach(item => {
        const row = tableBody.insertRow();
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.id}</td>
          <td><img src="${item.image}" alt="${item.name}" width="20"></td>
          <td>${item.symbol}</td>
          <td>${item.current_price}</td>
          <td>${item.total_volume}</td>
        `;
      });
    }

    function filterData() {
      const searchInput = document.getElementById('search').value.toLowerCase();
      const filteredData = originalData.filter(item => item.name.toLowerCase().includes(searchInput));
      renderTable(filteredData);
    }

    function sortByMarketCap() {
      const sortedData = originalData.slice().sort((a, b) => a.market_cap - b.market_cap);
      renderTable(sortedData);
    }

    function sortByPercentageChange() {
      const sortedData = originalData.slice().sort((a, b) => a.percentage_change - b.percentage_change);
      renderTable(sortedData);
    }