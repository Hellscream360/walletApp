import React, { useState } from 'react';
import { X, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import type { Wallet, WalletCategory, SubCategory } from '../types';

interface WalletEditProps {
  wallet: Wallet;
  onClose: () => void;
  onSuccess: () => void;
}

const DEFAULT_COLORS = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#6366F1',
  '#EC4899', '#8B5CF6', '#14B8A6', '#F97316', '#06B6D4'
];

const SUB_COLORS = [
  '#93C5FD', '#FCA5A5', '#6EE7B7', '#FCD34D', '#A5B4FC',
  '#F9A8D4', '#C4B5FD', '#5EEAD4', '#FDBA74', '#67E8F9'
];

export default function WalletEdit({ wallet, onClose, onSuccess }: WalletEditProps) {
  const { user } = useAuth();
  const [name, setName] = useState(wallet.name);
  const [categories, setCategories] = useState<WalletCategory[]>(
    wallet.categories.map(cat => ({
      ...cat,
      subCategories: cat.subCategories || []
    }))
  );
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const toggleCategory = (index: number) => {
    setExpandedCategories(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const addCategory = () => {
    if (categories.length >= 10) {
      toast.error('Maximum 10 categories allowed');
      return;
    }
    setCategories([
      ...categories,
      { name: '', percentage: 0, color: DEFAULT_COLORS[categories.length], subCategories: [] }
    ]);
  };

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
    setExpandedCategories(expandedCategories.filter(i => i !== index));
  };

  const updateCategory = (index: number, field: keyof WalletCategory, value: string | number) => {
    const newCategories = [...categories];
    if (field === 'subCategories') return; // Prevent direct modification of subCategories
    newCategories[index] = { ...newCategories[index], [field]: value };
    setCategories(newCategories);
  };

  const addSubCategory = (categoryIndex: number) => {
    const category = categories[categoryIndex];
    if (category.subCategories && category.subCategories.length >= 10) {
      toast.error('Maximum 10 sub-categories allowed');
      return;
    }

    const newCategories = [...categories];
    newCategories[categoryIndex] = {
      ...category,
      subCategories: [
        ...(category.subCategories || []),
        {
          name: '',
          percentage: 0,
          color: SUB_COLORS[category.subCategories?.length || 0]
        }
      ],
    };
    setCategories(newCategories);
  };

  const removeSubCategory = (categoryIndex: number, subCategoryIndex: number) => {
    const newCategories = [...categories];
    const category = categories[categoryIndex];
    
    const updatedSubCategories = category.subCategories ? 
      category.subCategories.filter((_, index) => index !== subCategoryIndex) : 
      [];

    newCategories[categoryIndex] = {
      ...category,
      subCategories: updatedSubCategories
    };
    
    setCategories(newCategories);
  };

  const updateSubCategory = (
    categoryIndex: number,
    subCategoryIndex: number,
    field: keyof SubCategory,
    value: string | number
  ) => {
    const newCategories = [...categories];
    const category = categories[categoryIndex];
    if (!category.subCategories) return;

    const newSubCategories = [...category.subCategories];
    newSubCategories[subCategoryIndex] = {
      ...newSubCategories[subCategoryIndex],
      [field]: value
    };
    newCategories[categoryIndex] = { ...category, subCategories: newSubCategories };
    setCategories(newCategories);
  };

  const validatePercentages = () => {
    const totalMain = categories.reduce((sum, cat) => sum + cat.percentage, 0);
    if (Math.round(totalMain) !== 100) {
      toast.error('Main category percentages must add up to 100%');
      return false;
    }

    for (const category of categories) {
      if (category.subCategories && category.subCategories.length > 0) {
        const totalSub = category.subCategories.reduce((sum, sub) => sum + sub.percentage, 0);
        if (Math.round(totalSub) !== 100) {
          toast.error(`Sub-categories for ${category.name} must add up to 100%`);
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePercentages()) return;

    try {
      const { error } = await supabase
        .from('wallets')
        .update({
          name,
          categories,
          updated_at: new Date().toISOString()
        })
        .eq('id', wallet.id)
        .eq('userId', user?.id);

      if (error) throw error;

      toast.success('Wallet updated successfully');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating wallet:', error);
      toast.error('Error updating wallet');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-50 mb-6">
            Edit Wallet
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-200 mb-2">
                Wallet Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-secondary-200 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <div className="space-y-6">
              {categories.map((category, index) => (
                <div key={index} className="space-y-4 p-4 bg-secondary-50 dark:bg-secondary-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={category.name}
                      onChange={(e) => updateCategory(index, 'name', e.target.value)}
                      placeholder="Category name"
                      className="flex-1 px-3 py-2 border border-secondary-200 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-50 rounded-lg"
                      required
                    />
                    <input
                      type="number"
                      value={category.percentage}
                      onChange={(e) => updateCategory(index, 'percentage', Number(e.target.value))}
                      placeholder="Percentage"
                      className="w-24 px-3 py-2 border border-secondary-200 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-50 rounded-lg"
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
                        className="text-error-500 hover:text-error-700 dark:text-error-400 dark:hover:text-error-300"
                      >
                        <X size={20} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleCategory(index)}
                      className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
                    >
                      {expandedCategories.includes(index) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>

                  {expandedCategories.includes(index) && (
                    <div className="ml-8 space-y-4">
                      {category.subCategories?.map((subCategory, subIndex) => (
                        <div key={subIndex} className="flex items-center space-x-4">
                          <input
                            type="text"
                            value={subCategory.name}
                            onChange={(e) => updateSubCategory(index, subIndex, 'name', e.target.value)}
                            placeholder="Sub-category name"
                            className="flex-1 px-3 py-2 border border-secondary-200 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-50 rounded-lg"
                            required
                          />
                          <input
                            type="number"
                            value={subCategory.percentage}
                            onChange={(e) => updateSubCategory(index, subIndex, 'percentage', Number(e.target.value))}
                            placeholder="Percentage"
                            className="w-24 px-3 py-2 border border-secondary-200 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-50 rounded-lg"
                            min="0"
                            max="100"
                            required
                          />
                          <input
                            type="color"
                            value={subCategory.color}
                            onChange={(e) => updateSubCategory(index, subIndex, 'color', e.target.value)}
                            className="w-12 h-10 rounded cursor-pointer"
                          />
                          <button
                            type="button"
                            onClick={() => removeSubCategory(index, subIndex)}
                            className="text-error-500 hover:text-error-700 dark:text-error-400 dark:hover:text-error-300"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addSubCategory(index)}
                        className="mt-2 flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        <Plus size={20} className="mr-1" />
                        Add Sub-category
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addCategory}
              className="mt-4 flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              <Plus size={20} className="mr-1" />
              Add Category
            </button>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-secondary-700 hover:text-secondary-900 dark:text-secondary-300 dark:hover:text-secondary-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
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
