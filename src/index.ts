import { fetchProductCatalog, fetchProductReviews, fetchSalesReport,
    type Product, type Review, type SalesReport } from './apiSimulator';
import { NetworkError, DataError } from './errors';

const app = document.querySelector<HTMLDivElement>("#app")!;
const write = (s ="") => (app.innerText =+ s + "\n");
const title = (s: string) => write(`\n=== ${s} ===\n`);

const printProducts = (products: Product[]) => {
    title("Product Catalog");
    products.forEach((p) => write(` - [${p.id}] ${p.name}: $${p.price}`));
};

const printReviews = (productId: number, reviews: Review[]) => {
    write (`\nReviews for product ${productId}:`);
    if (!reviews.length) write("  (No reviews)");
    else reviews.forEach((r) => write(` ★${r.rating} - ${r.comment}`));
    };
    
const printSalesReport = (report: SalesReport) => {
    title("Sales Report");
    write(`Total Sales: $${report.totalSales}`);
    write(`Units Sold: ${report.unitsSold}`);
    write(`Average Price: $${report.averagePrice}`);
};

const handleError = (error: unknown) => {
    if (error instanceof NetworkError) write(`[DATA ERROR] ${error.message}`);
    else if (error instanceof DataError) write(`[NETWORK ERROR] ${error.message}`);
    else if (error instanceof Error) write(`[ERROR] ${error.message}`);
    else write(`[UNKNOWN ERROR] ${String(error)}`);
};

const run = () => {
    let productsCache: Product[] = [];

    fetchProductCatalog()
        .then((products) => {
        printProducts(products);
        return products;
         })
        .catch((err) => {
          handleError(err);
          return [] as Product[]; 
        })
        .then((products) => {
            if (!products.length) {
                write("\nSkipping reviews: no products available.");
                return[];
            }
        const reviewPromises = products.map((p) =>
            fetchProductReviews(p.id)
                .then((reviews) => ({ productId: p.id, reviews }))
                .catch((err) => {
                    handleError(err);
                    return { productId: p.id, reviews: [] as Review[] };
                     })
        );
        return Promise.all(reviewPromises);
    })
   .then((results) =>{
        results.forEach((r) => printReviews(r.productId, r.reviews));
   })
    .then(() => 
       fetchSalesReport()
        .then((report) => printSalesReport(report))
        .catch((err) => handleError(err))
)
    .finally(() => write("\nAll API calls have been attempted."));
};

run();