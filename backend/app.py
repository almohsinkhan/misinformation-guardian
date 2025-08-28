from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Flask app
app = Flask(__name__)

# Initialize Firebase Admin
cred = credentials.Certificate("misinformation-guardian-193-mk-f9f6a131a1f2.json")
firebase_admin.initialize_app(cred)

# Firestore client
db = firestore.client()
posts_ref = db.collection("posts")
users_ref = db.collection("users")

# -----------------------------
# CREATE a new user
# -----------------------------
@app.route("/users", methods=["POST"])
def create_user():
    data = request.json
    name = data.get("name")
    email = data.get("email")

    if not name or not email:
        return jsonify({"error": "Name and email are required"}), 400

    new_user = {
        "name": name,
        "email": email,
        "createdAt": firestore.SERVER_TIMESTAMP
    }

    doc_ref = users_ref.add(new_user)
    return jsonify({"id": doc_ref[1].id, "message": "User created"}), 201


# -----------------------------
# GET all users
# -----------------------------
@app.route("/users", methods=["GET"])
def get_users():
    docs = users_ref.stream()
    users = [{"id": doc.id, **doc.to_dict()} for doc in docs]
    return jsonify(users), 200


# -----------------------------
# GET single user by ID
# -----------------------------
@app.route("/users/<user_id>", methods=["GET"])
def get_user(user_id):
    doc = users_ref.document(user_id).get()
    if doc.exists:
        return jsonify({"id": doc.id, **doc.to_dict()}), 200
    else:
        return jsonify({"error": "User not found"}), 404


# -----------------------------
# UPDATE user by ID
# -----------------------------
@app.route("/users/<user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.json
    user_ref = users_ref.document(user_id)
    if not user_ref.get().exists:
        return jsonify({"error": "User not found"}), 404

    user_ref.update({
        "name": data.get("name", user_ref.get().to_dict()["name"]),
        "email": data.get("email", user_ref.get().to_dict()["email"]),
        "updatedAt": firestore.SERVER_TIMESTAMP
    })
    return jsonify({"success": True})


# -----------------------------
# DELETE user by ID (cascade delete posts)
# -----------------------------
@app.route("/users/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    user_ref = users_ref.document(user_id)
    if not user_ref.get().exists:
        return jsonify({"error": "User not found"}), 404

    # Delete all posts by this user
    posts_query = posts_ref.where("authorId", "==", user_id).stream()
    for post in posts_query:
        posts_ref.document(post.id).delete()

    # Delete user
    user_ref.delete()
    return jsonify({"success": True, "message": "User and their posts deleted"}), 200


# -----------------------------
# CREATE a new post (check if user exists)
# -----------------------------
@app.route("/posts", methods=["POST"])
def create_post():
    data = request.json
    author_id = data.get("authorId")

    # Check if user exists
    if not users_ref.document(author_id).get().exists:
        return jsonify({"error": "Author does not exist"}), 400

    new_post = {
        "title": data.get("title"),
        "content": data.get("content"),
        "authorId": author_id,
        "createdAt": firestore.SERVER_TIMESTAMP
    }

    doc_ref = posts_ref.add(new_post)
    return jsonify({"id": doc_ref[1].id, "message": "Post created successfully!"}), 201


# -----------------------------
# GET all posts
# -----------------------------
@app.route("/posts", methods=["GET"])
def get_posts():
    docs = posts_ref.stream()
    posts = [{"id": doc.id, **doc.to_dict()} for doc in docs]
    return jsonify(posts), 200


# -----------------------------
# GET single post by ID
# -----------------------------
@app.route("/posts/<post_id>", methods=["GET"])
def get_post(post_id):
    doc = posts_ref.document(post_id).get()
    if doc.exists:
        return jsonify({"id": doc.id, **doc.to_dict()}), 200
    return jsonify({"error": "Post not found"}), 404


# -----------------------------
# UPDATE a post
# -----------------------------
@app.route("/posts/<post_id>", methods=["PUT"])
def update_post(post_id):
    data = request.json
    post_ref = posts_ref.document(post_id)
    post = post_ref.get()
    if not post.exists:
        return jsonify({"error": "Post not found"}), 404

    post_ref.update({
        "title": data.get("title", post.to_dict().get("title")),
        "content": data.get("content", post.to_dict().get("content")),
        "timestamp": firestore.SERVER_TIMESTAMP
    })
    return jsonify({"success": True})


# -----------------------------
# DELETE a post
# -----------------------------
@app.route("/posts/<post_id>", methods=["DELETE"])
def delete_post(post_id):
    doc_ref = posts_ref.document(post_id)
    if doc_ref.get().exists:
        doc_ref.delete()
        return jsonify({"success": True, "message": "Post deleted"}), 200
    return jsonify({"success": False, "error": "Post not found"}), 404


# -----------------------------
# Run the app
# -----------------------------
if __name__ == "__main__":
    app.run(debug=True)
