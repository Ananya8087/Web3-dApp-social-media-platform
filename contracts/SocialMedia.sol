pragma solidity ^0.8.0;

contract SocialMedia {
    struct Post {
        uint256 id;
        address author;
        string content;
        uint256 createdAt;
        uint256 likes;
        mapping(address => bool) likedBy; // Nested mapping
    }

    mapping(uint256 => Post) public posts;
    uint256 public postCount;

    event PostCreated(uint256 id, address author, string content, uint256 createdAt);
    event PostLiked(uint256 id, address liker);

    function createPost(string memory _content) public {
        // Increment post count
        postCount++;
        // Initialize the post in the mapping
        posts[postCount].id = postCount;
        posts[postCount].author = msg.sender;
        posts[postCount].content = _content;
        posts[postCount].createdAt = block.timestamp;
        posts[postCount].likes = 0;
        // Emit event
        emit PostCreated(postCount, msg.sender, _content, block.timestamp);
    }

    function likePost(uint256 _postId) public {
        require(_postId > 0 && _postId <= postCount, "Invalid post ID");
        require(!posts[_postId].likedBy[msg.sender], "Post already liked by this user");

        // Increment like count
        posts[_postId].likes++;
        // Mark post as liked by the user
        posts[_postId].likedBy[msg.sender] = true;

        // Emit event
        emit PostLiked(_postId, msg.sender);
    }
}
