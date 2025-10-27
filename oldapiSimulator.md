
// Create an apiSimulator.ts file:

// This file will contain functions that simulate API requests using Promises.
// Each function should return a Promise that resolves with mock data after a delay, or rejects with an error message.


interface Product {
    id: number;
    name: string;
    price: number;
}

export const fetchProductCatalog = (): Promise<{ id: number; name: string; price: number }[]> => {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() < 0.8) {
        resolve([
            { id: 1, name: "Laptop", price: 1200 },
            { id: 2, name: "Headphones", price: 200 },
        ]);
        } else {
        reject("Failed to fetch product catalog");
        }
    }, 1000);
    });
};

function getProductDetails() {
    return new Promise<Product>((resolve, _reject) => {
        const product: Product = {id: 4, name: "Keyboard", price: 50}

        setTimeout(() => resolve(product), 1000)
    });
}

function getProductReviews() {
    return new Promise<string[]>((resolve, _reject) => {
        const reviews: string[] = ['good prodect', 'excellent product'];
        setTimeout(() => resolve(reviews), 1000);
    })
}

function getRelatedProducts() {
    return new Promise<Product[]>((resolve, _reject) => {
        setTimeout(() => _reject("Error fetching data"), 100);
    })
}   

Promise.race([getProductDetails(), getProductReviews(), getRelatedProducts()])
    .then(data => console.log(data))
    .catch(e => console.error(e));

getProductDetails()
    .then(product => {
        console.log(product)
        return getProductReviews();
    })
    .then(reviews => {
        console.log(reviews);
        return getRelatedProducts();
    })
    .then(relatedProducts => console.log(relatedProducts));

async function fetchUsers() {
  try {
    // fetch data from an API
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    // parse the json data
    const users = await response.json();
    // users data
    console.log(users);
  } catch (e) {
    console.error(e);
  } finally {
    console.log("finally");
  }
}

fetchUsers();

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .catch((e) => console.error(e))
  .then((users) => console.log(users))
  .catch((e) => console.error(e));


async function fetchComments() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/comments");
        const comments = await response.json();
        console.log(comments);
        return comments;
    } catch (error) {
        console.error(error);
    } finally{
        console.log("Data fetched");
    }
}

try {
    const comments = await fetchComments();
    comments.forEach(comment => console.log(comment.body))
} catch (error) {
    console.error(error)
}

