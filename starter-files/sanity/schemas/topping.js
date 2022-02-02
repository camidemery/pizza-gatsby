import { FaPepperHot as icon } from 'react-icons/fa';

export default {
  // computer name
  name: 'topping',
  // visible title
  title: 'Toppings',
  icon,
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Topping Name',
      type: 'string',
      description: 'Name of Topping',
    },
    {
      name: 'vegitarian',
      title: 'Vegetarian',
      type: 'boolean',
      description: 'Veggies?',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    },
  ],
  preview: {
    select: {
      name: 'name',
      vegitarian: 'vegitarian',
    },
    prepare: ({ name, vegitarian }) => ({
      title: `${name} ${vegitarian ? '🌱' : ''}`,
    }),
  },
};
