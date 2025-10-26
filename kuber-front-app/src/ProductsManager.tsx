import React, { useState, useEffect } from 'react';
import { productApi } from './api/products';
import type { Product, ProductCreate } from './types/product';

const ProductsManager: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);

    const [formData, setFormData] = useState<ProductCreate>({
        name: '',
        description: '',
        price: 0,
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await productApi.getAll();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await productApi.update(editingId, formData);
            } else {
                await productApi.create(formData);
            }
            await fetchProducts();
            resetForm();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save product');
        }
    };

    const handleEdit = (product: Product) => {
        setEditingId(product.id);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
        });
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            await productApi.delete(id);
            await fetchProducts();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete product');
        }
    };

    const resetForm = () => {
        setFormData({ name: '', description: '', price: 0 });
        setEditingId(null);
        setShowForm(false);
    };

    if (loading) return <div className="loading">Loading products...</div>;

    return (
        <div className="products-container">
            <div className="products-header">
                <h2>Products Management</h2>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary">
                    {showForm ? 'Cancel' : 'Add Product'}
                </button>
            </div>

            {error && <div className="error">{error}</div>}

            {showForm && (
                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            minLength={1}
                            maxLength={255}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            value={formData.description || ''}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-primary">
                            {editingId ? 'Update' : 'Create'}
                        </button>
                        <button type="button" onClick={resetForm} className="btn-secondary">
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <table className="products-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description || '-'}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td className="actions">
                                <button onClick={() => handleEdit(product)} className="btn-edit">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(product.id)} className="btn-delete">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {products.length === 0 && !loading && (
                <div className="empty-state">No products found. Create one to get started!</div>
            )}
        </div>
    );
};

export default ProductsManager;
