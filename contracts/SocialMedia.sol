pragma solidity ^0.8.0;

contract SocialMedia {
    struct Post {
        uint256 id;
        address author;
        string content;
        uint256 createdAt;
        uint256 likes;
        mapping(address => bool) likedBy;
        // Add more fields as needed
    }

    mapping(uint256 => Post) public posts;
    uint256 public postCount;

    event PostCreated(uint256 id, address author, string content, uint256 createdAt);

    function createPost(string memory _content) public {
        // Increment post count
        postCount++;
        // Add post to posts mapping
        posts[postCount] = Post(postCount, msg.sender, _content, block.timestamp, 0);
        // Emit event
        emit PostCreated(postCount, msg.sender, _content, block.timestamp);
    }

    // Add more functions for commenting, liking, following, etc.
}
