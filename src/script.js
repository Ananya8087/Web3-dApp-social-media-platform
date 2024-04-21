// Define contract ABI (you can obtain this from the compiled smart contract)
const contractABI = [
    // Define your contract's ABI here
    
       
    
];

// Define contract address (you'll get this after deploying your contract)
const contractAddress = '0x2...';

// Initialize Web3
let web3;

// Check if Web3 is injected by the browser (e.g., MetaMask)
if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
} else {
    // Fallback to localhost provider
    web3 = new Web3('http://localhost:8545');
}


// Initialize contract instance
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

// Function to create a post
// Function to create a post
async function createPost() {
    try {
        
        const accounts = await web3.eth.requestAccounts();
        console.log('Default account:', accounts[0]);

        const content = document.getElementById('postContent').value;
        await contractInstance.methods.createPost(content).send({ from: accounts[0] });
        console.log('Post created successfully');
        // Optionally, trigger a function to refresh the UI after creating a post
        displayPosts();
    } catch (error) {
        console.error('Error creating post:', error);
    }
}


// Function to display posts
async function displayPosts() {
    try {
        const postCount = await contractInstance.methods.postCount().call();
        console.log('Post count:', postCount);
        
        const postsContainer = document.getElementById('postsContainer');
        postsContainer.innerHTML = ''; // Clear existing posts
        
        for (let i = 1; i <= postCount; i++) {
            const post = await contractInstance.methods.posts(i).call();
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <p>Author: ${post.author}</p>
                <p>${post.content}</p>
                <p>Likes: ${post.likes}</p>
                <button onclick="likePost(${post.id})">Like</button>
            `;
            postsContainer.appendChild(postElement);
        }
    } catch (error) {
        console.error('Error retrieving posts:', error);
    }
}


// Function to like a post
async function likePost(postId) {
    await contractInstance.methods.likePost(postId).send({ from: web3.eth.defaultAccount });
    displayPosts();
}

// Initialize default account and display posts
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('Default account:', accounts[0]);
        displayPosts();
    } catch (error) {
        console.error('Error initializing default account:', error);
    }
});
