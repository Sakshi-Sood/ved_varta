'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { databases, ID, DATABASE_ID, BLOGS_COLLECTION_ID, storage, STORAGE_BUCKET_ID } from '@/lib/appwrite';
import { Query } from 'appwrite';
import { logout, getCurrentUser } from '@/lib/auth';
import AuthGuard from '@/components/AuthGuard';

function AdminDashboardContent() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    readTime: '',
    image: null
  });

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        DATABASE_ID,
        BLOGS_COLLECTION_ID,
        [Query.orderDesc('$createdAt')]
      );
      setBlogs(response.documents);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      alert('Failed to fetch blogs. Please check your Appwrite configuration.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    loadUser();
  }, []);

  // Load current user
  const loadUser = async () => {
    const user = await getCurrentUser();
    setCurrentUser(user);
  };

  // Handle logout
  const handleLogout = async () => {
    if (!confirm('Are you sure you want to logout?')) return;
    
    const result = await logout();
    if (result.success) {
      router.push('/admin/login');
    } else {
      alert('Failed to logout: ' + result.error);
    }
  };

  // Handle image upload
  const handleImageUpload = async (file) => {
    try {
      const response = await storage.createFile(
        STORAGE_BUCKET_ID,
        ID.unique(),
        file
      );
      return response.$id;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageId = editingBlog?.imageId;

      // Upload new image if provided
      if (formData.image) {
        imageId = await handleImageUpload(formData.image);
      }

      const blogData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        readTime: formData.readTime,
        imageId: imageId || '',
        date: new Date().toISOString()
      };

      if (editingBlog) {
        // Update existing blog
        await databases.updateDocument(
          DATABASE_ID,
          BLOGS_COLLECTION_ID,
          editingBlog.$id,
          blogData
        );
        alert('Blog updated successfully!');
      } else {
        // Create new blog
        await databases.createDocument(
          DATABASE_ID,
          BLOGS_COLLECTION_ID,
          ID.unique(),
          blogData
        );
        alert('Blog created successfully!');
      }

      // Reset form
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        tags: '',
        readTime: '',
        image: null
      });
      setShowEditor(false);
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save blog: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit blog
  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      tags: blog.tags.join(', '),
      readTime: blog.readTime,
      image: null
    });
    setShowEditor(true);
  };

  // Handle delete blog
  const handleDelete = async (blogId) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      setLoading(true);
      await databases.deleteDocument(
        DATABASE_ID,
        BLOGS_COLLECTION_ID,
        blogId
      );
      alert('Blog deleted successfully!');
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            {currentUser && (
              <p className="text-gray-600 mt-2">
                Welcome, <span className="font-semibold">{currentUser.email}</span>
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowEditor(!showEditor);
                setEditingBlog(null);
                setFormData({
                  title: '',
                  excerpt: '',
                  content: '',
                  tags: '',
                  readTime: '',
                  image: null
                });
              }}
              className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all shadow-lg"
            >
              {showEditor ? 'Cancel' : '+ New Blog'}
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Editor Form */}
        {showEditor && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {editingBlog ? 'Edit Blog' : 'Create New Blog'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Excerpt (Short Description)
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Content (Plain Text)
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows="15"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                    required
                    placeholder="Write your blog content here in plain text. Line breaks will be preserved."
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Vedic Astrology, Remedies, Career"
                    required
                  />
                </div>

                {/* Read Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., 8 min read"
                    required
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Featured Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {!formData.image && editingBlog && (
                    <p className="text-sm text-gray-500 mt-1">
                      Leave empty to keep current image
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-700 transition-all shadow-lg disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (editingBlog ? 'Update Blog' : 'Publish Blog')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Blogs List */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Published Blogs ({blogs.length})
          </h2>

          {loading && !showEditor ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              <p className="mt-4 text-gray-600">Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No blogs yet. Create your first blog post!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div
                  key={blog.$id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{blog.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {blog.tags?.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">
                        {blog.readTime} • {new Date(blog.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog.$id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AuthGuard>
      <AdminDashboardContent />
    </AuthGuard>
  );
}
