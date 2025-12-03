'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { databases, ID, DATABASE_ID, BLOGS_COLLECTION_ID } from '@/lib/appwrite';
import { Query } from 'appwrite';
import { logout, getCurrentUser } from '@/lib/auth';
import AuthGuard from '@/components/AuthGuard';
import Button from '@/components/Button';

function AdminDashboardContent() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    readTime: '',
    image: null,
    imageUrl: '' // For storing the Hostinger URL
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

  // Handle image upload to Hostinger via FTP
  const handleImageUpload = async (file) => {
    try {
      setUploadingImage(true);
      const form = new FormData();
      form.append("file", file);

      console.log('Sending file to upload API:', file.name);

      const res = await fetch("/api/uploads", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      console.log('Upload API response:', data);

      if (!res.ok) {
        throw new Error(data.details || data.error || 'Upload failed');
      }

      return data.url; // Returns the Hostinger URL
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = editingBlog?.imageUrl || '';

      // Upload new image if provided
      if (formData.image) {
        console.log('Uploading new image:', formData.image.name);
        imageUrl = await handleImageUpload(formData.image);
        console.log('Image uploaded successfully:', imageUrl);
      }

      const blogData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        readTime: formData.readTime,
        imageUrl: imageUrl, // Store Hostinger URL instead of Appwrite imageId
        date: new Date().toISOString()
      };

      console.log('Saving blog with data:', blogData);

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
        image: null,
        imageUrl: ''
      });
      setImagePreview(null);
      setShowImageModal(false);
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
    setImagePreview(null); // Clear any previous preview
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      tags: blog.tags.join(', '),
      readTime: blog.readTime,
      image: null,
      imageUrl: blog.imageUrl || ''
    });
    setShowEditor(true);
    // Scroll to top to show the editor
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            {currentUser && (
              <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">
                Welcome, <span className="font-semibold">{currentUser.email}</span>
              </p>
            )}
          </div>
          <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
            <div onClick={() => {
              setShowEditor(!showEditor);
              setEditingBlog(null);
              setImagePreview(null);
              setFormData({
                title: '',
                excerpt: '',
                content: '',
                tags: '',
                readTime: '',
                image: null,
                imageUrl: ''
              });
            }}>
              <Button text={showEditor ? 'Cancel' : '+ New Blog'} fill />
            </div>
            <div onClick={handleLogout}>
              <Button text="Logout" fill />
            </div>
          </div>
        </div>

        {/* Editor Form */}
        {showEditor && (
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">
              {editingBlog ? 'Edit Blog' : 'Create New Blog'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 md:space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    Excerpt (Short Description)
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows="3"
                    className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    Content (Plain Text)
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows="10"
                    className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                    placeholder="Write your blog content here in plain text. Line breaks will be preserved."
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Vedic Astrology, Remedies, Career"
                    required
                  />
                </div>

                {/* Read Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., 8 min read"
                    required
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Featured Image {uploadingImage && <span className="text-orange-500 animate-pulse">(Uploading...)</span>}
                  </label>

                  {/* Upload Button - Always visible */}
                  <label
                    className={`relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${uploadingImage
                      ? 'border-orange-400 bg-orange-50'
                      : imagePreview
                        ? 'border-green-400 bg-green-50 hover:bg-green-100'
                        : 'border-gray-300 bg-gray-50 hover:bg-orange-50 hover:border-orange-400'
                      }`}
                  >
                    <div className="flex flex-col items-center justify-center py-4">
                      {imagePreview ? (
                        <>
                          <div className="w-10 h-10 mb-2 text-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-green-700">Image Selected</p>
                          <p className="text-xs text-gray-500 mt-1 max-w-[200px] truncate">{formData.image?.name}</p>
                          <p className="text-xs text-orange-600 mt-1">Click to change</p>
                        </>
                      ) : editingBlog?.imageUrl ? (
                        <>
                          <div className="w-10 h-10 mb-2 text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-blue-700">Current Image Exists</p>
                          <p className="text-xs text-orange-600 mt-1">Click to replace</p>
                        </>
                      ) : (
                        <>
                          <div className="w-10 h-10 mb-2 text-orange-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                          </div>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold text-orange-600">Click to upload</span> image
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF or WebP</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setFormData(prev => ({ ...prev, image: file }));
                          const previewUrl = URL.createObjectURL(file);
                          setImagePreview(previewUrl);
                          setShowImageModal(true);
                        }
                      }}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>

                  {/* Action buttons below upload zone */}
                  <div className="flex gap-2 mt-2">
                    {(imagePreview || editingBlog?.imageUrl) && (
                      <button
                        type="button"
                        onClick={() => setShowImageModal(true)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Preview
                      </button>
                    )}
                    {imagePreview && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, image: null }));
                          setImagePreview(null);
                        }}
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Remove
                      </button>
                    )}
                  </div>

                  {!formData.image && !imagePreview && editingBlog?.imageId && !editingBlog?.imageUrl && (
                    <p className="text-sm text-gray-500 mt-1">
                      Current image stored in Appwrite (leave empty to keep)
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading || uploadingImage}
                  text={loading ? 'Saving...' : (editingBlog ? 'Update Blog' : 'Publish Blog')}
                  fill
                  fullWidth
                />
              </div>
            </form>
          </div>
        )}

        {/* Blogs List */}
        <div className="bg-white/90 rounded-xl shadow-lg p-4 md:p-6 lg:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">
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
                  className="border border-gray-200 rounded-lg p-3 md:p-4 lg:p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 mb-3 line-clamp-2">{blog.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {blog.tags?.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-orange-100 text-orange-600 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs md:text-sm text-gray-500">
                        {blog.readTime} • {new Date(blog.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-row md:flex-row gap-2 md:ml-4">
                      <div onClick={() => handleEdit(blog)} className="flex-1 md:flex-none">
                        <Button text="Edit" />
                      </div>
                      <div onClick={() => handleDelete(blog.$id)} className="flex-1 md:flex-none">
                        <Button text="Delete" fill />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Image Preview</h3>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body - Image */}
            <div className="p-4 bg-gray-100">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-white shadow-inner">
                <Image
                  src={imagePreview || editingBlog?.imageUrl}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
              </div>
              {formData.image && (
                <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <span className="font-medium">{formData.image.name}</span>
                  <span className="text-gray-400">•</span>
                  <span>{(formData.image.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
              <label className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-lg font-medium cursor-pointer transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Change Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setFormData(prev => ({ ...prev, image: file }));
                      const previewUrl = URL.createObjectURL(file);
                      setImagePreview(previewUrl);
                    }
                  }}
                  className="hidden"
                  disabled={uploadingImage}
                />
              </label>

              <div className="flex gap-2">
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, image: null }));
                      setImagePreview(null);
                      setShowImageModal(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    Remove
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowImageModal(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
