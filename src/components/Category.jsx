// Category.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardComponent from './Card';
import Slider from 'react-slick';
// import '../index.css';
import { getProductsByCategory } from '../services/api';

function Category() {
    const { cat } = useParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setCategory(null);
        const fetchProductsByCategory = async () => {
            try {
                const data = await getProductsByCategory(cat);

                setProducts(data);
                setFilteredProducts(data);
                extractSubcategories(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductsByCategory();
    }, [cat]);

    useEffect(() => {
        if (products.length > 0 && products[0].category) {
            setCategory(Array.isArray(products[0].category) ? products[0].category[0] : products[0].category);
        } else {
            setCategory(null);
        }
    }, [products]);


    const extractSubcategories = (products) => {
        const subs = [...new Set(products.map(product => product.subcategory).filter(Boolean))];
        setSubcategories(subs);
    };

    const handleFilter = (subcategory) => {
        setSelectedSubcategory(subcategory);

        if (subcategory === 'all') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => product.subcategory === subcategory);
            setFilteredProducts(filtered);
        }
    };

    if (loading) {
        return <div className="container py-5 text-center"><p>Loading products...</p></div>;
    }

    return (
        <>
            {category && category.video && (
                <div className='card border-0 text-uppercase' style={{ height: '30vh' }}>
                    <video autoPlay muted loop playsInline className='w-100 h-100' style={{ objectFit: 'cover' }}>
                        <source src={`/src/assets/${category.video}`} type="video/mp4" />
                    </video>
                    <div className="card-img-overlay d-flex flex-column justify-content-center text-center text-light fw-bold"
                        style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
                        <h5 className='fs-1'>3 for 2 or 2nd -50%</h5>
                        <small>--- On Selected {cat} ---</small>
                    </div>
                </div>
            )}


            <div className="container p-0 pb-5">
                <h5 className="text-uppercase fw-bold my-3 ms-2">All {cat}</h5>

                {/* Subcategories Filter */}
                <div className="mb-4 fw-semibold position-relative">
                    <div className='px-2'>
                        <Slider infinite={false} speed={500} variableWidth={true} swipeToSlide={true}>
                            <span role='button'
                                onClick={() => handleFilter('all')}
                                className={`me-4 w-auto ${selectedSubcategory === 'all' ? 'text-darkred' : 'text-secondary'} `}>
                                All
                            </span>
                            {subcategories.map((subcategory, index) => (
                                <span key={index}
                                    role='button'
                                    onClick={() => handleFilter(subcategory)}
                                    className={`me-4 w-auto ${selectedSubcategory === subcategory ? 'text-darkred' : 'text-secondary'} `}
                                >
                                    {subcategory}
                                    {selectedSubcategory === subcategory && (
                                        <div className='text-darkred pt-1 bg-darkred mt-2'></div>
                                    )}
                                </span>
                            ))}
                        </Slider>
                    </div>

                    <hr style={{
                        position: 'absolute',
                        top: '20px',
                        left: '0',
                        width: '100%'
                    }} />
                </div>
                {/* <h3 className="text-center mb-4">All Products</h3> */}

                {/* Products List */}
                <div className="row g-2 mt-4 mx-1">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div className="col-md-4 col-6 col-xs-12" key={product._id}>
                                <CardComponent product={product} />
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <p>No products found for this subcategory.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Category;
