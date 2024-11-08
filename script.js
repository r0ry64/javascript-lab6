function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function randomFailure() {
    return Math.random() < 0.5; // 50% chance of failure
}

function fetchUserProfile() {
    return new Promise(async (resolve, reject) => {
        await delay(1000);
        if (randomFailure()) {
            return reject("Failed to fetch user profile");
        }
        resolve({ id: 1, name: "Steven Seagal" });
    });
}

function fetchPosts(userId) {
    return new Promise(async (resolve, reject) => {
        await delay(1500);
        if (randomFailure()) {
            return reject("Failed to fetch posts");
        }
        resolve([
            { id: 1, title: "Post 1", content: "This is the first post!" },
            { id: 2, title: "Post 2", content: "This is another post!!" }
        ]);
    });
}

function fetchComments(postId) {
    return new Promise(async (resolve, reject) => {
        await delay(1000);
        if (randomFailure()) {
            return reject("Failed to fetch comments");
        }
        resolve([
            { id: 1, postId, comment: "First!!" },
            { id: 2, postId, comment: "This is another comment." }
        ]);
    });
}

async function fetchSequential() {
    try {
        console.log("Fetching user profile...");
        const user = await fetchUserProfile();
        console.log("User profile retrieved:", user);

        console.log("Fetching posts...");
        const posts = await fetchPosts(user.id);
        console.log("Posts retrieved:", posts);

        console.log("Fetching comments for the first post...");
        const comments = await fetchComments(posts[0].id);
        console.log("Comments retrieved:", comments);
    }
    catch (error) {
        console.error("Error:", error);
    }
}

fetchSequential();

async function fetchParallel() {
    try {
        console.log("Fetching all data in parallel...");
        const [user, posts, comments] = await Promise.all([
            fetchUserProfile(),
            fetchPosts(1),
            fetchComments(1)
        ]);
        console.log("User profile:", user);
        console.log("Posts:", posts);
        console.log("Comments:", comments);
    }
    catch (error) {
        console.error("Error:", error);
    }
}

fetchParallel();

async function getUserProfile() {
    await delay(1000);
    if (randomFailure()) throw new Error("Failed to fetch user profile");
    return { id: 1, name: "Steven Seagal" };
}

async function getPosts(userId) {
    await delay(1500);
    if (randomFailure()) throw new Error("Failed to fetch posts");
    return [
        { id: 1, title: "Post 1", content: "This is a post" },
        { id: 2, title: "Post 2", content: "This is another post" }
    ];
}

async function getComments(postId) {
    await delay(1000);
    if (randomFailure()) throw new Error("Failed to fetch comments");
    return [
        { id: 1, postId, comment: "lol!" },
        { id: 2, postId, comment: "hi" }
    ];
}

async function getUserContent() {
    try {
        console.log("Fetching user profile...");
        const user = await getUserProfile();
        console.log("User profile retrieved:", user);

        console.log("Fetching posts...");
        const posts = await getPosts(user.id);
        console.log("Posts retrieved:", posts);

        console.log("Fetching comments for the first post...");
        const comments = await getComments(posts[0].id);
        console.log("Comments retrieved:", comments);

        console.log("\nFinal combined result:");
        console.log({ user, posts, comments });
    } catch (error) {
        console.error("Error:", error.message);
    }
}

getUserContent();
  
  
  

