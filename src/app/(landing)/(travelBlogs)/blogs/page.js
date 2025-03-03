
"use client";

import { useRouter } from 'next/navigation';
import blogsData from "@/assets/scraped_cards.json";
import blogThumbs from "@/assets/scraped_thumbs.json";


const travelBlog = () => {

    const router = useRouter();

    const handleReadMoreClick = (e) => {
        e.preventDefault();
        router.push("/blogData/djsdsd");
    }

    return <>

        <div className="col-lg-8">
            {blogsData.map((blog, index) => (
                <div key={index} className="fl-white-bg blog-detail">
                    <div className="blog-title">
                        <a href={blog.url} title={blog.title}>
                            {blog.title}
                        </a>
                    </div>
                    <p className="text-3"></p>
                    <p>{blog.description}</p>
                    <p />
                    <a
                        href={blog.url}
                        className="read-more"
                        title={blog.title}
                        onClick={(e) => handleReadMoreClick(e)}
                    >
                        <i className="fas fa-chevron-right" />
                        Read More
                    </a>
                </div>
            ))}

        </div>

        <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="shadow-md" style={{ padding: 20 }}>
                <h1 className="text-6">Recent Blog</h1>
                <div className="sidebar-contant pt-3">
                    <div className="thumb-box">
                        <figure>
                            <figcaption>
                                {blogThumbs.map((thumbs, index) => (
                                    <div className="thumb-detail-info">
                                        <a
                                            href={thumbs.url}
                                            title="how do i talk to a live person at aa"
                                            onClick={(e) => handleReadMoreClick(e)}
                                        >
                                            {thumbs.title}
                                        </a>
                                        <div className="post-info">{thumbs.post_date}</div>
                                    </div>
                                ))}

                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default travelBlog;