
export const getCategoryIcon = (category) =>{
    var categoryIcon = 'fas fa-random';

    switch(category){
        case 'Groceries':
            categoryIcon = 'fas fa-shopping-basket'
          break;

          case 'Food':
            categoryIcon = 'fas fa-utensils'
          break;

          case 'Shopping':
            categoryIcon = 'fas fa-tshirt'
          break;

          case 'Travel':
            categoryIcon = 'fas fa-route'
          break;

          case 'Leisure':
            categoryIcon = 'far fa-smile-wink'
          break;

          case 'Health':
            categoryIcon = 'fas fa-heartbeat'
          break;

          case 'Home':
            categoryIcon = 'fas fa-home'
          break;

          case 'Tech':
            categoryIcon = 'fas fa-tv'
          break;

          case 'Utilities':
            categoryIcon = 'fas fa-hand-holding-water'
          break;

          case 'Bills':
            categoryIcon = 'fas fa-file-invoice'
          break;

          case 'Other':
            categoryIcon = 'fas fa-random'
          break;  

          default:
            categoryIcon = 'fas fa-random'
            break;
      }

    return categoryIcon;
}