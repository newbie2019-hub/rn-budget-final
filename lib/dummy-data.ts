export const parentCategory = [
  {
    id: '1',
    category: 'Food'
  },
  {
    id: '2',
    category: 'Utilities'
  },
  {
    id: '3',
    category: 'Allowance'
  },
  {
    id: '4',
    category: 'Bills'
  },
  {
    id: '5',
    category: 'Miscellaneous'
  }
]

export const subCategories = [
  {
    id: '1',
    category_id: '1',
    category: 'Candy'
  },
  {
    id: '2',
    category_id: '1',
    category: 'Coffee'
  },
  {
    id: '3',
    category_id: '1',
    category: 'Groceries'
  },
  {
    id: '4',
    category_id: '1',
    category: 'Drinks'
  },

  {
    id: '5',
    category_id: '2',
    category: 'Toiletries'
  },
  {
    id: '6',
    category_id: '2',
    category: 'Maintenance'
  },
  {
    id: '7',
    category_id: '2',
    category: 'Bills'
  },
]

export const categories = parentCategory.map(parent => {
  return {
    ...parent,
    categories: subCategories.filter(sub => sub.category_id === parent.id)
  }
})