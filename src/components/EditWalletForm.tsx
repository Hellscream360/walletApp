import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import type { Wallet, WalletCategory } from '../types';

interface EditWalletFormProps {
  wallet: Wallet;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditWalletForm({ wallet, onClose, onSuccess }: EditWalletFormProps) {
  const [name, setName] = useState(wallet.name);
  const [categories, setCategories] = useState<WalletCategory[]>(wallet.categories);

  const addCategory = () => {
    if (categories.length >= 10) {
      toast.error('Maximum 10 categories allowed');
      return;
    }
    setCategories([
      ...categories,
      { name: '', percentage: 0, color: '#3B82F6' }
    ]);
  };

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const updateCategory = (index: number, field: keyof WalletCategory, value: string | number) => {
    const newCategories = [...categories];
    newCategories[index] = { ...newCategories[index], [field]: value };
    setCategories(newCategories);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const total = categories.reduce((sum, cat) => sum + cat.percentage, 0);
    if (total !== 100) {
      toast.error('Percentages must add up to 100%');
      return;
    }

    try {
      const { error } = await supabase
        .from('wallets')
        .update({
          name,
          categories,
          updated_at: new Date().toISOString()
        })
        .eq('id', wallet.id);

      if (error) throw error;

      toast.success('Wallet updated successfully');
      onSuccess();
    } catch (error) {
      toast.error('Error updating wallet');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Wallet</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wallet Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={category.name}
                    onChange={(e) => updateCategory(index, 'name', e.target.value)}
                    placeholder="Category name"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                  <input
                    type="number"
                    value={category.percentage}
                    onChange={(e) => updateCategory(index, 'percentage', Number(e.target.value))}
                    placeholder="Percentage"
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg"
                    min="0"
                    max="100"
                    required
                  />
                  <input
                    type="color"
                    value={category.color}
                    onChange={(e) => updateCategory(index, 'color', e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer"
                  />
                  {categories.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCategory(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addCategory}
              className="mt-4 flex items-center text-blue-600 hover:text-blue-700"
            >
              <Plus size={20} className="mr-1" />
              Add Category
            </button>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}