// Define contract ABI (you can obtain this from the compiled smart contract)
const contractABI = [
    // Define your contract's ABI here
    
    
    
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_content",
                    "type": "string"
                }
            ],
            "name": "createPost",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_postId",
                    "type": "uint256"
                }
            ],
            "name": "likePost",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "author",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "content",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "createdAt",
                    "type": "uint256"
                }
            ],
            "name": "PostCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "liker",
                    "type": "address"
                }
            ],
            "name": "PostLiked",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_postId",
                    "type": "uint256"
                }
            ],
            "name": "getPostLikers",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "postCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "posts",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "author",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "content",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "createdAt",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "likes",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    
    
    
];

// Define contract address (you'll get this after deploying your contract)
const contractAddress = '0x19d3857ecE840a726021eC4479435D78FB191089';

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
        const postsContainer = document.getElementById('postsContainer');
        postsContainer.innerHTML = '';  // Clear previous posts

        for (let i = 1; i <= postCount; i++) {
            let post = await contractInstance.methods.posts(i).call();
            let postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <p>${post.content}</p>
                <p>Author: ${post.author}</p>
                <p>Likes: ${post.likes} <button onclick="likePost(${post.id})">Like</button></p>
            `;
            postsContainer.appendChild(postElement);

            // Display likers for this post
            const likers = await contractInstance.methods.getPostLikers(i).call();
            const likersContainer = document.createElement('div');
            likersContainer.innerHTML = `Likers: ${likers.join(', ')}`;
            postElement.appendChild(likersContainer);
        }
    } catch (error) {
        console.error('Error retrieving posts:', error);
    }
}
async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];  // This will have the user's first account.
}


// Function to like a post
async function likePost(postId) {
    try {
        const fromAddress = await getAccount();  // Ensure you have the user's address.

        await contractInstance.methods.likePost(postId).send({ from: fromAddress });
        console.log('Post liked successfully');
    } catch (error) {
        console.error('Error liking the post:', error);
    }
}
async function displayLikers(postId) {
    const likers = await contract.methods.getPostLikers(postId).call();
    console.log(`Likers for Post ID ${postId}:`, likers);
    // You can further process likers array to display in your UI
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
