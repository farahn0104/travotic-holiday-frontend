import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../features/blogs/blogsSlice';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Heart, Clock, Tag, X } from 'lucide-react';

const BlogDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { items: allBlogs, loading, error: reduxError } = useSelector((state) => state.blogs);

    const [blog, setBlog] = useState(null);
    const [blogs, setBlogs] = useState([]); // Other blogs
    const [activeSection, setActiveSection] = useState('latest');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (allBlogs.length === 0) {
            dispatch(fetchBlogs());
        }
    }, [dispatch, allBlogs.length]);

    useEffect(() => {
        if (allBlogs.length > 0) {
            const foundBlog = allBlogs.find(b => b.id == id);
            if (foundBlog) {
                setBlog(foundBlog);
                setBlogs(allBlogs.filter(b => b.id != id));
                setError(null);
            } else {
                setError("Blog not found");
            }
        } else if (reduxError) {
            setError(reduxError);
        }
        window.scrollTo(0, 0);
    }, [id, allBlogs, reduxError]);

    if (loading) return (
        <div className="h-screen flex justify-center items-center bg-gray-50">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                <p className="text-gray-500 font-medium">Loading Article...</p>
            </div>
        </div>
    );

    if (error || !blog) return (
        <div className="h-screen flex flex-col justify-center items-center gap-6 bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="text-red-500" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Article Not Found</h2>
                <p className="text-gray-500 mb-6">We couldn't find the article you're looking for. It might have been moved or deleted.</p>
                <Link to="/blog" className="btn-primary w-full flex items-center justify-center gap-2">
                    <ArrowLeft size={18} /> Back to Blog
                </Link>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Reading Progress Indicator (Optional enhancement could go here) */}

            {/* Header Section */}
            <div className="relative h-[60vh] w-full">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 container-custom pb-16">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors font-medium backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
                        <ArrowLeft size={16} /> Back to Blogs
                    </Link>
                    <span className="block text-primary font-bold tracking-widest uppercase text-sm mb-2">Travel Guide</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl">{blog.title}</h1>

                    <div className="flex flex-wrap items-center gap-6 text-white/90">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary text-white font-bold">
                                {blog.author.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-sm">{blog.author}</p>
                                <p className="text-xs text-white/70">Travel Editor</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm bg-black/20 backdrop-blur px-3 py-1 rounded-full">
                            <Calendar size={16} /> {blog.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm bg-black/20 backdrop-blur px-3 py-1 rounded-full">
                            <Clock size={16} /> 5 min read
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Article Content */}
                    <div className="lg:col-span-8">
                        <div className="bg-white p-8 md:p-12 rounded-brand shadow-sm border border-gray-100">
                            <div
                                className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-serif prose-headings:font-sans prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            >
                            </div>

                            {/* Tags (Mock) */}
                            <div className="flex gap-2 flex-wrap mt-12 pt-8 border-t border-gray-100">
                                {['Travel', 'Guide', 'Adventure', 'Tips'].map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Share & Author Bio */}
                            <div className="mt-12 p-8 bg-gray-50 rounded-xl flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                                <div className="w-20 h-20 rounded-full bg-gray-300 flex-shrink-0 mx-auto md:mx-0">
                                    {/* Placeholder for Author Image */}
                                    <div className="w-full h-full bg-primary flex items-center justify-center text-white text-3xl font-bold rounded-full">{blog.author.charAt(0)}</div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 text-lg mb-1">About {blog.author}</h4>
                                    <p className="text-gray-600 text-sm mb-4">Professional travel writer and photographer exploring the world one destination at a time. Sharing hidden gems and practical tips.</p>
                                    <div className="flex justify-center md:justify-start gap-4">
                                        <button className="text-gray-400 hover:text-blue-600 transition-colors"><Facebook size={20} /></button>
                                        <button className="text-gray-400 hover:text-sky-500 transition-colors"><Twitter size={20} /></button>
                                        <button className="text-gray-400 hover:text-pink-600 transition-colors"><Linkedin size={20} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Comments Section (Mock) */}
                        <div className="mt-12 bg-white p-8 rounded-brand shadow-sm">
                            <h3 className="text-2xl font-bold mb-6">Comments (3)</h3>
                            <div className="space-y-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h5 className="font-bold text-sm">Traveler Name</h5>
                                                <span className="text-xs text-gray-400">• 2 days ago</span>
                                            </div>
                                            <p className="text-gray-600 text-sm">This is such a helpful guide! I'm planning my trip next month and will definitely use these tips.</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Sidebar Component: Join Newsletter */}
                        <div className="bg-primary text-white p-8 rounded-brand shadow-lg text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                            <h3 className="text-2xl font-bold mb-2 relative z-10">Join Our Newsletter</h3>
                            <p className="text-white/80 mb-6 relative z-10">Get the latest travel updates and exclusive offers directly to your inbox.</p>
                            <input type="email" placeholder="Your email address" className="w-full px-4 py-3 rounded-lg text-gray-900 mb-3 focus:outline-none focus:ring-2 focus:ring-white/50" />
                            <button className="w-full bg-white text-primary font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors">Subscribe Now</button>
                        </div>

                        {/* Sidebar Component: Popular/Latest Posts */}
                        <div className="bg-white p-6 rounded-brand shadow-sm border border-gray-100">
                            <div className="flex border-b border-gray-200 mb-6">
                                <button
                                    onClick={() => setActiveSection('latest')}
                                    className={`flex-1 pb-3 font-bold text-sm uppercase tracking-wider transition-colors border-b-2 ${activeSection === 'latest' ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}
                                >
                                    Latest
                                </button>
                                <button
                                    onClick={() => setActiveSection('popular')}
                                    className={`flex-1 pb-3 font-bold text-sm uppercase tracking-wider transition-colors border-b-2 ${activeSection === 'popular' ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}
                                >
                                    Popular
                                </button>
                            </div>

                            <div className="space-y-6">
                                {blogs.slice(0, 4).map((b) => (
                                    <Link to={`/blog/${b.id}`} key={b.id} className="flex gap-4 group">
                                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div>
                                            <span className="text-xs text-primary font-bold uppercase mb-1 block">Travel</span>
                                            <h4 className="font-bold text-gray-800 leading-snug group-hover:text-primary transition-colors line-clamp-2">{b.title}</h4>
                                            <span className="text-xs text-gray-400 mt-2 block">{b.date}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar Component: Categories */}
                        <div className="bg-white p-6 rounded-brand shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg mb-4 text-gray-900">Categories</h3>
                            <ul className="space-y-2">
                                {['Destinations', 'Food & Drink', 'Travel Tips', 'Photography', 'Culture'].map((cat, idx) => (
                                    <li key={cat} className="flex justify-between items-center text-gray-600 hover:text-primary cursor-pointer group">
                                        <span>{cat}</span>
                                        <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">{10 + idx * 3}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Suggestions */}
                <div className="mt-20">
                    <h2 className="text-3xl font-bold mb-8 text-center text-secondary">You Might Also Like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {blogs.slice(0, 3).map((b) => (
                            <Link to={`/blog/${b.id}`} key={b.id} className="bg-white rounded-brand overflow-hidden shadow-lg group hover:-translate-y-2 transition-transform">
                                <div className="h-48 overflow-hidden">
                                    <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-1">{b.title}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">{b.summary}</p>
                                    <span className="text-primary text-sm font-bold mt-4 block">Read Article →</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
