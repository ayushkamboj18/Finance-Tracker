import { useState } from 'react';
import { useRole, useFinance } from '../../hooks/useFinance';
import { categories } from '../../data/mockData';

export default function AddTransactionButton() {
  const { isAdmin } = useRole();
  const { addTransaction } = useFinance();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: categories[0],
    type: 'expense',
    description: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) || '' : value,
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.date || !formData.amount || !formData.description) {
      setError('All fields are required');
      return;
    }

    if (formData.amount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    addTransaction({
      date: formData.date,
      amount: formData.amount,
      category: formData.category,
      type: formData.type,
      description: formData.description,
    });

    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      amount: '',
      category: categories[0],
      type: 'expense',
      description: '',
    });
    setError('');
    setIsOpen(false);
  };

  if (!isAdmin) return null;

  return (
    <>
      {/* Add Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full p-5 shadow-2xl hover:shadow-3xl hover:scale-110 transition-all active:scale-95 z-40"
        title="Add new transaction"
      >
        <span className="text-4xl">➕</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm modal-backdrop">
          {/* Modal Content */}
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full modal-content overflow-hidden animate-slide-up">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">➕ Add Transaction</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 text-3xl w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Error Message */}
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-lg">
                  <p className="text-red-700 font-semibold text-sm">⚠️ {error}</p>
                </div>
              )}

              {/* Date */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  📅 Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  📊 Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold"
                >
                  <option value="expense">📉 Expense</option>
                  <option value="income">💰 Income</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  🏷️ Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  💰 Amount (₹)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  min="0"
                  step="100"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  📝 Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-bold shadow-md hover:shadow-lg active:scale-95"
                >
                  ✓ Add Transaction
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setError('');
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-all font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
