import {useState, useEffect} from "react";

function CategoryList(){

    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch('http://localhost:8080/api/categories/1/allCategories')
        .then(response => response.json())
        .then(data =>{
            setCategory(data)
            setLoading(false)
        })

        .catch(error =>{
            console.error('Error fetching categories:',error);
            setLoading(false);
        })
    }, []);

    if (loading) return <p>Category Loading...</p>;

 return (
    <div>
      <h2 className="mb-3">My Categories</h2>
      
      {/* Χρησιμοποιούμε το Bootstrap "list-group" για να φαίνονται ωραία */}
      <ul className="list-group">
        {category.length === 0 ? (
          <p className="text-muted">No Categories.</p>
        ) : (
          category.map(category => (
            <li 
              key={category.id} 
              className="list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm"
              style={{ borderLeft: `8px solid ${category.color || '#ccc'}` }}
            >
              <div>
                <h6 className="mb-0">{category.name}</h6>
                <small className="text-muted">{category.description}</small>
              </div>
              <span 
                className="badge rounded-pill text-dark" 
                style={{ backgroundColor: category.color || '#eee' }}
              >
                {category.color}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default CategoryList;