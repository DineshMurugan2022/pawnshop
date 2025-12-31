import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { JewelryItem } from '../lib/supabase';
import Footer from '../components/Footer';
import { Plus, Edit2, Trash2, Gem, Save, X } from 'lucide-react';

const Admin: React.FC = () => {
  const [jewelryItems, setJewelryItems] = useState<JewelryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<JewelryItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: ''
  });

  useEffect(() => {
    fetchJewelryItems();
  }, []);

  const fetchJewelryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('jewelry_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJewelryItems(data || []);
    } catch (error) {
      console.error('Error fetching jewelry items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const itemData = {
        name: formData.name,
        description: formData.description || null,
        price: parseFloat(formData.price),
        category: formData.category,
        image_url: formData.image_url || null
      };

      if (editingItem) {
        const { error } = await supabase
          .from('jewelry_items')
          .update(itemData)
          .eq('id', editingItem.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('jewelry_items')
          .insert(itemData);
        
        if (error) throw error;
      }

      resetForm();
      fetchJewelryItems();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const { error } = await supabase
        .from('jewelry_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      fetchJewelryItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      image_url: ''
    });
    setShowAddForm(false);
    setEditingItem(null);
  };

  const startEdit = (item: JewelryItem) => {
    setFormData({
      name: item.name,
      description: item.description || '',
      price: item.price.toString(),
      category: item.category,
      image_url: item.image_url || ''
    });
    setEditingItem(item);
    setShowAddForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Gem className="h-12 w-12 text-purple-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Manage your jewelry inventory</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-purple-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Item
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Inventory ({jewelryItems.length} items)</h2>
            
            {jewelryItems.length === 0 ? (
              <div className="text-center py-8">
                <Gem className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No items in inventory</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Item</th>
                      <th className="text-left py-3 px-4">Category</th>
                      <th className="text-left py-3 px-4">Price</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jewelryItems.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            {item.image_url && (
                              <img 
                                src={item.image_url} 
                                alt={item.name}
                                className="h-10 w-10 object-cover rounded mr-3"
                              />
                            )}
                            <div>
                              <p className="font-medium text-gray-900">{item.name}</p>
                              {item.description && (
                                <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm capitalize">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-900">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startEdit(item)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
