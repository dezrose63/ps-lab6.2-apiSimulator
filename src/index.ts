import { fetchProductCatalog, fetchProductReviews, fetchSalesReport } from './apiSimulator';

const $app = document.querySelector<HTMLDivElement>('#app')!;
const $catalogBtn = document.querySelector<HTMLButtonElement>('#btn-catalog')!;
const $reviewsBtn = document.querySelector<HTMLButtonElement>('#btn-reviews')!;
const $salesBtn = document.querySelector<HTMLButtonElement>('#btn-sales')!;
const $clearBtn = document.querySelector<HTMLButtonElement>('#btn-clear')!;
const $select = document.querySelector<HTMLSelectElement>('#product-select')!;

const write = (s = '') => {
  $app.innerText = ($app.innerText ? $app.innerText + '\n' : '') + s;
};

const setLoading = (el: HTMLButtonElement, on = true) => {
  el.disabled = on;
};

  async function loadCatalog() {
    setLoading($catalogBtn, true);
    try {
  write('\n=== Fetching product catalog ===');
      const products = await fetchProductCatalog();
      write(`Loaded ${products.length} products:`);
      // populate select
      $select.innerHTML = '<option value="">(choose a product)</option>';
      products.forEach(p => {
        const opt = document.createElement('option');
        opt.value = String(p.id);
        opt.textContent = `[#${p.id}] ${p.name} — $${p.price}`;
        $select.appendChild(opt);
      });
    } catch (err) {
      if (err instanceof Error) write(`[ERROR] ${err.message}`);
      else write(`[ERROR] ${String(err)}`);
    } finally {
      setLoading($catalogBtn, false);
    }
  }

  async function loadReviews() {
    const pid = Number($select.value);
    if (!pid) {
      write('Please select a product first.');
      return;
    }
    setLoading($reviewsBtn, true);
    try {
  write(`\n=== Fetching reviews for product ${pid} ===`);
      const reviews = await fetchProductReviews(pid);
      if (!reviews.length) write('  (no reviews)');
      else reviews.forEach(r => write(` ★${r.rating} — ${r.comment}`));
    } catch (err) {
      if (err instanceof Error) write(`[ERROR] ${err.message}`);
      else write(`[ERROR] ${String(err)}`);
    } finally {
      setLoading($reviewsBtn, false);
    }
  }
  
 async function loadSales() {
    setLoading($salesBtn, true);
    try {
  write('\n=== Fetching sales report ===');
      const report = await fetchSalesReport();
      write(`Total: $${report.totalSales}`);
      write(`Units sold: ${report.unitsSold}`);
      write(`Average: $${report.averagePrice}`);
    } catch (err) {
      if (err instanceof Error) write(`[ERROR] ${err.message}`);
      else write(`[ERROR] ${String(err)}`);
    } finally {
      setLoading($salesBtn, false);
    }
  }

$catalogBtn.addEventListener('click', loadCatalog);
$reviewsBtn.addEventListener('click', loadReviews);
$salesBtn.addEventListener('click', loadSales);
$clearBtn.addEventListener('click', () => { $app.innerText = ''; $select.innerHTML = '<option value=\"\">(load catalog first)</option>'; });

  //
async function run() {
  write('API Simulator started. Use the buttons to interact.');
}

// start
run();