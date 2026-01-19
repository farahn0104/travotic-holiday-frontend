import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../features/blogs/blogsSlice';
import { Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
    const dispatch = useDispatch();
    const { items: blogs, loading } = useSelector((state) => state.blogs);

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    return (
        <div className="pt-20 min-h-screen">
            <div className="bg-gray-900 text-white py-20 text-center">
                <h1 className="text-4xl font-bold">Travel Blog</h1>
                <p className="mt-4 text-gray-400">Tips, guides, and stories from the road.</p>
            </div>

            <div className="container-custom section-padding">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map(blog => (
                            <article key={blog.id} className="bg-white rounded-brand shadow-lg overflow-hidden hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full">
                                <div className="h-48 overflow-hidden relative group">
                                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                        <span className="flex items-center gap-1"><User size={14} /> {blog.author}</span>
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {blog.date}</span>
                                    </div>
                                    <Link to={`/blog/${blog.id}`}>
                                        <h2 className="text-xl font-bold mb-3 hover:text-primary cursor-pointer line-clamp-2">{blog.title}</h2>
                                    </Link>
                                    <p className="text-gray-600 mb-4 line-clamp-3 flex-1">{blog.summary}</p>
                                    <Link to={`/blog/${blog.id}`} className="text-primary font-bold hover:underline mt-auto inline-block">Read More →</Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
